import { exec } from "child_process";
import * as vscode from "vscode";

export class FlutterRunner {
  public static async runCommand(command: string): Promise<string> {
    return vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: `Running: ${command}`,
      cancellable: false
    }, (progress) => {
      return new Promise((resolve, reject) => {
        const process = exec(command, {
          cwd: vscode.workspace.workspaceFolders?.[0].uri.fsPath
        });

        let output = "";

        process.stdout?.on("data", (data) => {
          output += data.toString();
        });

        process.stderr?.on("data", (data) => {
          output += data.toString();
        });

        process.on("close", (code) => {
          resolve(output);
        });

        process.on("error", (err) => {
          reject(err);
        });
      });
    });
  }
}
