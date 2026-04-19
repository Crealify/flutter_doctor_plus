import * as vscode from "vscode";

export interface FixStats {
  occurrences: number;
  successes: number;
}

export class FeedbackStore {
  private static readonly STORAGE_KEY = "flutter-doctor-plus.fixStats";
  private context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }

  public trackFix(fingerprint: string, success: boolean) {
    const stats = this.context.globalState.get<Record<string, FixStats>>(FeedbackStore.STORAGE_KEY) || {};
    
    if (!stats[fingerprint]) {
      stats[fingerprint] = { occurrences: 0, successes: 0 };
    }
    
    stats[fingerprint].occurrences++;
    if (success) {
      stats[fingerprint].successes++;
    }
    
    this.context.globalState.update(FeedbackStore.STORAGE_KEY, stats);
  }

  public getSuccessRate(fingerprint: string): number {
    const stats = this.context.globalState.get<Record<string, FixStats>>(FeedbackStore.STORAGE_KEY) || {};
    const item = stats[fingerprint];
    if (!item || item.occurrences === 0) return 0;
    return item.successes / item.occurrences;
  }
}
