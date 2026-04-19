export interface Rule {
  match: string;
  problem: string;
  fix: string;
  type: string;
}

export const rules: Rule[] = [
  // PUB / DEPENDENCY ERRORS
  {
    match: "Could not resolve package",
    problem: "Package resolution failed",
    fix: "Check pubspec.yaml dependencies and run flutter pub get",
    type: "pub"
  },
  {
    match: "Because every version of depends on",
    problem: "Version conflict detected",
    fix: "Resolve version conflict in pubspec.yaml or run flutter pub upgrade",
    type: "pub"
  },
  {
    match: "version solving failed",
    problem: "Dependency version mismatch",
    fix: "Run flutter pub upgrade --major-versions",
    type: "pub"
  },
  {
    match: "Got socket error trying to find package",
    problem: "Network error during pub get",
    fix: "Check internet connection and proxy settings",
    type: "pub"
  },
  {
    match: "pub get failed",
    problem: "Pub get failed",
    fix: "Delete pubspec.lock and run flutter pub get",
    type: "pub"
  },
  {
    match: "Because no versions match",
    problem: "No matching version found",
    fix: "Relax version constraints in pubspec.yaml",
    type: "pub"
  },
  {
    match: "is not a valid package name",
    problem: "Invalid package name",
    fix: "Fix invalid characters in pubspec.yaml name field",
    type: "pub"
  },
  {
    match: "dependency overridden",
    problem: "Dependency override active",
    fix: "Check dependency_overrides section in pubspec.yaml",
    type: "pub"
  },
  {
    match: "discontinued",
    problem: "Discontinued package used",
    fix: "Replace deprecated package with maintained alternative",
    type: "pub"
  },
  {
    match: "is not on pub.dev",
    problem: "Package not found on pub.dev",
    fix: "Check git/path dependency or typo in package name",
    type: "pub"
  },
  // GRADLE / ANDROID BUILD ERRORS
  {
    match: "Execution failed for task",
    problem: "Gradle task execution failed",
    fix: "Run flutter clean && re-sync Gradle",
    type: "gradle"
  },
  {
    match: "GradleException",
    problem: "Gradle exception encountered",
    fix: "Check android/gradle settings and compatibility",
    type: "gradle"
  },
  {
    match: "Could not find com.android.tools.build",
    problem: "Android Gradle Plugin not found",
    fix: "Update Android Gradle Plugin version",
    type: "gradle"
  },
  {
    match: "AndroidX incompatibility",
    problem: "AndroidX compatibility issue",
    fix: "Enable android.useAndroidX=true in gradle.properties",
    type: "gradle"
  },
  {
    match: "Manifest merger failed",
    problem: "Android manifest merge failure",
    fix: "Resolve duplicate permissions in AndroidManifest.xml",
    type: "gradle"
  },
  {
    match: "minSdkVersion",
    problem: "minSdkVersion too low",
    fix: "Increase minSdkVersion in android/app/build.gradle",
    type: "gradle"
  },
  {
    match: "compileSdkVersion",
    problem: "compileSdkVersion mismatch",
    fix: "Upgrade compileSdkVersion to latest stable",
    type: "gradle"
  },
  {
    match: "duplicate class",
    problem: "Duplicate class conflict",
    fix: "Remove duplicate dependency or conflict library",
    type: "gradle"
  },
  {
    match: "Transform API",
    problem: "Gradle Transform API error",
    fix: "Upgrade Gradle plugin and dependencies",
    type: "gradle"
  },
  {
    match: "Kotlin version",
    problem: "Kotlin version mismatch",
    fix: "Update Kotlin version in build.gradle",
    type: "gradle"
  },
  // DART / NULL SAFETY ERRORS
  {
    match: "Null check operator used on a null value",
    problem: "Null check on null value",
    fix: "Replace ! with null-safe check (?. or ??)",
    type: "dart"
  },
  {
    match: "LateInitializationError",
    problem: "Late variable not initialized",
    fix: "Initialize variable before use or add default value",
    type: "dart"
  },
  {
    match: "type 'Null' is not a subtype",
    problem: "Null assigned to non-nullable type",
    fix: "Add proper null checks or type guards",
    type: "dart"
  },
  {
    match: "Unnecessary non-null assertion",
    problem: "Redundant ! operator",
    fix: "Remove ! operator safely",
    type: "dart"
  },
  {
    match: "Missing required parameter",
    problem: "Required parameter missing",
    fix: "Pass required named parameters in constructor",
    type: "dart"
  },
  {
    match: "The method isn't defined",
    problem: "Undefined method call",
    fix: "Check method name or missing import",
    type: "dart"
  },
  {
    match: "Undefined class",
    problem: "Undefined class reference",
    fix: "Add missing import or dependency",
    type: "dart"
  },
  {
    match: "is not a subtype of type",
    problem: "Type mismatch error",
    fix: "Fix type mismatch in casting",
    type: "dart"
  },
  {
    match: "Expected identifier",
    problem: "Syntax error in Dart code",
    fix: "Fix syntax error in Dart code",
    type: "dart"
  },
  {
    match: "A value of type X can't be assigned",
    problem: "Type assignment mismatch",
    fix: "Fix type mismatch or use explicit cast",
    type: "dart"
  },
  // UI / RENDER ERRORS
  {
    match: "RenderFlex overflowed",
    problem: "UI layout overflow",
    fix: "Wrap widget with Expanded or SingleChildScrollView",
    type: "ui"
  },
  {
    match: "setState called after dispose",
    problem: "setState on unmounted widget",
    fix: "Check mounted before calling setState",
    type: "ui"
  },
  {
    match: "Vertical viewport was given unbounded height",
    problem: "Unbounded vertical constraints",
    fix: "Wrap ListView in Expanded or SizedBox",
    type: "ui"
  },
  {
    match: "Incorrect ParentDataWidget",
    problem: "Invalid widget nesting",
    fix: "Fix widget nesting (Expanded/Flexible misuse)",
    type: "ui"
  },
  {
    match: "GestureDetector not working",
    problem: "Gesture interaction issue",
    fix: "Check hitTestBehavior or parent widget blocking gestures",
    type: "ui"
  },
  {
    match: "Multiple heroes in route",
    problem: "Duplicate Hero tag",
    fix: "Use unique Hero tags",
    type: "ui"
  },
  {
    match: "No Material widget found",
    problem: "Missing Material ancestor",
    fix: "Wrap widget tree with MaterialApp",
    type: "ui"
  },
  {
    match: "A RenderObject was not laid out",
    problem: "Layout constraint error",
    fix: "Add constraints using SizedBox/Expanded",
    type: "ui"
  },
  // PLUGIN / PACKAGE ERRORS
  {
    match: "MissingPluginException",
    problem: "Plugin implementation missing",
    fix: "Rebuild app and ensure plugin is registered",
    type: "plugin"
  },
  {
    match: "Plugin project :path not found",
    problem: "Invalid plugin path",
    fix: "Run flutter pub get and check plugin path",
    type: "plugin"
  },
  {
    match: "requires Android embedding v2",
    problem: "Legacy Android embedding",
    fix: "Upgrade plugin to Android embedding v2",
    type: "plugin"
  },
  {
    match: "iOS deployment target",
    problem: "iOS version mismatch",
    fix: "Increase iOS deployment target in Podfile",
    type: "plugin"
  },
  {
    match: "CocoaPods not installed",
    problem: "CocoaPods missing",
    fix: "Run sudo gem install cocoapods",
    type: "plugin"
  },
  {
    match: "Pod install failed",
    problem: "CocoaPods installation failed",
    fix: "Delete Podfile.lock and run pod install",
    type: "plugin"
  },
  {
    match: "Swift version mismatch",
    problem: "Swift version conflict",
    fix: "Update Swift version in Xcode build settings",
    type: "plugin"
  },
  // GENERAL BUILD FAILURES
  {
    match: "Build failed due to exception",
    problem: "Generic build exception",
    fix: "Check full stack trace and isolate root cause",
    type: "general"
  },
  {
    match: "Target kernel_snapshot failed",
    problem: "Kernel snapshot build failure",
    fix: "Run flutter clean and delete build/ folder",
    type: "general"
  },
  {
    match: "Unexpected null value",
    problem: "Runtime null exception",
    fix: "Add null safety checks",
    type: "general"
  },
  {
    match: "Process finished with exit code",
    problem: "Unexpected process exit",
    fix: "Check logs above exit code for root error",
    type: "general"
  },
  {
    match: "Unhandled Exception",
    problem: "Unhandled runtime exception",
    fix: "Inspect stack trace and fix runtime crash source",
    type: "general"
  }
];
