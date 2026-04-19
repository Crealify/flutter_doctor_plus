# Changelog

## [1.0.2] - 2026-04-19
### Fixed
- Replaced broken relative GIF paths with correct local relative paths for proper Marketplace rendering.
- Removed "Try Interactive Demo" links from all README files — only the embedded GIF demo is used now.

### Changed
- Updated extension Publisher ID to `flutterdoctorplus` to match the official Marketplace account.
- Replaced extension icon with a new solid-black-background version to eliminate edge artifacts on light themes.
- Improved `.vscodeignore` to whitelist `assests/icon.png` so the logo is correctly bundled into the `.vsix` package.
- Upgraded root GitHub `README.md` with full monorepo architecture diagram, feature list, and local development guide.

---

## [1.0.1] - 2026-04-19
### Fixed
- Resolved `invalid relative path` packaging error caused by monorepo symlinks by adding `--no-dependencies` flag.
- Added `LICENSE` file directly into the `apps/vscode-extension` folder to resolve `vsce` packaging warning.

### Changed
- Configured strict `.vscodeignore` whitelist to ensure only bundled `dist/extension.js`, README, LICENSE, and GIF are shipped.

---

## [1.0.0] - 2026-04-19
### Added
- **Smart Diagnosis Engine**: Rule-based detection for 50+ common Flutter/Dart build errors (Gradle, Pub, UI overflows).
- **AI-Assisted Diagnostics (Level 5)**: OpenAI fallback for complex and zero-day build errors.
- **Error Fingerprinting (Level 6)**: Normalizes errors into hashed signatures for tracking and database aggregation.
- **Feedback Loops**: Prompts users "Did this fix work?" to learn and prioritize successful fixes.
- **Health Monitor Status Bar**: Premium UI integration showing real-time project health (`$(check)`, `$(warning)`, `$(sync~spin)`).
- **Cloud Intelligence Bridge (Level 7)**: Architecture ready to fetch global fix stats for enterprise-grade diagnostics.
- **Custom Rules**: Support for defining custom error matches and fixes directly in `settings.json`.
- **One-Click Quick Fixes**: Inline VS Code diagnostics mapped to actionable Lightbulb commands.

### Changed
- Monorepo structure setup (`@flutter-doctor/core`, `@flutter-doctor/rules`, and `vscode-extension`) for ultimate scalability.
