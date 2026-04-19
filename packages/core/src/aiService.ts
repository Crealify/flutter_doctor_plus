import axios from "axios";

export interface AIAnalysisResult {
  problem: string;
  fix: string;
  explanation: string;
}

export class AIService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  public async analyzeError(logSnippet: string): Promise<AIAnalysisResult | null> {
    if (!this.apiKey || this.apiKey === "YOUR_API_KEY") {
      return null;
    }

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are a Flutter build expert. Analyze the provided build error log and respond in a strict JSON format:
{
  "problem": "Short description of the problem",
  "fix": "Specific command or action to fix it",
  "explanation": "Why this happened"
}`
            },
            {
              role: "user",
              content: logSnippet
            }
          ],
          response_format: { type: "json_object" }
        },
        {
          headers: {
            "Authorization": `Bearer ${this.apiKey}`,
            "Content-Type": "application/json"
          }
        }
      );

      return JSON.parse(response.data.choices[0].message.content) as AIAnalysisResult;
    } catch (error) {
      console.error("AI Analysis failed:", error);
      return null;
    }
  }
}
