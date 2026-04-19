import * as vscode from "vscode";
import { LogAnalyzer, AIService } from "@flutter-doctor/core";
import { FlutterRunner } from "./flutterRunner";
import { FlutterFixProvider } from "./codeActions";
import { FeedbackStore } from "./feedbackStore";

let diagnosticCollection: vscode.DiagnosticCollection;
let feedbackStore: FeedbackStore;
let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
  console.log('Flutter Doctor Plus is now active!');

  diagnosticCollection = vscode.languages.createDiagnosticCollection("Flutter Doctor");
  feedbackStore = new FeedbackStore(context);
  context.subscriptions.push(diagnosticCollection);

  // Status Bar Item
  statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  statusBarItem.command = "flutter-doctor-plus.analyze";
  statusBarItem.text = "$(heart) Flutter Health: Unknown";
  statusBarItem.tooltip = "Click to analyze Flutter project health";
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);

  // Register Code Actions Provider
  context.subscriptions.push(
    vscode.languages.registerCodeActionsProvider(
      { scheme: "file", language: "dart" },
      new FlutterFixProvider(),
      {
        providedCodeActionKinds: FlutterFixProvider.providedCodeActionKinds
      }
    )
  );

  // Command: Analyze Project
  let analyzeCommand = vscode.commands.registerCommand("flutter-doctor-plus.analyze", async () => {
    const config = vscode.workspace.getConfiguration("flutter-doctor-plus");
    const apiKey = config.get<string>("openaiApiKey") || "";
    const customRules = config.get<any[]>("customRules") || [];
    
    statusBarItem.text = "$(sync~spin) Analyzing...";
    
    const output = await FlutterRunner.runCommand("flutter build apk --debug");
    
    const aiService = apiKey ? new AIService(apiKey) : undefined;
    const analyzer = new LogAnalyzer(aiService, customRules);
    
    if (aiService && !apiKey) {
      vscode.window.showWarningMessage("OpenAI API Key not set. AI analysis will be skipped.");
    }

    const results = await analyzer.analyze(output);

    diagnosticCollection.clear();

    const diagnosticMap: Map<string, vscode.Diagnostic[]> = new Map();

    for (const result of results) {
      if (result.file && result.line) {
        const uri = vscode.Uri.file(result.file);
        const range = new vscode.Range(
          result.line - 1,
          (result.column || 1) - 1,
          result.line - 1,
          200
        );

        const diagnostic = new vscode.Diagnostic(
          range,
          result.problem,
          vscode.DiagnosticSeverity.Error
        );
        diagnostic.source = "Flutter Doctor";
        diagnostic.code = result.type;
        (diagnostic as any).fingerprint = result.fingerprint;

        const diagnostics = diagnosticMap.get(uri.toString()) || [];
        diagnostics.push(diagnostic);
        diagnosticMap.set(uri.toString(), diagnostics);
      }
    }

    diagnosticMap.forEach((diags, uriStr) => {
      diagnosticCollection.set(vscode.Uri.parse(uriStr), diags);
    });

    if (results.length > 0) {
      statusBarItem.text = `$(warning) Flutter Health: ${results.length} Issues`;
      statusBarItem.backgroundColor = new vscode.ThemeColor("statusBarItem.errorBackground");
      vscode.window.showErrorMessage(`Flutter Doctor found ${results.length} issues. Check the editor for red underlines.`);
    } else {
      statusBarItem.text = `$(check) Flutter Health: Good`;
      statusBarItem.backgroundColor = undefined;
      vscode.window.showInformationMessage("Flutter Doctor found no issues! Your project looks healthy.");
    }
  });

  // Command: Fix All (Generic Fix Command)
  let fixAllCommand = vscode.commands.registerCommand("flutter-doctor-plus.fixAll", async (message?: string, fingerprint?: string) => {
    const terminal = vscode.window.activeTerminal || vscode.window.createTerminal("Flutter Doctor Fix");
    terminal.show();
    
    if (message) {
      terminal.sendText(`# Suggested fix for: ${message}`);
    }
    
    terminal.sendText("flutter clean && flutter pub get");

    // Feedback Loop
    if (fingerprint) {
      setTimeout(async () => {
        const response = await vscode.window.showInformationMessage(
          "Did the suggested fix work for you?",
          "Yes",
          "No"
        );
        if (response === "Yes") {
          feedbackStore.trackFix(fingerprint, true);
          vscode.window.showInformationMessage("Great! We'll prioritize this fix for similar issues.");
        } else if (response === "No") {
          feedbackStore.trackFix(fingerprint, false);
          vscode.window.showInformationMessage("Sorry to hear that. We'll improve our suggestions.");
        }
      }, 5000);
    }
  });

  context.subscriptions.push(analyzeCommand, fixAllCommand);
}

export function deactivate() {}
