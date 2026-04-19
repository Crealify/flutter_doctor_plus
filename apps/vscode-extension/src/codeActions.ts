import * as vscode from "vscode";

export class FlutterFixProvider implements vscode.CodeActionProvider {
  public static readonly providedCodeActionKinds = [
    vscode.CodeActionKind.QuickFix
  ];

  public provideCodeActions(
    document: vscode.TextDocument,
    range: vscode.Range,
    context: vscode.CodeActionContext,
    token: vscode.CancellationToken
  ): vscode.CodeAction[] {
    // For each diagnostic, check if it's one of ours and offer a fix
    return context.diagnostics
      .filter(diagnostic => diagnostic.source === "Flutter Doctor")
      .map(diagnostic => this.createFix(diagnostic));
  }

  private createFix(diagnostic: vscode.Diagnostic): vscode.CodeAction {
    const fix = new vscode.CodeAction(`Fix: ${diagnostic.message}`, vscode.CodeActionKind.QuickFix);
    
    // In a real scenario, we'd map the diagnostic message to a specific command
    // For this MVP, we'll use a generic command that the user can confirm
    fix.command = {
      command: "flutter-doctor-plus.fixAll",
      title: "Run Suggested Fix",
      arguments: [diagnostic.message, (diagnostic as any).fingerprint]
    };
    
    fix.diagnostics = [diagnostic];
    fix.isPreferred = true;
    
    return fix;
  }
}
