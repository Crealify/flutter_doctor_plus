import * as crypto from "crypto";

export class FingerprintEngine {
  /**
   * Creates a normalized hash of an error log.
   * Removes variable data like file paths, numbers, and whitespace.
   */
  public static createFingerprint(log: string): string {
    const normalized = log
      .toLowerCase()
      // Remove file paths (e.g., C:\Users\...)
      .replace(/[a-zA-Z]:\\[^:\s\n]+/g, "")
      // Remove Unix-style paths
      .replace(/\/[^:\s\n]+/g, "")
      // Remove numbers (often IDs or versions)
      .replace(/\d+/g, "")
      // Remove extra whitespace
      .replace(/\s+/g, " ")
      .trim();

    return crypto
      .createHash("sha256")
      .update(normalized)
      .digest("hex");
  }
}
