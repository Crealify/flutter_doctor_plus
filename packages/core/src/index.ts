import { rules, Rule } from "@flutter-doctor/rules";
import { AIService, AIAnalysisResult } from "./aiService";
import { FingerprintEngine } from "./fingerprint";
import { CloudService, GlobalFixStats } from "./cloudService";

export { AIService, AIAnalysisResult, FingerprintEngine, CloudService, GlobalFixStats };

export interface AnalysisResult {
  problem: string;
  fix: string;
  type: string;
  file?: string;
  line?: number;
  column?: number;
  confidence: number;
  fingerprint: string;
}

export class LogAnalyzer {
  private aiService?: AIService;
  private customRules: Rule[] = [];

  constructor(aiService?: AIService, customRules: Rule[] = []) {
    this.aiService = aiService;
    this.customRules = customRules;
  }

  public async analyze(log: string): Promise<AnalysisResult[]> {
    const results: AnalysisResult[] = [];
    const lines = log.split("\n");

    let ruleMatched = false;
    for (const line of lines) {
      // Check against custom rules first
      const allRules = [...this.customRules, ...rules];
      for (const rule of allRules) {
        if (line.includes(rule.match)) {
          ruleMatched = true;
          const result: AnalysisResult = {
            problem: rule.problem,
            fix: rule.fix,
            type: rule.type,
            confidence: 0.9, // Default confidence for rule matches
            fingerprint: FingerprintEngine.createFingerprint(line)
          };

          // Try to extract file and line information
          // Format: path/to/file.dart:line:column
          const dartMatch = line.match(/(.+\.dart):(\d+):(\d+)/);
          if (dartMatch) {
            result.file = dartMatch[1];
            result.line = parseInt(dartMatch[2]);
            result.column = parseInt(dartMatch[3]);
          }

          results.push(result);
          break; // Avoid duplicate matches for the same line if rules overlap
        }
      }
    }

    // AI Fallback if no rules matched or for extra context
    if (!ruleMatched && this.aiService) {
      const logSnippet = this.extractImportantLog(log);
      const aiResult = await this.aiService.analyzeError(logSnippet);
      if (aiResult) {
        results.push({
          problem: aiResult.problem,
          fix: aiResult.fix,
          type: "ai_suggestion",
          confidence: 0.7,
          fingerprint: FingerprintEngine.createFingerprint(logSnippet)
        });
      }
    }

    return results;
  }

  private extractImportantLog(log: string): string {
    const lines = log.split("\n");
    return lines
      .filter(line => 
        line.toLowerCase().includes("error") || 
        line.toLowerCase().includes("failed") || 
        line.toLowerCase().includes("exception")
      )
      .slice(-20)
      .join("\n");
  }
}
