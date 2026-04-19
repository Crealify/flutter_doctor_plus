# Flutter Doctor Plus

**The Ultimate Developer Intelligence Platform for Flutter**

Flutter Doctor Plus is a premium VS Code extension built to eliminate the frustration of cryptic Flutter build failures. Whether you are dealing with obscure Gradle build exceptions, tricky pubspec version conflicts, or complex Null Safety violations, Flutter Doctor Plus instantly identifies the root cause and provides a one-click automated fix directly inside your editor.

---

## What is this Extension?

When a Flutter build fails, developers often spend hours sifting through hundreds of lines of terminal logs, Googling generic errors, and guessing which `build.gradle` file needs updating. 

**Flutter Doctor Plus solves this by acting as an automated senior engineer.** It captures your build logs, analyzes them against a local database of known issues (and an AI fallback for unknown ones), and highlights the exact line of code causing the problem with an actionable "Quick Fix".

---

## In Action (Demo)

![Flutter Doctor Plus Full Demo](./assests/demo.gif)

### Try the Interactive Demo:
* [**VS Code UI Demo (Online)**](https://htmlpreview.github.io/?https://github.com/Crealify/flutter_doctor_plus/blob/main/apps/vscode-extension/demo-mockup.html) - See the extension catching a missing plugin exception and offering an automated Quick Fix in real-time.

---

## Core Features

### 1. Deterministic Intelligence Engine
Out of the box, the extension recognizes over 50+ common Flutter/Dart build errors. Because this core engine runs entirely locally using regex pattern matching, it is lightning-fast and guarantees zero hallucinations.

### 2. AI-Powered Fallback (Level 5 Diagnostics)
If an error is completely new (zero-day) or highly specific to your environment, the rule engine falls back to an AI-assisted analysis using OpenAI. It securely extracts the relevant error stack trace and generates a structured explanation and fix command.

### 3. Custom Team Rules Support
Every company has specific internal packages and bespoke build setups. You can define your own custom error-matching rules directly in your VS Code `settings.json`. If your team frequently encounters a specific internal architecture error, you can automate the fix for everyone.

### 4. Interactive Health Monitor
Keep an eye on your project's stability without opening a terminal. A dedicated Status Bar item provides real-time feedback on your Flutter project's health, updating dynamically during analysis.

### 5. Learning Feedback Loop
After applying a Quick Fix, the extension prompts you to confirm if the solution worked. By tracking the success rate of error "fingerprints," the platform learns which fixes are the most reliable.

---

## How It Works (Under the Hood)

1. **Log Capture**: When triggered, the extension runs a background `flutter build apk --debug` command, capturing both `stdout` and `stderr` streams.
2. **Log Parsing**: The `LogAnalyzer` scans the terminal output line-by-line against your Custom Rules and the built-in database. 
3. **Error Fingerprinting**: The extension strips away variable data (like absolute file paths and timestamps) to create a unique cryptographic hash ("fingerprint") of the error type.
4. **Editor Mapping**: Using the VS Code Diagnostics API, the extension maps the error back to the exact file and line number in your workspace, underlining it in red.
5. **Code Actions**: Clicking the Quick Fix lightbulb icon automatically executes the appropriate terminal command (e.g., `flutter clean`, `flutter pub get`, or specific Gradle updates) to resolve the issue.

---

## Getting Started

### Installation
*(Once published to the Marketplace, install it directly from the VS Code Extensions tab by searching "Flutter Doctor Plus").*
If you are installing locally from a `.vsix` file:
1. Open VS Code.
2. Go to the Extensions view (`Ctrl+Shift+X`).
3. Click the `...` menu at the top right and select **Install from VSIX**.

### Usage
1. Open any Flutter project workspace in VS Code.
2. Look at the bottom right **Status Bar** for the `Flutter Health` monitor.
3. Click the Status Bar item, or open the Command Palette (`Ctrl+Shift+P`) and run:  
   `Flutter Doctor: Analyze Project`
4. If the build fails, open the highlighted file. Hover over the red underline, click the **Quick Fix** lightbulb, and select **Run Suggested Fix**.

---

## Configuration

You can fully customize the extension's behavior in your VS Code `settings.json`.

### `flutter-doctor-plus.openaiApiKey`
**Type**: `string` | **Default**: `""`
Provide your OpenAI API key to enable AI-assisted diagnosis for unknown errors.
```json
"flutter-doctor-plus.openaiApiKey": "sk-your-api-key-here"
```

### `flutter-doctor-plus.customRules`
**Type**: `array` | **Default**: `[]`
Define custom regex rules to catch project-specific errors.
```json
"flutter-doctor-plus.customRules": [
  {
    "match": "MissingPluginException",
    "problem": "Native plugin not registered properly.",
    "fix": "flutter clean && flutter pub get",
    "type": "native_plugin_error"
  }
]
```

---

## Privacy & Security

- **Local First**: All standard rule matching happens 100% locally on your machine. Your logs are never transmitted externally unless the AI fallback is triggered.
- **AI Fallback (Opt-in)**: If you configure an OpenAI API Key, only the specific lines containing `Exception`, `Error`, or `Failed` (max 20 lines) are sent to OpenAI to preserve your token limits and ensure proprietary source code is not leaked.

---

## License

Distributed under the MIT License. See `LICENSE` for more information. Copyright (c) 2026 Crealify.

---
Built with ❤️ by Crealify for the Flutter/Dart community.
