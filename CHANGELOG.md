# Changelog

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
