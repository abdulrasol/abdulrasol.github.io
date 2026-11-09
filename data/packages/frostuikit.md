# ❄️ Frosted UI Kit Catalog & API Indexing

For supported imports, compatibility aliases, and deprecation policy, see
[API Stability and Deprecation](#api-stability-and-deprecation).
For the shared visual surface rules, see [Visual Consistency](#visual-consistency).

Welcome to the **`frosted_ui_kit`** Widget Catalog and Technical API Index. This document provides a complete visual reference, parameter guide, and code snippets for all components in the library.

---

## 📊 API & Widget Catalog Index

| Component | File / Module | Primary Class | Mixin Shortcut | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Input Fields** | `inputs.dart` | `AppTextField` | `emailField`, `passwordField`, `nameField`, `textField` | Pre-configured glassmorphic inputs with auto-obscure toggle, icons, and validation. |
| **Glass Cards** | `cards.dart` | `BlurredCard` | `blurredCard` (`bluredCard`) | Translucent card container with backdrop blur filter (`sigmaX: 10, sigmaY: 10`). |
| **Action Buttons** | `buttons.dart` | `AppButton`, `CircleButton`, `AppFloatingActionButton` | `appButton`, `circleButton`, `backButton`, `appFab` | Multi-styled buttons (`glass`, `colored`, `outlined`, `text`) and floating action buttons. |
| **Sliding Tabs** | `tabs.dart` | `AppSlidingTabs` | `appSlidingTabs` | Telegram-style animated sliding segmented control with RTL support. |
| **Bottom Sheets** | `bottom_sheet.dart` | `AppBottomSheet` | `showAppBottomSheet` | Modal bottom sheet with backdrop blur filter and drag indicator. |
| **Dialogs** | `dialogs.dart` | `AppDialog` | `showAppWarningDialog`, `showAppErrorDialog`, `showAppInputDialog` | Pop-up glassmorphic dialogs for warnings, errors, and input prompts. |
| **List Tiles** | `list_tile.dart` | `FrostedListSection` | *N/A* | Grouped, glassmorphic settings-style lists with integrated dividers. |
| **App Bars** | `app_bar.dart` | `FrostedAppBar` | *N/A* | Modern, glassmorphic primary application bar with auto-fitting title. |
| **Navigation Bars** | `navigation_bar.dart` | `FrostedNavigationButtomBar`, `FrostedNavbarController` | *N/A* | Glassmorphic bottom navigation bar with animated tab selection. |
| **Screen Layout** | `base_widget.dart` | `BaseWidget` | *Scaffold Wrapper* | Screen wrapper providing integrated `FrostedAppBar` and `FrostedNavigationButtomBar`. |
| **Auth Feature** | `features/auth/` | `AuthScreen`, `AuthController` | *Complete Flow* | Pure UI authentication screens (`login`, `register`, `reset`, `verify`). |

---

## 🧩 Widget Catalog & Detailed API Guide

### 1. 📝 Input Fields (`AppTextField` & `Inputs`)
Modern glassmorphic text input fields supporting pre-configured presets, automatic obscure text toggles for passwords, custom error feedback, and label support.

#### Supported Preset Variants (`AppTextFieldType`):
- `AppTextFieldType.email`: Auto-configured with email keyboard, email icon, and validation.
- `AppTextFieldType.password`: Auto-configured with obscure text mask and interactive eye toggle button.
- `AppTextFieldType.name`: Auto-configured with word capitalization and person icon.
- `AppTextFieldType.phone`: Auto-configured with numeric phone keypad.
- `AppTextFieldType.number`: Auto-configured with numeric keypad.
- `AppTextFieldType.multiline`: Text area supporting multiline input.
- `AppTextFieldType.text`: Standard generic text field.

#### API & Key Parameters:
| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `type` | `AppTextFieldType` | `text` | Field preset variant controlling defaults. |
| `label` | `String?` | `null` | Label text rendered above input box. |
| `placeholder` | `String?` | `null` | Hint text displayed when field is empty. |
| `controller` | `TextEditingController?` | `null` | Controller for managing text state. |
| `obscureText` | `bool?` | *Auto for password* | Whether to mask text input. |
| `prefix` | `Widget?` | *Auto based on type* | Leading icon or widget. |
| `suffix` | `Widget?` | *Eye icon for password* | Trailing icon or widget. |
| `validator` | `FormFieldValidator<String>?` | `null` | Validation function for Form state. |

#### Code Usage Examples:

##### Email & Password Shortcuts via Mixin:
```dart
class LoginSampleWidget extends StatelessWidget with Inputs {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        emailField(
          context: context,
          controller: _emailController,
          validator: (val) => val == null || val.isEmpty ? 'Required' : null,
        ),
        const SizedBox(height: 14),
        passwordField(
          context: context,
          controller: _passwordController,
        ),
      ],
    );
  }
}
```

---

### 2. 🧊 Glass Cards (`BlurredCard` & `Cards`)
Translucent glassmorphic container leveraging Flutter's `BackdropFilter` and `ClipRRect` to create realistic glass depth.

**Smart Platform Optimization**: `BlurredCard` automatically adapts to the platform for maximum performance:
- **iOS**: Uses the highly optimized `BackdropFilter` (via Impeller) with a smooth `sigmaX/Y: 5.0`.
- **Android**: Automatically falls back to Alpha Transparency (`disableBlur = true`) mimicking Telegram's approach for fluid performance on all devices. You can override this behavior by explicitly setting the `disableBlur` parameter.

#### API & Key Parameters:
| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `child` | `Widget` | *Required* | Child content inside the glass card. |
| `borderRadius` | `BorderRadiusGeometry?` | `BorderRadius.circular(radius)` | Custom border radius geometry. |
| `radius` | `double?` | `50` | Circular corner radius when `borderRadius` is omitted. |
| `height` | `double?` | `null` | Explicit height for the container. |
| `width` | `double?` | `null` | Explicit width for the container. |
| `padding` | `EdgeInsetsGeometry?` | `null` | Inner padding surrounding child. |
| `margin` | `EdgeInsetsGeometry?` | `null` | Outer margin around card box. |
| `border` | `BoxBorder?` | `AppThemes.border` | Translucent border stroke decoration. |
| `sigmaX` | `double` | `5.0` | Horizontal backdrop blur intensity. |
| `sigmaY` | `double` | `5.0` | Vertical backdrop blur intensity. |
| `clipBehavior` | `Clip` | `Clip.hardEdge` | Content clipping behavior (optimized for speed). |
| `disableBlur` | `bool?` | `null` (Auto) | If true, disables the heavy blur filter and relies on alpha transparency. Defaults to true on Android and false on iOS. |

#### Code Usage Example:
```dart
class CardSampleWidget extends StatelessWidget with Cards {
  @override
  Widget build(BuildContext context) {
    return blurredCard(
      context: context,
      padding: const EdgeInsets.all(16),
      child: const Text('Frosted Glass Container'),
    );
  }
}
```

---

### 3. 🔘 Action Buttons (`AppButton`, `CircleButton`, `AppFloatingActionButton` & `Buttons`)

For a concise entry point use `FrostedButton.primary(label:, onPressed:)`,
`FrostedButton.secondary(label:, onPressed:)`, and
`FrostedIconButton(icon:, tooltip:, onPressed:)`. Constructors are const and
need no BuildContext argument or mixin. Primary uses filled styling; secondary
uses outlined styling. Null callbacks disable the button. `isLoading` blocks
activation and displays progress; it does not automatically start a Future.
Provide localized labels/tooltips from the host application. Optional icon,
width, foreground/background colors and borderRadius allow common overrides.
Icon actions support selection and an optional appearance override.

The short API delegates to the existing widgets, so theme, keyboard interaction
and performance controls use the same implementation. `AppButton`,
`CircleButton` and their helpers remain supported without new deprecations.
Advanced blur/border/shadow customization remains on those existing APIs.
Buttons Catalog demonstrates the short API alongside the original controls.

Circular buttons expose selected/enabled semantics and an accessible tap action.
Their minimum layout target is 48 logical pixels. Disabled buttons do not
animate on press, and reduced-motion settings suppress press scaling. Back
helpers follow Directionality. Regression tests exercise keyboard activation,
RTL, tooltips and disabled state. Light/dark geometry baselines are stored in
`test/goldens`; Flutter's test font is used, so device typography still needs
visual review. Run `flutter test` to compare baselines and review image changes
before intentionally regenerating them with `--update-goldens`.
A comprehensive set of action buttons supporting 5 visual style variants (`AppButtonStyle`). It also includes `AppFloatingActionButton` which acts as a versatile FAB (icon only, text only, or extended icon + text).

Button meaning is independent from appearance. Use
`FrostedActionRole.primary`, `secondary`, or `destructive` on `AppButton`, or
the matching `FrostedButton` constructor. Both examples retain destructive
error colors:

```dart
FrostedButton.destructive(label: 'Delete', onPressed: deleteItem)
FrostedButton.destructive(
  label: 'Delete',
  style: AppButtonStyle.glass,
  onPressed: deleteItem,
)
```

Resolution order is: local color and border overrides, then the corresponding
action colors in `FrostedThemeData`, then Material `ColorScheme`. Disabled
content/surfaces use `onSurface`; focus, hover, and pressed overlays use the
resolved role accent. Roles are also supported by icon buttons and FABs.
Existing buttons default to the primary role.

For a normal Future-based action, `FrostedAsyncButton` owns the state cycle and
does not require a controller:

```dart
FrostedAsyncButton(
  title: 'Save changes',
  icon: Icons.save_outlined,
  onPressed: () async => repository.save(),
  onSuccess: showSavedMessage,
  onError: (error, stackTrace) => logger.record(error, stackTrace),
)
```

Activation is blocked synchronously while an operation is active. Success and
error feedback reset after `feedbackDuration` (1.2 seconds by default), or can
remain visible with `null`. Late results after unmount are consumed without UI
callbacks or state updates. Errors are delivered to `onError`; no Dialog or
SnackBar is opened automatically. `FrostLoadingButtonController` remains the
advanced API for manually controlled workflows.

#### Supported Style Variants (`AppButtonStyle`):
- `AppButtonStyle.glass`: Translucent glassmorphic button with backdrop blur.
- `AppButtonStyle.colored`: Solid primary accent filled button.
- `AppButtonStyle.outlined`: Transparent button with primary border outline.
- `AppButtonStyle.text`: Subtle text-only button without border or card fill.
- `AppButtonStyle.waterDrop`: Lightweight liquid-highlight style for regular buttons and extended FABs.

`FrostLoadingButton` keeps its width during loading by default, uses a compact
24px indicator, and exposes configurable `loadingLabel`, `successLabel`, and
`errorLabel` semantics. Set `collapseOnLoading: true` to opt into the older
compact spinner layout.

The owner disposes its controller after removing the button. Listeners detach
when the controller changes or the button unmounts. Call `start()` synchronously
inside `onPressed`: live state checks block repeat taps before a rebuild.
Non-idle states reject taps while preserving feedback colors. The button does
not cancel application Futures; check `mounted` and invalidate stale requests
on Reset, as demonstrated in Loading Button Catalog. The loading-dialog catalog
is a dismissible preview with no delayed pop of an underlying route.

`CircleButton` now defaults to `CircleButtonStyle.waterDrop` and also supports
the explicit `glass` and `solid` styles. The water-drop surface uses a small,
performance-aware backdrop blur with a restrained highlight and rim. The old glass behavior remains
available by setting `style: CircleButtonStyle.glass`.
It uses lightweight gradients and highlights instead of a separate backdrop
blur, making small icon buttons look like liquid droplets with lower GPU cost.
The existing `glass` style remains the default.

```dart
circleButton(
  context: context,
  icon: Icons.settings,
  style: CircleButtonStyle.waterDrop,
  selected: true,
  selectedColor: Colors.deepPurple,
  selectedIconColor: Colors.white,
  tooltip: 'Settings',
  semanticLabel: 'Settings',
  onPressed: openSettings,
)
```

#### API & Key Parameters:
| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `String?` | `null` | Button label text string. |
| `icon` | `IconData?` | `null` | Icon displayed beside title label. |
| `style` | `AppButtonStyle` | `glass` | Visual style variant choice. |
| `role` | `FrostedActionRole` | `primary` | Semantic action role and color family. |
| `isLoading` | `bool` | `false` | Displays progress indicator when true. |
| `isDisabled` | `bool` | `false` | Disables touch interactions and dims colors. |
| `onPressed` | `VoidCallback?` | `null` | Tap callback handler. |
| `height` | `double?` | `48` | Fixed button height. |

#### Code Usage Examples:

```dart
class ButtonSampleWidget extends StatelessWidget with Buttons {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Glass Button
        appButton(
          context: context,
          title: 'Glass Action',
          style: AppButtonStyle.glass,
          onPressed: () {},
        ),
        const SizedBox(height: 10),
        // Colored Button with Loading
        appButton(
          context: context,
          title: 'Submit',
          style: AppButtonStyle.colored,
          isLoading: false,
          onPressed: () {},
        ),
        const SizedBox(height: 10),
        // Navigation Back Button
        Row(
          children: [
            backButton(context),
            const SizedBox(width: 8),
            closeButton(context),
          ],
        ),
        const SizedBox(height: 10),
        // Extended Floating Action Button
        appFab(
          context: context,
          icon: Icons.add,
          title: 'Create',
          onPressed: () {},
        ),
      ],
    );
  }
}
```

---

### 3.1 🔄 Animated Loading Buttons (`FrostLoadingButton`)
A dynamic button wrapper built on `AppButton` that handles transitions between multiple states (idle, loading, success, error) using Lottie animations. 

#### Available States (`FrostLoadingButtonState`):
- `idle`: Displays the normal text and icon.
- `loading`: Shrinks (or maintains width) to show an `AppLoadingIndicator` built with Lottie.
- `success`: Shows a success icon with customizable success color.
- `error`: Shows an error icon with customizable error color.

#### Code Usage Example:
```dart
class LoadingButtonSample extends StatelessWidget {
  final FrostLoadingButtonController controller = FrostLoadingButtonController();

  @override
  Widget build(BuildContext context) {
    return FrostLoadingButton(
      controller: controller,
      title: 'Submit Data',
      icon: Icons.upload,
      onPressed: () async {
        controller.start(); // Switch to loading
        await Future.delayed(const Duration(seconds: 2));
        controller.success(); // Switch to success
      },
    );
  }
}
```

---

### 4. 🗂️ Sliding Segmented Tabs (`AppSlidingTabs` & `Tabs`)
Telegram-inspired sliding tab selector with an animated pill indicator that smoothly slides between tab options. Fully RTL-aware.

#### API & Key Parameters:
| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `tabs` | `List<String>` | *Required* | List of tab label strings. |
| `selectedIndex` | `int` | *Required* | Currently active tab index. |
| `onTabChanged` | `ValueChanged<int>` | *Required* | Callback triggered when a tab is tapped. |
| `height` | `double` | `46` | Total height of tabs container. |
| `activeTextStyle` | `TextStyle?` | *Bold OnPrimary* | Custom style for selected tab text. |
| `inactiveTextStyle` | `TextStyle?` | *OnSurfaceVariant* | Custom style for inactive tab text. |

#### Code Usage Example:
```dart
class TabSampleWidget extends StatefulWidget with Tabs {
  @override
  State<TabSampleWidget> createState() => _TabSampleWidgetState();
}

class _TabSampleWidgetState extends State<TabSampleWidget> {
  int _tabIndex = 0;

  @override
  Widget build(BuildContext context) {
    return widget.appSlidingTabs(
      context: context,
      tabs: const ['Tab One', 'Tab Two', 'Tab Three'],
      selectedIndex: _tabIndex,
      onTabChanged: (index) => setState(() => _tabIndex = index),
    );
  }
}
```

---

### 5. 📑 Glassmorphic Bottom Sheets (`AppBottomSheet` & `BottomSheets`)
Translucent backdrop filter bottom sheet modal with drag handle indicator and automatic keyboard inset padding (`viewInsets`).

#### API & Key Parameters:
| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `context` | `BuildContext` | *Required* | Build context for navigator. |
| `child` | `Widget` | *Required* | Sheet content widget. |
| `title` | `String?` | `null` | Optional header title string with close button. |
| `header` | `Widget?` | `null` | Replaces the default title header. |
| `actions` | `Widget?` | `null` | Footer pinned when space allows and scrollable on compact layouts. |
| `maxHeightFactor` | `double` | `0.92` | Maximum fraction of usable keyboard-adjusted height. |
| `isScrollControlled` | `bool` | `true` | Allows sheet to resize with keyboard. |

#### Code Usage Example:
```dart
class SheetSampleWidget extends StatelessWidget with BottomSheets {
  void _openSheet(BuildContext context) {
    showAppBottomSheet(
      context: context,
      title: 'Modal Settings',
      child: const Padding(
        padding: EdgeInsets.all(16),
        child: Text('BottomSheet Content Here'),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return FrostedButton.primary(
      label: 'Open Sheet',
      onPressed: () => _openSheet(context),
    );
  }
}
```

---

### 6. 💬 Glassmorphic Dialogs (`AppDialog` & `Dialogs`)

Input dialogs submit through the same validation path from the confirmation
button and keyboard Done action. Invalid input keeps the dialog open. Cancel
returns null. `AppDialog.actions` provides an optional footer: on sufficient
vertical space only the body scrolls, while very short viewports scroll the
body and footer together. Keyboard insets are handled by Flutter's Dialog;
callers should not add the keyboard height to insetPadding again.

The dialog regression suite covers a short viewport above the keyboard,
RTL with 2x text scaling, portrait/landscape viewport changes, and keyboard
insets appearing/disappearing. Input tests verify invalid Done submission,
valid Done and button submission, Cancel, and system back results. These are
widget simulations; physical-device keyboard behavior still benefits from
manual checks. The Input Dialog catalog includes a longer description for
trying these scenarios interactively.

Dialogs and bottom sheets share `FrostedAdaptiveSurfaceLayout`. Headers and
actions remain visible on regular viewports, while short or keyboard-reduced
layouts use one scroll view. `FrostedAdaptiveActions` stacks at narrow widths
or accessibility text scale. Warning confirmations use
`FrostedActionRole.destructive` when `isDestructive` is true. See
`FROSTED_ADAPTIVE_MODALS.md` for compatibility and low-end-device behavior.
See `FROSTED_PERFORMANCE.md` for the shared rendering policy, presets, and
profile measurement protocol.

Glassmorphic popup dialogs designed to alert the user, ask for confirmation, or prompt for text input.

#### Available Mixin Methods:
- `showAppWarningDialog`: Shows a warning dialog returning a boolean.
- `showAppErrorDialog`: Shows an error dialog with an OK button.
- `showAppInputDialog`: Shows an input dialog returning the submitted string, with support for validation.

#### Shared API & Key Parameters:
| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `context` | `BuildContext` | *Required* | Build context for navigator. |
| `title` | `String?` | `null` | Optional header title string. |
| `description` | `String?` | `null` | Optional description or body text. |
| `icon` | `IconData?` | *Varies* | Optional top icon. Set to `null` to hide. |
| `iconColor` | `Color?` | `error` | Theme color applied to the icon and its background. |
| `confirmText` | `String?` | localized | Optional positive/submit label override. |
| `cancelText` | `String?` | localized | Optional negative label override. |
| `validator` | `FormFieldValidator<String>?`| `null` | Validation logic for `showAppInputDialog`. |
| `titleColor` | `Color?` | `null` | Custom color for the title text. |
| `descriptionColor` | `Color?` | `null` | Custom color for the description text. |
| `confirmButtonColor` | `Color?` | `null` | Custom background color for the confirm button. |
| `confirmTextColor` | `Color?` | `null` | Custom text color for the confirm button. |
| `cancelButtonColor` | `Color?` | `null` | Custom background color for the cancel button. |
| `cancelTextColor` | `Color?` | `null` | Custom text color for the cancel button. |
| `isDestructive` | `bool` | `false` | Uses destructive styling for warning confirmation actions. |

`AppDialog` now uses one clearer glass surface, a restrained blur, a
fade/scale entrance animation, and a scrollable height constrained by the
keyboard insets. Input dialogs move above the keyboard instead of being
covered by it. The default cancel action is outlined while the primary action
remains filled.

#### Code Usage Example:
```dart
class DialogSampleWidget extends StatelessWidget with Dialogs {
  @override
  Widget build(BuildContext context) {
    return FrostedButton.primary(
      label: 'Open Input Dialog',
      onPressed: () async {
        final result = await showAppInputDialog(
          context: context,
          title: 'Enter Name',
          description: 'Please enter your full name below.',
          hintText: 'John Doe',
          validator: (val) => val == null || val.isEmpty ? 'Required' : null,
        );
      },
    );
  }
}
```

---

### 7. ⏳ Loading Indicator (`AppLoadingIndicator`)
A generic glassmorphic loading indicator built on a Lottie animation (`assets/lottie/loading.json`), acting as a drop-in replacement for standard `CircularProgressIndicator`.

#### Available Methods in `Dialogs` mixin:
- `showAppLoadingDialog`: Shows a glassmorphic non-dismissible loading dialog featuring the `AppLoadingIndicator` and an optional message.

#### Code Usage Example:
```dart
class LoadingSampleWidget extends StatelessWidget with Dialogs {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Raw indicator
        const AppLoadingIndicator(size: 40),
        // Dialog wrapper
        ElevatedButton(
          onPressed: () => showAppLoadingDialog(
            context: context, 
            message: 'Loading...', 
          ),
          child: const Text('Show Loading Dialog'),
        ),
      ],
    );
  }
}
```

---

### 7. 📋 Glassmorphic List Tiles (`FrostedListSection` & `FrostedListTile`)
A glassmorphic list section that groups multiple list tiles together. It automatically handles rounded corners and dividers between tiles, mimicking native iOS settings menus but with a modern glass look.

#### API & Key Parameters:
| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `header` | `Widget?` | `null` | Header widget displayed above the section. |
| `children` | `List<Widget>` | *Required* | List of `FrostedListTile`s. |
| `margin` | `EdgeInsetsGeometry` | `EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0)` | Margin around the section. |
| `separatorColor` | `Color?` | `dividerColor` | Color of the divider line between tiles. |

#### Code Usage Example:
```dart
class SettingsSampleWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return FrostedListSection(
      header: const Text('Preferences'),
      children: [
        FrostedListTile(
          title: const Text('Notifications'),
          trailing: const Icon(Icons.chevron_right),
          onTap: () {},
        ),
        FrostedListTile(
          title: const Text('Privacy'),
          trailing: const Icon(Icons.chevron_right),
          onTap: () {},
        ),
      ],
    );
  }
}
```

---

### 8. 🖼️ Screen Scaffold Layout (`BaseWidget`, `FrostedAppBar` & `FrostedNavigationButtomBar`)
Screen scaffold wrapper ensuring consistent layout padding, safe areas, and a floating glass app bar (`FrostedAppBar`) as well as an optional floating glass bottom navigation bar (`FrostedNavigationButtomBar`).

#### API & Key Parameters (`BaseWidget`):
| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `child` | `Widget` | *Required* | Body content widget. |
| `title` | `String?` | `null` | Title displayed inside the glass `FrostedAppBar`. |
| `actions` | `List<Widget>?` | `null` | End-aligned action icons in `FrostedAppBar`. |
| `isHideAppbar` | `bool` | `false` | Hides the top app bar when true. |
| `hideAppBarOnScroll` | `bool` | `false` | Hides the default floating app bar while scrolling down and reveals it after at least 1 logical pixel of upward scrolling. |
| `appBarScrollBehavior` | `AppBarScrollBehavior` | `none` | Selects `none`, `hideAll`, or `collapseTitle` behavior. |
| `hideAfter` / `showAfter` | `double` | `16` / `8` | Hysteresis distances in logical pixels used to prevent flickering. |
| `titleWidget` | `Widget?` | `null` | Custom title content for the default app bar. |
| `showStatusBarGradient` | `bool` | `true` | Adds a theme-aware status-bar gradient: dark scaffold tint in dark mode and a subtle black-to-transparent tint in light mode. |
| `bottomNavigationBar` | `Widget?` | `null` | Optional bottom bar component. |

#### API & Key Parameters (`FrostedNavigationButtomBar`):
| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `controller` | `FrostedNavbarController` | *Required* | Controller managing the active tab index. |
| `items` | `List<FrostedNavbarItem>` | *Required* | List of tab items to display (data class). |
| `action` | `Widget?` | `null` | Optional action widget (e.g. FAB) displayed at the end. |
| `onTabChanged` | `ValueChanged<int>?` | `null` | Global callback executed when any tab is tapped. |

#### Code Usage Example:
```dart
class MyScreen extends StatefulWidget {
  @override
  State<MyScreen> createState() => _MyScreenState();
}

class _MyScreenState extends State<MyScreen> {
  final FrostedNavbarController _navController = FrostedNavbarController();

  @override
  void dispose() {
    _navController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return BaseWidget(
      title: 'Dashboard',
      actions: [
        IconButton(icon: const Icon(Icons.settings_outlined), onPressed: () {}),
      ],
      bottomNavigationBar: FrostedNavigationButtomBar(
        controller: _navController,
        onTabChanged: (index) {
          print('Tab changed to $index');
        },
        items: [
          FrostedNavbarItem(icon: Icons.home, title: 'Home'),
          FrostedNavbarItem(icon: Icons.search, title: 'Search', badgeCount: 3),
        ],
        action: appFab(context: context, icon: Icons.add, onPressed: () {}),
      ),
      child: const Center(child: Text('Screen Content')),
    );
  }
}
```

#### Scroll-to-hide app bar

Set `appBarScrollBehavior: AppBarScrollBehavior.hideAll` when a screen should
reclaim the top edge while the user scrolls down. The default floating
`FrostedAppBar` hides after `hideAfter` logical pixels and returns after
`showAfter` logical pixels. The different thresholds prevent flickering when
the user's finger changes direction. It also remains visible when the scroll
position reaches the top. Reaching or bouncing at the bottom does not count as
an upward reveal; the bar returns only after content actually moves upward away
from the bottom edge.

The option is disabled by default and applies only to the default floating
app bar. A custom `appbar` passed to `BaseWidget` continues to use the normal
`Scaffold.appBar` behavior. The implementation changes state only when the
visibility direction changes, keeps the scrollable child outside the animated
app-bar subtree, and pauses app-bar animations while hidden. This avoids
rebuilding the page content and limits extra work while the glass blur is
moving.

Use `AppBarScrollBehavior.collapseTitle` to keep the back button and actions
available while fading out only the title. This is useful on detail pages
where navigation actions should remain reachable. The legacy
`hideAppBarOnScroll: true` option is still supported and maps to `hideAll`.

```dart
BaseWidget(
  title: 'Messages',
  appBarScrollBehavior: AppBarScrollBehavior.hideAll,
  child: ListView.builder(
    itemCount: 50,
    itemBuilder: (context, index) => ListTile(title: Text('Message $index')),
  ),
)
```

---

### 7. 🚦 Glassmorphic Stepper (`FrostedStepper` & `Steppers`)
A multi-step progress indicator designed with the liquid glass aesthetic. Supports both horizontal and vertical orientations.

#### Available Mixin Methods:
- `appStepper`: Returns a `FrostedStepper` instance.

#### API & Key Parameters:
| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `controller` | `FrostedStepperController` | *Required* | Manages the current step and navigation. |
| `direction` | `FrostedStepperDirection` | `horizontal` | Layout direction (`horizontal` or `vertical`). |
| `activeColor` | `Color?` | `primary` | Color for active steps and completed lines. |
| `inactiveColor` | `Color?` | `outlineVariant` | Color for inactive steps and remaining lines. |
| `textColor` | `Color?` | `onPrimary` | Color for the step number text. |
| `lineSize` | `double` | `2` | Thickness of the connecting line. |
| `stepSize` | `double` | `32` | Diameter of the step circle. |

#### Code Usage Example:
```dart
class StepperSampleWidget extends StatefulWidget {
  @override
  State<StepperSampleWidget> createState() => _StepperSampleWidgetState();
}

class _StepperSampleWidgetState extends State<StepperSampleWidget> with Steppers {
  late FrostedStepperController _controller;

  @override
  void initState() {
    super.initState();
    _controller = FrostedStepperController(
      steps: 3,
      stepsList: ['Cart', 'Address', 'Payment'],
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return appStepper(
      controller: _controller,
      direction: FrostedStepperDirection.horizontal,
    );
  }
}
```

---

## 🔐 Generic Authentication Catalog (`features/auth`)

The authentication module provides ready-to-use pure UI screens and forms for sign-in, registration, password recovery, and email verification:

- **`AuthScreen`**: Complete unified page featuring sliding tabs between Sign In and Register.
- **`LoginFormWidget`**: Standalone sign-in form using `emailField` and `passwordField`.
- **`RegisterFormWidget`**: Account creation form with name, email, password, and confirm password.
- **`ForgotPasswordFormWidget`**: Reset email request form.
- **`ResetPasswordFormWidget`**: Token verification and new password entry form.
- **`VerifyEmailFormWidget`**: Email token confirmation form.
- **`AuthController`**: Pure UI state manager for view modes, loading states, and user feedback.

#### Feature Flags & Custom Overrides
Both `AuthScreen` and `AuthView` accept the following optional boolean parameters (all default to `true`) to allow you to disable specific authentication flows, making the UI highly reusable across different applications:
- `showRegisterButton`
- `showForgotPasswordButton`
- `showResetTokenButton`
- `showVerifyTokenButton`

Additionally, you can completely override the default buttons with your own custom `Widget`s using:
- `customLoginButton`
- `customRegisterButton`
- `customForgotPasswordButton`
- `customResetTokenButton`
- `customVerifyTokenButton`

```dart
// Example embedding AuthScreen with disabled features and a custom login button:
AuthScreen(
  showRegisterButton: false, // Disables registration
  showForgotPasswordButton: false, // Disables forgot password
  showResetTokenButton: false,
  showVerifyTokenButton: false,
  customLoginButton: ElevatedButton(
    onPressed: () {}, 
    child: Text('My Custom Login Button'),
  ),
  onLoginSuccess: () {
    Navigator.of(context).pushReplacementNamed('/home');
  },
);
```

---

## 🔑 Tour & Onboarding Support (Widget Keys)

To fully support in-app tutorials, interactive tours, and automated testing, **every widget and mixin generator method** in `frosted_ui_kit` now accepts an optional `Key? key` parameter. 

When building an onboarding flow (using packages like `showcaseview` or `tutorial_coach_mark`), you can assign a `GlobalKey` to any internal UI component seamlessly.

**Example Usage:**
```dart
final GlobalKey myButtonKey = GlobalKey();

appButton(
  key: myButtonKey, // Pass the key directly to the mixin generator
  context: context,
  title: 'Start Tour',
  onPressed: () => _startTour(),
);
```

This applies to all components including:
- Mixin generators (`appButton`, `textField`, `showAppBottomSheet`, `showAppWarningDialog`, `blurredCard`, `appSlidingTabs`, `appStepper`, etc.)
- Direct widget instantiations (`AppButton`, `AppTextField`, `BaseWidget`, etc.)
- Bottom Sheets and Dialogs via their mixin launchers.



---

## 🚀 Quick Start

This guide takes a new Flutter project from installation to its first glass
surface without requiring knowledge of the repository's internal structure.

### 1. Install the package

Add the package from pub.dev to `pubspec.yaml`:

```yaml
dependencies:
  frosted_ui_kit: ^1.2.0
```

Then run `flutter pub get`.

For local package development only, use a path relative to your own app:

```yaml
dependencies:
  frosted_ui_kit:
    path: ../frosted_ui_kit
```

### 2. Copy-paste example

Place this file in `lib/main.dart`. It is self-contained and does not import
anything from the package's internal `example` application:

```dart
import 'package:flutter/material.dart';
import 'package:frosted_ui_kit/frosted_ui_kit.dart';

void main() => runApp(const QuickStartApp());

class QuickStartApp extends StatelessWidget {
  const QuickStartApp({super.key});

  @override
  Widget build(BuildContext context) {
    return FrostedPerformance.fromData(
      data: FrostedPerformance.balanced,
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          brightness: Brightness.light,
          useMaterial3: true,
          extensions: const [FrostedThemeData.light],
        ),
        darkTheme: ThemeData(
          brightness: Brightness.dark,
          useMaterial3: true,
          extensions: const [FrostedThemeData.dark],
        ),
        themeMode: ThemeMode.system,
        home: const QuickStartPage(),
      ),
    );
  }
}

class QuickStartPage extends StatelessWidget {
  const QuickStartPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text('Welcome', style: TextStyle(fontSize: 28)),
              const SizedBox(height: 20),
              FrostedButton.primary(
                label: 'Open sheet',
                onPressed: () => showModalBottomSheet<void>(
                  context: context,
                  backgroundColor: Colors.transparent,
                  isScrollControlled: true,
                  builder: (_) => const AppBottomSheet(
                    title: 'Quick action',
                    child: Text('Your glass surface is ready.'),
                  ),
                ),
              ),
              const SizedBox(height: 12),
              FrostedButton.secondary(
                label: 'Show dialog',
                onPressed: () => showDialog<void>(
                  context: context,
                  builder: (_) => const AppDialog(
                    child: Text('Dialogs adapt to small screens and keyboards.'),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

For standardized results, use the `Dialogs` and `BottomSheets` mixins and
helpers such as `showAppWarningDialog` and `showAppInputDialog`.

### 3. Configure the theme

Add `FrostedThemeData` to `ThemeData.extensions`. Local widget properties take
precedence over theme tokens, followed by the package defaults:

```dart
ThemeData(
  extensions: const [
    FrostedThemeData(
      dialogRadius: 28,
      buttonRadius: 18,
      dialogBlur: 10,
      spacing: 14,
    ),
  ],
)
```

Use `FrostedPerformance.full` for high-end devices, `balanced` as a practical
general default, and `lite` for low-end devices or reduced-transparency modes:

```dart
FrostedPerformance.fromData(
  data: FrostedPerformance.lite,
  child: MaterialApp(home: const QuickStartPage()),
)
```

`lite` disables `BackdropFilter` while preserving layout, interaction, and the
core translucent surface treatment.

### 4. Configure localization

Add `flutter_localizations` to the application and provide delegates and
supported locales:

```dart
MaterialApp(
  localizationsDelegates: const [
    AppLocalizations.delegate,
    GlobalMaterialLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
    GlobalCupertinoLocalizations.delegate,
  ],
  supportedLocales: AppLocalizations.supportedLocales,
)
```

The package provides defaults for common actions such as `confirm`, `cancel`,
and `ok`. Applications can pass their own localized strings to dialog APIs;
the package does not force a single language.

### 5. Choose the right component

| Need | Recommended component | Typical use |
|---|---|---|
| Regular action | `FrostedButton.primary` | Save, continue, send |
| Safe or cancel action | `FrostedButton.secondary` | Back, cancel, close |
| Dangerous action | `FrostedButton.destructive` | Delete, disable, remove |
| Icon-only action | `FrostedIconButton` or `CircleButton` | Settings, back, add |
| Async operation | `FrostedAsyncButton` | Save or upload with feedback |
| Text input | `AppTextField` or `showAppInputDialog` | Forms and search |
| Confirmation | `showAppWarningDialog` | Decisions requiring confirmation |
| Error message | `showAppErrorDialog` | Failed operations and warnings |
| Bottom content | `showAppBottomSheet` | Options and details |
| Full screen layout | `BaseWidget` | Floating app bar and scroll behavior |

### 6. Migration from older APIs

No migration is required. Existing names and mixins remain supported,
including `BluredCard` and the legacy button APIs. For new code:

- Prefer `BlurredCard`; `BluredCard` remains a compatibility alias.
- Prefer `FrostedButton` for everyday actions and `AppButton` for advanced customization.
- Pass `role: FrostedActionRole.destructive` instead of inferring risk from color.
- Use `FrostedPerformance` instead of disabling `BackdropFilter` per component.
- Use `showAppInputDialog` or `AppDialog(actions: ...)` for keyboard-aware layouts.

For advanced details, see [FrostedThemeData](#central-theme-tokens-frostedthemedata),
[shared glass surfaces](#shared-glass-rendering-architecture), and
[adaptive dialogs and bottom sheets](#adaptive-dialogs-and-bottom-sheets).



---

## 🎨 Central Theme Tokens (FrostedThemeData)

Import `frosted_ui_kit.dart` and install `FrostedThemeData` in
`ThemeData.extensions`. Light/dark presets inherit colors from the matching
Material ColorScheme instead of creating separate color schemes per widget.

```dart
final theme = ThemeData(
  extensions: const [FrostedThemeData(
    surfaceColor: Color(0xFFE6F0F4),
    contentColor: Color(0xFF172B36),
    borderColor: Color(0x55778899),
    buttonRadius: 20,
    dialogRadius: 28,
    glassBlur: 4,
    dialogBlur: 10,
    appBarBlur: 4,
    spacing: 12,
    motionDuration: Duration(milliseconds: 180),
  )],
);
```

Resolution: explicit local property, then theme token, then existing default.
Generic cards inherit surface/border/radius/blur. Regular buttons inherit
radius and foreground; water-drop surfaces inherit tint/blur. AppBar inherits
blur, and Dialog inherits surface/opacity/radius/blur/spacing/entrance duration.
Tabs and input fields inherit buttonRadius and their own blur tokens. Bottom
sheets inherit surface tint, sheetBlur and dialogRadius + 4 for the top corners.
Navigation inherits borderColor, navigationBlur and twice buttonRadius. Tabs
use motionDuration for text and 1.25 times that duration for sliding feedback.
A filled primary button still uses its ColorScheme primary. Local style
overrides remain available; fixed functional measurements such as drag handles
and icon sizes intentionally remain separate from design tokens.

Action roles can be customized independently from button appearance with
`primaryActionColor`/`onPrimaryActionColor`,
`secondaryActionColor`/`onSecondaryActionColor`, and
`destructiveActionColor`/`onDestructiveActionColor`. Null role colors inherit
the matching primary, secondary, or error pair from Material `ColorScheme`.
The resolution order is local widget color, role token, then ColorScheme.
Disabled colors derive from `onSurface`; interaction overlays derive from the
resolved role accent.

Component blur defaults preserve existing appearances: inputBlur 10, tabsBlur
10, sheetBlur 15, navigationBlur 20. For a lighter recipe:

```dart
const FrostedThemeData(
  inputBlur: 4,
  tabsBlur: 4,
  sheetBlur: 8,
  navigationBlur: 6,
)
```

Instances are immutable and const defaults are reused. Lookup uses the normal
Theme inherited dependency; no additional controller, timer or listener is
created. `lerp` supports theme transitions with endpoint fast paths. `copyWith`
retains nullable colors when omitted; construct a fresh instance to clear them.
Blur performance settings remain independent of design tokens. No device FPS
or GPU improvement is claimed without profiling.

Compatibility: constructor calls remain supported. `BlurredCard.sigmaX/Y`,
`FrostedAppBar.sigmaX/Y`, and `AppDialog.surfaceOpacity/blurSigma` are now
nullable overrides so an omitted value can inherit the theme. Code directly
reading these public fields must handle null. Existing defaults and geometry
goldens pass when no custom extension is installed.

The sigmaX/Y override fields and helper arguments on inputs, tabs and sheets
are nullable too, to distinguish omitted values from explicit overrides. Their
effective defaults are unchanged. Code reading these fields should resolve
them against the matching token.

Verification: copyWith, lerp endpoints/interpolation, fallback, local surface
override and button radius; complete widget/golden suite. Extend token coverage
tests alongside further component migrations.



---

## 🔬 Shared Glass Rendering Architecture

All kit backdrop filters are built by the internal `GlassBackdrop` primitive.
Cards and water-drop buttons retain their own tint, border, shadow and content
layout; the primitive owns bounded clipping and blur only. No extra controller,
timer, raster cache or unconditional RepaintBoundary is introduced.

`FrostedPerformance` is exported from the main library. Global blurEnabled and
blurScale apply to all surfaces. Lite and zero scale create no backdrop filter.
Cards retain their platform-specific Android fallback and local disableBlur;
explicit colors are retained. Default card fallback uses fallbackOpacity in lite.

A private inherited marker prevents a nested kit surface from adding a second
blur when an ancestor already filters its backdrop. This intentionally changes
stacked glass: an input inside a glass dialog uses the dialog's blur, keeping its
own tint and border. Nested stronger blur is not independently applied.
Independent siblings keep separate filters; overlapping siblings are not given
a shared BackdropKey, which could produce incorrect compositing.

Animated child content stays in its original layer order. Moving it or adding
raster boundaries requires profile measurements, tracked in P1. Dialog entrance
and button press scaling respect reduced-motion settings. Full animation policy
for other components is outside this rendering refactor.

Tests verify ancestor filter reuse, independent siblings, lite and zero scale,
balanced scaling once, and existing light/dark geometry goldens. These establish
render-tree behavior and visual regression protection, not a measured FPS gain.



---

## Adaptive Dialogs and Bottom Sheets

Dialogs and bottom sheets share `FrostedAdaptiveSurfaceLayout`, which divides a
modal surface into optional header, scrollable body, and optional actions.
This keeps behavior consistent across compact phones, tablets, large text,
RTL, and keyboard-visible layouts.

### Layout behavior

On a regular viewport the header and actions remain visible while only the body
scrolls. When available height is too small, all three regions move into one
scroll view. The threshold scales with accessibility text size so a large
header or stacked actions cannot overflow.

`FrostedAdaptiveActions` displays secondary and primary actions in one row when
space allows. Below 360 logical pixels, or at a text scale of 1.3 and above,
the actions stack vertically with full-width touch targets. Secondary remains
before primary, keeping the safe action ahead of a destructive action.

### Dialog usage

```dart
AppDialog(
  header: Text(appStrings.deleteTitle),
  actions: FrostedAdaptiveActions(
    secondary: FrostedButton.secondary(
      label: appStrings.cancel,
      onPressed: cancel,
    ),
    primary: FrostedButton.destructive(
      label: appStrings.delete,
      onPressed: confirmDelete,
    ),
  ),
  child: Text(appStrings.deleteDescription),
)
```

`showAppWarningDialog(isDestructive: true)` assigns the destructive role to
the confirmation action. Default Confirm, Cancel, Submit, and OK labels follow
`FrostedAppLocalizations` when its delegate is installed. Explicit strings
continue to take precedence.

Input dialogs retain one validation path for keyboard Done and the confirmation
button. Dialog constraints continue to account for keyboard insets without
adding them twice.

### Bottom-sheet usage

```dart
showAppBottomSheet(
  context: context,
  title: appStrings.settings,
  actions: FrostedButton.primary(
    label: appStrings.save,
    onPressed: save,
  ),
  child: const SettingsForm(),
)
```

`AppBottomSheet` animates the complete surface above `viewInsets.bottom`
instead of inserting a large empty spacer inside its content. Its height is
clamped to the usable viewport through `maxHeightFactor`, which defaults to
0.92. `header` can replace the title row; `showCloseButton`, `showDragHandle`,
and `closeTooltip` customize the default chrome.

### Performance on lower-end devices

Each modal owns one `BlurredCard` surface. Nested kit controls detect the glass
ancestor and do not create another backdrop blur. Bottom sheets use
`Clip.hardEdge` by default, avoiding anti-aliased save layers for routine
clipping.

All surfaces honor `FrostedPerformance`. In lite mode no `BackdropFilter` is
created; the opaque fallback preserves contrast and geometry. Balanced mode
scales sigma once. Keyboard padding uses the shared theme duration and becomes
immediate when reduced motion is active. No FPS claim is made without
profile-mode device measurements.

### Compatibility

Existing child, title, sizing, glass, drag, and dismissal parameters remain
supported. New `header` and `actions` parameters are additive. Existing custom
dialog children continue to render, so applications can migrate incrementally.

### Verification

Widget tests cover destructive roles, 320px width with 2x text, keyboard
insets, a long bottom-sheet body, localized default actions, and blur counts in
full and lite modes. Existing dialog validation, rotation, RTL, and keyboard
tests remain part of the full suite.



---

## Brand Assets

Frosted UI Kit uses a glass droplet mark with a lavender-to-cyan highlight on
a deep indigo field. The mark represents the library's two core ideas:
translucent surfaces and fluid interaction.

### Logo

The source logo is available at:

`assets/brand/frosted_ui_kit_logo.png`

The same source is copied into the example app so native platform icons and
the Flutter asset catalog remain visually aligned.

### Usage guidance

- Use the full mark on dark or neutral backgrounds.
- Keep clear space around the mark equal to at least one quarter of its width.
- Do not recolor, stretch, crop, or add text inside the mark.
- For small UI sizes, use the icon without a wordmark; the mark is designed to
  remain recognizable at compact sizes.

### Example application icon

The example app uses the same mark for Android, iOS, macOS, and web icons.
Platform-specific sizes are generated from the source image to avoid separate
variants drifting apart over time.



---

## API Stability and Deprecation

### Public entry point

Application code should import `package:frosted_ui_kit/frosted_ui_kit.dart`.
The package entry point exports the supported widgets, theme data, performance
configuration, localization types, and generic authentication types. Internal
`src/` imports are not part of the compatibility contract.

The public entry point is intentionally grouped into these API areas:

| Area | Public types |
| --- | --- |
| Surfaces and layout | `BlurredCard`, `GlassBackdrop`, `BaseWidget`, `FrostedAdaptiveSurfaceLayout` |
| Navigation | `FrostedAppBar`, `FrostedNavigationBottomBar`, `FrostedNavbarController` |
| Buttons and loading | `AppButton`, `CircleButton`, `FrostedButton`, `FrostedAsyncButton`, `FrostLoadingButton` |
| Inputs and modals | `AppTextField`, `AppDialog`, `AppBottomSheet` |
| Design system | `FrostedThemeData`, `FrostedPerformance`, `FrostedPerformanceData` |
| Supporting components | tabs, steppers, list tiles, loading indicators, localization, and generic auth types |

The auth data and domain exports remain public for 1.x compatibility. New
applications should depend on the domain contracts and presentation widgets;
the data implementations are exported only to support existing integrations.
The authentication review and lifecycle ownership rules are documented in
[Authentication API Review](#authentication-api-review).

Authentication-only consumers may instead import the optional facade:

```dart
import 'package:frosted_ui_kit/auth.dart';
```

### Compatibility policy

Existing 1.x APIs are retained when a spelling or naming correction is made.
Deprecated APIs remain available and forward to the canonical implementation.

| Deprecated API | Canonical API |
| --- | --- |
| `CricleButton` | `CircleButton` |
| `BluredCard` | `BlurredCard` |
| `Cards.bluredCard` | `Cards.blurredCard` |
| `FrostedNavigationButtomBar` | `FrostedNavigationBottomBar` |

No deprecated API is removed as part of this compatibility pass.

### Migration guidance

Replace deprecated names when touching existing code. Projects that need a
gradual migration can keep the old names temporarily; behavior and layout are
unchanged because the aliases delegate to the same implementation.

Breaking changes require a changelog entry, migration notes, and a major
version.



---

## FrostedAsyncButton

`FrostedAsyncButton` is the beginner-friendly API for a button that starts a
`Future`. It owns loading, success, error, repeat-tap prevention, feedback
timing, and mounted checks. No controller or `setState` is required.

### Basic usage

```dart
FrostedAsyncButton(
  title: appStrings.save,
  icon: Icons.save_outlined,
  onPressed: () async => repository.save(),
  onSuccess: showSavedMessage,
  onError: (error, stackTrace) => logger.record(error, stackTrace),
)
```

The application supplies localized `title`, `loadingLabel`, `successLabel`,
and `errorLabel` values when the defaults do not match its language.

### State lifecycle

1. The idle button accepts one activation.
2. Its state changes to loading synchronously, before awaiting the callback.
   A second pointer, keyboard, or semantics activation is rejected.
3. A completed Future shows success; a thrown error shows error and is passed
   to `onError` with its stack trace.
4. The button returns to idle after `feedbackDuration`, which defaults to 1.2
   seconds. Set it to `null` to retain the terminal state while the widget
   remains mounted.

The widget never opens a Dialog, SnackBar, or retry UI automatically. Those
decisions remain in application code.

### Lifecycle and late results

Disposing the widget cancels its feedback timer and invalidates the active
operation generation. The application Future itself is not canceled because a
generic Dart Future has no cancellation contract. When that Future completes
after unmount, the result is consumed without `setState`, controller updates,
or success/error callbacks.

For cancellable network work, cancellation remains the responsibility of the
repository or request client. Pass its cancellation signal through the
application callback.

### Appearance and role

`style` controls appearance and `role` controls semantic colors, matching
`AppButton`. A destructive asynchronous action can therefore use a glass
surface without losing its error color family:

```dart
FrostedAsyncButton(
  title: appStrings.deleteAccount,
  role: FrostedActionRole.destructive,
  style: AppButtonStyle.glass,
  onPressed: accountRepository.delete,
)
```

### Choosing the correct API

| Need | API |
| --- | --- |
| Run one Future and show automatic feedback | `FrostedAsyncButton` |
| Application code drives every state manually | `FrostLoadingButton` |
| Normal synchronous action | `FrostedButton` or `AppButton` |

`FrostLoadingButtonController` remains supported and is not deprecated.

### Verification

Widget tests cover synchronous repeat blocking, success and automatic reset,
captured errors and retry, disabled semantics, and completion after unmount.
The full package test suite and `flutter analyze` must pass before release.



---

## Authentication API Review

### Current contract

The authentication module is generic at its domain boundary:

- `UserEntity` carries app-specific attributes through `customData`.
- `AuthRepository` is the application-facing contract.
- `AuthRemoteDataSource` is an injectable backend adapter.
- `AuthController` owns view state and can be supplied by the host app.
- `AuthScreen` and `AuthView` expose flow flags and button overrides.

The data models and mock data source remain exported for 1.x compatibility and
for package examples. Applications with a real backend should provide their
own `AuthRemoteDataSource` and `AuthRepository` implementation.

### Lifecycle correction

`AuthScreen` no longer creates a throwaway `AuthController` inside `build`.
When no controller is supplied, `AuthView` creates exactly one local controller
and disposes it with the view. When a controller is supplied, ownership stays
with the caller.

This prevents duplicate listeners, unnecessary allocations, and state updates
being sent to a controller different from the one rendering the forms.

### Remaining follow-up

The controller currently contains default English feedback messages for the
legacy standalone auth flow. A future major API can expose message builders or
localized callbacks without changing the repository contract. Existing strings
are retained for compatibility in the current release.



---

## Frosted UI Kit Performance Policy

`FrostedPerformance` is the single performance policy for glass surfaces in
`frosted_ui_kit`. It lets an application choose the rendering cost once at the
root of a widget tree instead of configuring every component independently.

### Presets

```dart
FrostedPerformance.fromData(
  data: FrostedPerformance.balanced,
  child: MaterialApp(home: const HomePage()),
)
```

| Preset | Backdrop blur | Blur scale | Recommended use |
|---|---:|---:|---|
| `full` | Enabled | `1.0` | Flagship devices and desktop |
| `balanced` | Enabled | `0.5` | General mobile default |
| `lite` | Disabled | `1.0` | Low-end devices and reduced transparency |

`lite` removes `BackdropFilter` entirely. It keeps the same layout, surface
geometry, interaction, borders, and translucent fallback fill, so changing
the policy does not cause a layout shift.

### Component contract

Every shared glass surface must:

1. Read `FrostedPerformance.of(context)`.
2. Skip `BackdropFilter` when `blurEnabled` is false.
3. Multiply requested sigma values by `blurScale` exactly once.
4. Preserve dimensions and decoration in all presets.
5. Avoid nested filters through the shared `GlassBackdrop` scope.
6. Keep clipping bounded to the surface shape.

On Android, `BlurredCard` also defaults to the lightweight alpha fallback unless
the caller explicitly opts into blur with `disableBlur: false`. Explicit widget
properties remain available for advanced cases, but the root performance policy
always has the final ability to disable the filter.

### Choosing a mode at runtime

Expose the policy as an application setting or derive it from a device-tier
decision. Do not toggle it on every frame. A single inherited update rebuilds
only the surfaces that depend on the policy:

```dart
class AppRoot extends StatelessWidget {
  const AppRoot({super.key, required this.mode});

  final FrostedPerformanceData mode;

  @override
  Widget build(BuildContext context) {
    return FrostedPerformance.fromData(
      data: mode,
      child: const MaterialApp(home: HomePage()),
    );
  }
}
```

Use `lite` when the platform requests reduced transparency, when sustained
raster work is too high, or on low-end hardware. Use `balanced` before choosing
`full` as the default for a broad mobile audience.

### Measurement protocol

Performance claims must be made from profile builds, not debug mode:

```bash
flutter run --profile -d <device-id>
flutter drive --profile --no-dds -d <device-id> \
  --driver=test_driver/integration_test.dart \
  --target=integration_test/performance_test.dart
```

The repository includes a repeatable example scenario at
`example/integration_test/performance_test.dart`. Run it from the example
directory:

```bash
flutter drive --profile --no-dds -d <device-id> \
  --driver=test_driver/integration_test.dart \
  --target=integration_test/performance_test.dart
```

The test reports a `catalog_scroll` timeline suitable for comparing the same
build with `full`, `balanced`, and `lite`. The app starts in `balanced`; change
the Rendering Mode in Catalog settings and rerun the same scenario for the
other modes.

Record the device model, OS, Flutter version, preset, screen, scroll scenario,
and warm-up duration. Capture build time, raster time, frame timing, and jank.
Compare the same scenario in `full`, `balanced`, `android`, and `lite`. This repository
does not claim a fixed FPS or percentage improvement without those measurements.

For Android scrolling-heavy screens, the explicit `android` preset removes
backdrop readback while preserving surface geometry, opacity, borders, and
semantics:

```dart
FrostedPerformance.fromData(
  data: FrostedPerformance.android,
  child: MaterialApp(home: MyHomePage()),
)
```

Use `balanced` when reduced blur is acceptable, and use `full` only when the
device and screen can sustain the additional raster work.

### Android baseline (2026-11-08)

The first physical baseline was captured with the repeatable `catalog_scroll`
scenario in `balanced` mode:

| Field | Value |
| --- | --- |
| Device | Xiaomi `24069PC21G` |
| Android | 16 |
| Display | 1220 x 2712, configured for 120 Hz |
| Flutter | 3.47.9 stable |
| Build | Profile |
| Scenario | 8 down/up drag cycles, 250 ms between gestures, 2 s warm-up |
| Frames captured | 32 |
| Average build time | 0.505 ms |
| 90th / 99th build time | 1.058 / 1.439 ms |
| Worst build time | 1.439 ms |
| Average rasterizer time | 11.722 ms |
| 90th / 99th rasterizer time | 19.877 / 21.297 ms |
| Worst rasterizer time | 21.297 ms |
| Missed build budget | 0 |
| Missed raster budget | 11 of 32 frames |

At 120 Hz the frame budget is approximately 8.33 ms. The measured raster
average is therefore above the 120 Hz budget, while build work remains well
below it. The report does not emit a display FPS value; `1000 / 11.722` is an
approximate raster-work capacity of 85.3 fps, not measured on-screen FPS and
must not be presented as one. The raw report is generated at
`example/build/integration_response_data.json` for future comparisons.

### Android preset comparison

The same scenario was rerun with `FrostedPerformance.android` on the same
device and build configuration:

| Metric | Balanced | Android preset | Change |
| --- | ---: | ---: | ---: |
| Average build time | 0.505 ms | 0.561 ms | +0.056 ms |
| Average rasterizer time | 11.722 ms | 5.913 ms | -49.6% |
| 90th percentile rasterizer | 19.877 ms | 13.466 ms | -32.2% |
| Worst rasterizer time | 21.297 ms | 14.120 ms | -33.7% |
| Missed raster budgets | 11 / 32 | 0 / 32 | eliminated |

This is a device-specific baseline, not a universal FPS guarantee. The
Android preset is the recommended choice for scrolling-heavy Android screens;
the raw report at `example/build/integration_response_data.json` contains the
latest Android-preset run.

### iOS baseline (2026-11-09)

The same `catalog_scroll` scenario was captured on the connected physical
device `AbdulRasol's iPhone` running iOS `27.0.1` in Profile mode with the
default `balanced` preset:

| Metric | Value |
| --- | ---: |
| Frames captured | 32 |
| Average build time | 0.525 ms |
| 90th / 99th build time | 0.761 / 0.858 ms |
| Worst build time | 0.858 ms |
| Average rasterizer time | 10.425 ms |
| 90th / 99th rasterizer time | 13.459 ms |
| Worst rasterizer time | 19.910 ms |
| Missed build budgets | 0 |
| Missed raster budgets | 1 of 32 |

The iOS report does not expose a reliable display FPS value through this
runner, so no fixed FPS claim is made. The raw report is generated at
`example/build/integration_response_data.json` after each run and should be
archived with the device and preset details.

### Current verification

Widget tests verify that `lite` creates no `BackdropFilter`, `balanced` scales
sigma once, nested glass surfaces do not add filters, and independent surfaces
remain independently bounded. The Android baseline above is intentionally
kept separate from unit tests. An iOS profile run is still required before P1
can be marked complete.



---

## Migration Guide

This guide describes the safe migration path for existing `frosted_ui_kit`
applications. The 1.x compatibility policy keeps deprecated APIs available;
migrations can therefore be applied incrementally.

### Import boundary

Use the package entry point for application code:

```dart
import 'package:frosted_ui_kit/frosted_ui_kit.dart';
```

Do not import `lib/src/...` paths directly. They are implementation details and
may change without preserving private structure.

### Naming corrections

Replace legacy spellings when touching a file:

| Before | After |
| --- | --- |
| `CricleButton` | `CircleButton` |
| `BluredCard` | `BlurredCard` |
| `bluredCard(...)` | `blurredCard(...)` |
| `FrostedNavigationButtomBar` | `FrostedNavigationBottomBar` |

The old names remain available in 1.x and have the same behavior.

### Performance configuration

Wrap the application or a subtree in `FrostedPerformance` when you need an
explicit rendering policy:

```dart
FrostedPerformance.fromData(
  data: FrostedPerformance.android,
  child: MaterialApp(home: MyHomePage()),
)
```

Use `full` for maximum glass fidelity, `balanced` for reduced blur, `android`
for scrolling-heavy Android screens without backdrop readback, and `lite` for
the lowest raster cost. Changing the preset does not change layout or
semantics.

### Buttons

Visual appearance and action meaning are independent. Keep destructive meaning
explicit when changing button styles:

```dart
FrostedButton.destructive(
  label: 'Delete',
  onPressed: deleteItem,
)
```

Use `FrostedAsyncButton` for a Future-returning action when loading, success,
error, repeat-tap prevention, and mounted checks should be managed by the
widget. Keep `FrostLoadingButtonController` for manual state transitions.

### Dialogs and bottom sheets

The shared adaptive surface layout now handles narrow screens, large text,
keyboard insets, scrollable content, and destructive action emphasis. Existing
dialog and bottom-sheet helpers remain source-compatible. Prefer the shared
helpers over direct `showDialog` or `showModalBottomSheet` calls when adopting
the kit's visual and accessibility behavior.

### App bars and navigation

`BaseWidget.hideAppBarOnScroll` and `appBarScrollBehavior` are opt-in. Existing
screens keep the previous always-visible app bar behavior unless a scroll mode
is explicitly selected.

### Release checklist

Before upgrading a production app:

1. Run `flutter analyze` and the application test suite.
2. Check RTL, large text, keyboard, and narrow-screen modal layouts.
3. Run a profile scroll test on representative Android and iOS hardware.
4. Replace deprecation warnings incrementally.
5. Review `CHANGELOG.md` for visual or behavior changes in the target release.



---

## Package Layout and Example Boundary

### Package source

`lib/frosted_ui_kit.dart` is the supported public entry point. Reusable
components live under `lib/src/shared/widgets/`, design-system utilities live
under `lib/src/utils/`, and the generic authentication module follows the
feature boundaries under `lib/src/features/auth/`.

The `lib/main.dart` file is retained only as a legacy package-local smoke-test
harness. It is not exported and is not the recommended application entry point.

### Interactive example

The `example/` application is the canonical showcase. It owns the catalog
screens, integration tests, profile performance scenario, and platform runner
configuration. Package consumers should copy component usage from the example
or the quick-start guide, not import files from `lib/main.dart`.

### Dependency boundary

The package must not depend on its example. Example-only dependencies and test
drivers stay under `example/`, while reusable code and public API tests stay in
the package root.



---

## Visual Consistency

The kit uses one surface language across cards, app bars, buttons, navigation,
dialogs, and sheets:

- translucent fills instead of opaque white panels;
- shared rounded geometry and border treatment;
- readable foreground contrast in light and dark themes;
- explicit performance fallbacks on Android;
- custom colors remain higher priority than defaults.

The default app-bar title uses the same translucent surface family as the
water-drop controls. On Android, where the default card fallback skips
`BackdropFilter`, this keeps the title from becoming a visually disconnected
opaque panel. Applications can still override it with `glassColor`.

`FrostedListTile` adds a selected icon capsule, state-aware typography, and
semantic selection metadata. `AppSlidingTabs` uses a bordered gradient pill
with selected semantics, while `FrostedStepper` uses a lightweight gradient
node and current-step emphasis instead of adding another backdrop filter.
Stepper nodes also accept an optional `stepBuilder` for icons, images, Lottie,
or any custom widget. The builder receives the step state and its content is
constrained to the node size.

Visual regression checks cover both theme brightnesses. When changing surface
tokens, verify the catalog on Android and iOS and rerun the profile scroll
scenario before changing the default appearance.