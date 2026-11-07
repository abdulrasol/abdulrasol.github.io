# ❄️ Frosted UI Kit Catalog & API Indexing

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
A comprehensive set of action buttons supporting 4 visual style variants (`AppButtonStyle`). It also includes `AppFloatingActionButton` which acts as a versatile FAB (icon only, text only, or extended icon + text).

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
    return ElevatedButton(
      onPressed: () => _openSheet(context),
      child: const Text('Open Sheet'),
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
| `confirmText` | `String` | *Varies* | Label for the positive/submit button. |
| `cancelText` | `String` | `Cancel` | Label for the negative button (if available). |
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
    return ElevatedButton(
      onPressed: () async {
        final result = await showAppInputDialog(
          context: context,
          title: 'Enter Name',
          description: 'Please enter your full name below.',
          hintText: 'John Doe',
          validator: (val) => val == null || val.isEmpty ? 'Required' : null,
        );
      },
      child: const Text('Open Input Dialog'),
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
| `showStatusBarGradient` | `bool` | `true` | Adds a subtle background gradient behind the system status-bar icons. |
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
position reaches the top.

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

## 📊 Performance Analysis & Benchmarks

> تحليل ساكن (static analysis) لكامل `lib/` بتاريخ 2026-09-11 — على الإصدار `1.0.2`
> المرجع: `doc/FROSTED_UI_KIT.md` و `.agents/AGENTS.md`

---

### ✅ حالة التنفيذ — الإصدار 1.1.0

**تم تطبيق المرحلتين 1 و 2 بالكامل.** التقرير أدناه يصف المشكلة كما كانت في
`1.0.2`، ويُحتفظ به كمرجع تقني ولقياس الفرق قبل/بعد. تفاصيل التغييرات في
[CHANGELOG.md](../CHANGELOG.md).

| البند | الحالة | التنفيذ |
| :--- | :-: | :--- |
| مشاركة طبقة الخلفية بين كل عمليات الضبابية | ✅ | `FrostedGlassGroup` (`BackdropGroup` + `BackdropFilter.grouped`) — يُطبَّق تلقائياً من `BaseWidget` و `AppDialog` و `showAppBottomSheet` |
| مفتاح أداء عام لإطفاء/تخفيض الزجاج | ✅ | `FrostedPerformance` + الإعدادات الجاهزة `full` / `balanced` / `lite` |
| إخراج الأنيميشن من داخل الطبقة المضببة | ✅ | `FrostedPanel` — طُبِّق على شريط التنقل، التبويبات، الديالوغات، حقول النص، وقوائم `FrostedListSection` |
| Lottie داخل الزجاج | ✅ | `FrostLoadingButton.blurWhileLoading = false` + ديالوغ التحميل على `FrostedPanel` |
| مفاتيح تعطيل موضعية | ✅ | `enabled` / `grouped` على `BlurredCard` و `FrostedPanel`، و `blurEnabled` على الأزرار |
| خفض sigma في شريط التنقل | ✅ | من `20` إلى `12`، وصار قابلاً للضبط عبر `sigmaX` / `sigmaY` |
| `RepaintBoundary` | ✅ | حول طبقة الزجاج في `FrostedPanel` وحول كل عنصر في شريط التنقل |
| تخزين `AppThemes.border` مؤقتاً | ✅ | كاش حسب اللون بدل تخصيص كائن جديد كل إطار |
| حذف الـ `ClipRRect` المكرر في `FrostedListSection` | ✅ | — |
| تثبيت `material_ui` و `cupertino_ui` | ✅ | `^1.2.0` و `^1.0.2` بدل `any` |
| تغيير الأنماط الافتراضية (`colored` للأزرار، `useGlass: false`) | ⏳ | مؤجَّل لـ v2.0 — كاسر للتوافق |
| فصل `lottie` إلى حزمة مرافقة | ⏳ | مؤجَّل لـ v2.0 — كاسر للتوافق |
| نقل `lib/main.dart` و `features/home/` إلى `example/` | ⏳ | لم يُنفَّذ — أثره على وقت التشغيل صفر (tree-shaking) |

> ⚠️ **لم يتم تشغيل `flutter analyze` ولا القياس على جهاز فعلي** — بيئة التحليل
> ما بيها Flutter SDK. شغّل `flutter analyze` و `flutter run --profile` قبل النشر.

---

### 1. الخلاصة التنفيذية

**نعم — استخدام الحزمة يزيد استهلاك الموارد، والزيادة على الـ GPU وليس على الـ RAM.**

السبب الجذري واحد ومركزي: **كل مكوّن زجاجي في الحزمة مبني على `BlurredCard`، و`BlurredCard` تُنشئ `BackdropFilter` مستقل لكل نسخة منها.** يعني شاشة واحدة عادية تحتوي بين **5 و 11 عملية `BackdropFilter` منفصلة** في نفس الإطار (frame).

| البُعد | التقييم | الملاحظة |
| :--- | :--- | :--- |
| **GPU / وقت الرسم (raster)** | 🔴 مرتفع | المصدر الأساسي للمشكلة |
| **الذاكرة (RAM)** | 🟢 سليم | لا يوجد تسريب؛ لا `AnimationController` بدون `dispose` |
| **ذاكرة GPU المؤقتة** | 🟡 متوسط | ~3–6 MB لكل إطار على شاشة مزدحمة |
| **CPU / Dart** | 🟢 منخفض | تخصيصات بسيطة، لا حسابات ثقيلة في `build` |
| **حجم التطبيق** | 🟡 متوسط | `lottie` + `archive` + `http` مقابل ملف سبينر بحجم 3 KB |
| **صحة الحزمة (package health)** | 🟡 | `material_ui: any` و `cupertino_ui: any` + كود تجريبي منشور داخل المكتبة |

**الحكم حسب فئة الجهاز:**

- **أجهزة راقية** (iPhone 14+، Snapdragon 8 Gen 1+): مقبولة تماماً، 60/120fps تُحافظ عليها.
- **أجهزة متوسطة وضعيفة** (Snapdragon 4xx/6xx، Mali-G52/G57 — وهي **الغالبية في السوق العراقي**): هنا تظهر المشكلة فعلياً. توقّع ارتفاع زمن الإطار، jank أثناء التمرير، استهلاك بطارية وحرارة.

الخبر الجيد: **كل المشاكل قابلة للحل داخل `cards.dart` و `base_widget.dart` و `navigation_bar.dart` تقريباً** — أي بتعديل مركزي محدود، بدون إعادة كتابة الحزمة.

---

### 2. المصدر الحقيقي للكلفة — كيف تعمل الحزمة داخلياً

#### 2.1 نقطة الاختناق المركزية

```
lib/src/shared/widgets/cards.dart : 98-113
    ClipRRect / ClipOval
      └── BackdropFilter(filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10))
            └── Container(decoration: BoxDecoration(...))
```

وكل هذه المكوّنات تمر من هنا:

| المكوّن | الملف | عدد الـ Blur لكل نسخة |
| :--- | :--- | :--- |
| `CircleButton` | `buttons.dart:82` | 1 |
| `AppButton` (نمط `glass` — **وهو النمط الافتراضي**) | `buttons.dart:345` | 1 |
| `AppTextField` (عندما `useGlass: true` — **وهو الافتراضي**) | `inputs.dart:579` | 1 لكل حقل |
| `AppSlidingTabs` | `tabs.dart:88` | 1 |
| `FrostedAppBar` (بطاقة العنوان) | `app_bar.dart:99` | 1 + زر الرجوع + كل `circleButton` في `actions` |
| `FrostedNavigationButtomBar` | `navigation_bar.dart:52` | 1 (بـ `sigma: 20`) + الـ FAB |
| `FrostedListSection` | `list_tile.dart:58` | 1 لكل قسم (✅ جيد — مشترك بين كل الـ tiles) |
| `AppBottomSheet` | `bottom_sheet.dart:67` | 1 |
| `AppDialog` / `showAppLoadingDialog` | `dialogs.dart:24, 416` | 1 |

#### 2.2 لماذا `BackdropFilter` مكلف تحديداً؟

على مستوى الـ GPU، كل `BackdropFilter` يفرض:

1. **قراءة الخلفية (backdrop read):** يجب قراءة ما تم رسمه خلف الويدجت من الـ render target إلى نسيج (texture) منفصل.
2. **كسر مسار الـ tile:** كل وحدات GPU في الموبايل هي **Tile-Based Deferred Rendering** (Adreno / Mali / PowerVR / Apple GPU). القراءة من الـ framebuffer في منتصف التمرير تجبر الـ GPU على **إنهاء الـ render pass الحالي وكتابته للذاكرة، ثم بدء pass جديد**. هذه أغلى عملية منفردة في التحليل كله.
3. **تمريرتا ضبابية:** Gaussian blur على Impeller يُنفَّذ بتمريرتين قابلتين للفصل (أفقي + عمودي) على دقّة مصغّرة.

> توثيق Flutter الرسمي يقول حرفياً عن `BackdropFilter`:
> *"This effect is relatively expensive, especially if the filter is non-local, such as a blur."*
> وهناك تقارير مفتوحة معروفة: [flutter#32804](https://github.com/flutter/flutter/issues/32804) و [flutter#126353](https://github.com/flutter/flutter/issues/126353).

**النتيجة:** الكلفة ≈ `عدد الـ BackdropFilters × (كسر render pass + تمريرات الضبابية)`.
الكلفة **تتضاعف عددياً** ولا تُدمج تلقائياً — وهذا بالضبط ما تفعله الحزمة حالياً.

---

### 3. عدّ الطبقات الضبابية لكل شاشة (قياس فعلي من الكود)

#### شاشة التسجيل `RegisterFormWidget` + `AuthScreen`

| العنصر | العدد |
| :--- | :--- |
| `nameField` + `emailField` + `passwordField` ×2 | 4 |
| `appSlidingTabs` | 1 |
| `appButton` (register — نمط glass افتراضي) | 1 |
| `FrostedAppBar` (عنوان + زر رجوع) | 2 |
| **المجموع** | **8 عمليات Backdrop Blur في إطار واحد** |

#### شاشة تطبيقية نموذجية (Dashboard)

| العنصر | العدد |
| :--- | :--- |
| `FrostedAppBar`: زر رجوع + عنوان + زرَّا actions | 4 |
| `FrostedNavigationButtomBar` + FAB | 2 |
| `FrostedListSection` ×3 | 3 |
| `appButton` زجاجي ×2 | 2 |
| **المجموع** | **11 عملية Backdrop Blur في إطار واحد** |

> **القاعدة العملية المتعارف عليها في Flutter: لا تتجاوز 2–3 عمليات `BackdropFilter` مرئية في نفس الوقت.** الحزمة حالياً تتجاوز هذا الحد بـ 3–4 أضعاف بشكل افتراضي، بدون أن يشعر المطوّر المستخدم لها.

---

### 4. متى تُدفع الكلفة؟ — محفّزات إعادة الرسم (الأخطر)

الضبابية **لا تُدفع مرة واحدة**. تُدفع في **كل إطار** تحتاج فيه المنطقة لإعادة رسم. وهنا المشاكل الحقيقية:

#### 🔴 4.1 التمرير خلف الـ AppBar والـ NavBar — `base_widget.dart:53-77`

```dart
body: Stack(
  children: [
    child,                                   // ← المحتوى القابل للتمرير
    if (bottomNavigationBar != null)
      Positioned(bottom: 0, ... ),           // ← زجاج فوقه
    if (!isHideAppbar && appbar == null)
      Positioned(top: 0, ... FrostedAppBar), // ← زجاج فوقه
  ],
),
```

`BaseWidget` يضع الـ AppBar والـ NavBar **فوق** المحتوى المتمرّر في `Stack`. هذا هو المظهر الزجاجي المطلوب — لكنه يعني أنّ **المحتوى خلف الزجاج يتغيّر في كل إطار أثناء التمرير، فيُعاد حساب الضبابية 60 أو 120 مرة في الثانية.**

هذا أغلى وضع تشغيل في الحزمة كاملة، وهو الوضع الافتراضي لكل شاشة.

#### 🔴 4.2 أنيميشن داخل الطبقة المضببة — `navigation_bar.dart:170-240`

```dart
BlurredCard(sigmaX: 20, sigmaY: 20,       // ← الضبابية هنا (وبقيمة 20!)
  child: Row(children: [
    _FrostedNavbarItemWidget(...)          // ← وداخلها:
      // Transform.scale (AnimationController 100ms)
      // AnimatedContainer (250ms)
      // TweenAnimationBuilder<Color> (250ms)
  ]),
)
```

كل الأنيميشن **أبناء** للـ `BackdropFilter`. أي لمسة على تبويب = 250ms من إعادة الرسم داخل طبقة مضببة بـ `sigma: 20`. هذا خطأ معماري، وليس مجرد ضبط.

نفس النمط في `tabs.dart:99-116`: `AnimatedAlign` + `AnimatedDefaultTextStyle` داخل `bluredCard`.

#### 🔴 4.3 Lottie داخل الزجاج — الأسوأ في المكتبة

`loading_button.dart:181` و `dialogs.dart:399`:

```dart
appButton(... style: glass ...,           // ← BackdropFilter
  child: AnimatedSwitcher(
    child: AppLoadingIndicator(size: 48), // ← Lottie، رسم متجهي 60fps
  ),
)
```

سبينر Lottie يُعيد رسم نفسه في كل إطار، **داخل** طبقة مضببة. يعني الضبابية تُعاد طوال مدة التحميل بالكامل، بشكل متواصل. نفس المشكلة في `showAppLoadingDialog` لكن على مساحة أكبر (ديالوغ).

#### 🟡 4.4 الكتابة في حقول النص — `inputs.dart:579`

`AppTextField` يلفّ `CupertinoTextField` داخل `BlurredCard`. مؤشّر الكتابة (caret) يومض مرتين في الثانية → إعادة رسم → إعادة حساب الضبابية. وكل ضغطة زر كذلك. الحقل المركَّز فقط هو الذي يُعاد رسمه، لكن الضبابية تُعاد مع كل وميض.

#### 🟡 4.5 غياب `RepaintBoundary` بالكامل

بحث في كامل `lib/`: **صفر استخدام لـ `RepaintBoundary`**. إعادة الرسم تنتشر أوسع من اللازم.

---

### 5. الذاكرة و GPU

#### 5.1 لا يوجد تسريب ذاكرة ✅

الفحص أظهر:
- `_FrostedNavbarItemWidgetState._scaleController` → `dispose()` موجود ✅
- `FrostedNavbarController` (ValueNotifier) → التوثيق يطلب `dispose()` من المستخدم ✅
- `FrostedStepperController` → `dispose()` موثّق ✅
- `AppLogger` يطبع فقط داخل `kDebugMode` ✅ (لا كلفة في الإصدار النهائي)

#### 5.2 ذاكرة GPU المؤقتة

كل `BackdropFilter` يحتاج render target بحجم حدوده + أنسجة وسيطة للضبابية المصغّرة.

الصيغة التقريبية (RGBA8888):
```
البايتات ≈ العرض(dp) × الارتفاع(dp) × DPR² × 4
```

على جهاز بـ DPR = 3 (تقدير):

| العنصر | الأبعاد (dp) | تقدير النسيج |
| :--- | :--- | :--- |
| شريط التنقل السفلي | 360 × 80 | ≈ 1.04 MB |
| بطاقة عنوان الـ AppBar | 250 × 48 | ≈ 0.41 MB |
| حقل نص واحد | 328 × 52 | ≈ 0.48 MB |
| زر دائري | 48 × 48 | ≈ 0.08 MB |

**الإجمالي التقريبي على شاشة مزدحمة: 3–6 MB لكل إطار** (تخصيص مؤقت، يُعاد تدويره — ليس تسريباً).

المشكلة ليست الحجم، بل **عرض النطاق (bandwidth)**: كتابة وقراءة هذه الأنسجة 60 مرة في الثانية على GPU متوسط يستهلك ذاكرة ويولّد حرارة.

---

### 6. الكلفة على CPU / Dart (منخفضة نسبياً)

| الملاحظة | الموقع | الأثر |
| :--- | :--- | :--- |
| `AppThemes.border(context)` يُنشئ كائن `Border` جديد في كل `build` | `cards.dart:83` | ضئيل، لكنه متكرر جداً |
| دوال الـ mixins (`blurredCard`, `appButton`…) تمنع استخدام `const` على الويدجتات | كل الـ mixins | يمنع تخزين الويدجت مؤقتاً، يوسّع نطاق الـ rebuild |
| `List.generate` داخل `build` | `tabs.dart:126`, `navigation_bar.dart:66` | إعادة بناء كل العناصر عند أي rebuild للأب |
| `Navigator.of(context).canPop()` داخل `build` | `app_bar.dart:70` | يُنشئ تبعية على الـ Navigator → إعادة بناء عند تغيير المسار |
| `clipBehavior: Clip.antiAlias` (وليس `antiAliasWithSaveLayer`) | `cards.dart:27` | ✅ اختيار صحيح — تجنّب `saveLayer` إضافي |

**هذه البنود ثانوية.** إصلاحها لن يُحدث فرقاً ملموساً قبل إصلاح مشكلة الـ `BackdropFilter`.

---

### 7. حجم التطبيق والاعتماديات

#### 7.1 `lottie` مقابل ملف 3 KB 🔴

```yaml
lottie: ^3.5.1   # يجرّ معه: archive, http
```

الاستخدام الوحيد: `assets/lottie/loading.json` — **حجمه 3072 بايت**.

`lottie` مكتبة كاملة لعرض ملفات After Effects (تحليل JSON، أشكال، أقنعة، تعبيرات، مسارات). كل تطبيق يستخدم `frosted_ui_kit` يدفع ثمنها في حجم الـ APK/IPA، حتى لو لم يعرض سبينراً أبداً. وتجرّ معها `archive` (لملفات dotLottie) و `http` (للتحميل من الشبكة) — وكلاهما غير مستخدم هنا.

#### 7.2 قيود `any` 🟡

```yaml
material_ui: any
cupertino_ui: any
```

`any` يعني أن أي إصدار جديد كاسر (breaking) من هاتين الحزمتين سيكسر بناء كل من يستخدم `frosted_ui_kit`. وهذا أيضاً يخفّض تقييم الحزمة على pub.dev. يجب تثبيتها بـ `^x.y.z`.

#### 7.3 كود تجريبي منشور داخل المكتبة 🟡

`lib/main.dart` و `lib/src/features/home/persentation/screen/home.dart` هما تطبيق تجريبي داخل مكتبة منشورة. الـ tree-shaking في AOT يحذفهما فلا أثر وقت التشغيل، لكنهما وزن زائد في الحزمة. (ولاحظ الخطأ الإملائي: `persentation` بدل `presentation`.)

---

### 8. جدول الأولويات

| # | المشكلة | الأثر | جهد الإصلاح | كسر التوافق |
| :-: | :--- | :-: | :-: | :-: |
| 1 | كل `BlurredCard` = `BackdropFilter` مستقل | 🔴 عالٍ جداً | منخفض | لا |
| 2 | الأنيميشن داخل الطبقة المضببة (navbar + tabs) | 🔴 عالٍ | متوسط | لا |
| 3 | Lottie داخل الزجاج (loading button + dialog) | 🔴 عالٍ | منخفض | لا |
| 4 | لا يوجد مفتاح لإيقاف الزجاج على الأجهزة الضعيفة | 🔴 عالٍ | منخفض | لا |
| 5 | `sigma: 20` في شريط التنقل | 🟡 متوسط | تافه | لا |
| 6 | `useGlass: true` افتراضياً في حقول النص | 🟡 متوسط | تافه | نعم (v2) |
| 7 | `AppButtonStyle.glass` هو النمط الافتراضي | 🟡 متوسط | تافه | نعم (v2) |
| 8 | غياب `RepaintBoundary` | 🟡 متوسط | منخفض | لا |
| 9 | `lottie` كاعتمادية إلزامية | 🟡 متوسط | متوسط | نعم (v2) |
| 10 | `material_ui: any` / `cupertino_ui: any` | 🟢 منخفض | تافه | لا |
| 11 | `lib/main.dart` + `features/home` داخل الحزمة | 🟢 منخفض | تافه | لا |

---

### 9. التحسينات المقترحة — مع الكود

#### ⭐ 9.1 التحسين الأهم: `BackdropGroup` + `BackdropFilter.grouped`

Flutter 3.29 أضاف حلاً مصمَّماً **تحديداً** لحالة هذه الحزمة:

> *"Applications that display multiple backdrop filters can now use the new widget `BackdropGroup` and a new `BackdropFilter.grouped` constructor. These can improve performance of multiple blurs above and beyond what was possible on the Skia backend."*
> — [What's new in Flutter 3.29](https://flutter.dev/blog/whats-new-in-flutter-3-29)

بدل أن يقرأ كل فلتر الخلفية بنفسه، **كل الفلاتر داخل `BackdropGroup` تتشارك نسيج خلفية واحد**. من N قراءة خلفية إلى قراءة واحدة. كلما زاد N زاد الربح — وهذه بالضبط حالة الحزمة (N = 8 إلى 11).

`pubspec.lock` يُظهر `flutter: ">=3.44.0"` — يعني الـ API متوفّر بدون أي شرط.

**التعديل في `cards.dart`:**

```dart
class BlurredCard extends StatelessWidget {
  const BlurredCard({
    super.key,
    required this.child,
    // ... البقية كما هي
    this.enabled,          // null = تلقائي حسب FrostedPerformance
    this.grouped = true,   // يشارك الخلفية مع أقرب BackdropGroup
  });

  /// تعطيل الضبابية نهائياً لهذه البطاقة (يتخطّى الـ BackdropFilter كلياً).
  final bool? enabled;

  /// استخدام BackdropFilter.grouped لمشاركة طبقة الخلفية.
  final bool grouped;

  @override
  Widget build(BuildContext context) {
    final perf = FrostedPerformance.of(context);
    final sx = sigmaX * perf.blurScale;
    final sy = sigmaY * perf.blurScale;
    final blurOn = (enabled ?? perf.blurEnabled) && (sx > 0 || sy > 0);

    // عندما تُطفأ الضبابية نُبقي نفس الـ Container بالضبط،
    // فلا يتغيّر التخطيط ولا يحصل layout shift.
    final containerWidget = Container(/* ... كما هو ... */);

    Widget wrap(Widget inner) {
      if (!blurOn) return inner;
      final filter = ImageFilter.blur(sigmaX: sx, sigmaY: sy);
      return grouped
          ? BackdropFilter.grouped(filter: filter, child: inner)
          : BackdropFilter(filter: filter, child: inner);
    }

    if (shape == BoxShape.circle) {
      return ClipOval(clipBehavior: clipBehavior, child: wrap(containerWidget));
    }
    return ClipRRect(
      borderRadius: effectiveBorderRadius ?? BorderRadius.zero,
      clipBehavior: clipBehavior,
      child: wrap(containerWidget),
    );
  }
}
```

**وفي `base_widget.dart` — نلفّ الشاشة كلها:**

```dart
@override
Widget build(BuildContext context) {
  return BackdropGroup(          // ← سطر واحد، يستفيد منه كل زجاج الشاشة
    child: Scaffold(
      extendBody: bottomNavigationBar != null,
      // ... البقية كما هي
    ),
  );
}
```

> ⚠️ ملاحظة: `BackdropFilter.grouped` يبحث عن أقرب `BackdropGroup` في الشجرة. المكوّنات التي تُعرض خارج شجرة الشاشة (`showAppBottomSheet`، `showAppDialog`) تُبنى في الـ `Navigator` overlay، لذلك تحتاج `BackdropGroup` خاصاً بها داخل الـ builder، أو تُترك بـ `grouped: false`.

---

#### ⭐ 9.2 مفتاح أداء عام — `FrostedPerformance`

هذا **ليس تحسيناً تجميلياً، بل شرط لتشغيل الحزمة على أجهزة السوق المتوسطة.**

ملف جديد `lib/src/utils/frosted_performance.dart`:

```dart
import 'package:material_ui/material_ui.dart';

/// مفتاح عام يتحكّم بكل الأسطح الزجاجية في `frosted_ui_kit`.
///
/// ضعه فوق `MaterialApp` لتخفيض أو إطفاء الضبابية على الأجهزة الضعيفة،
/// أو عند تفعيل "تقليل الحركة" في إعدادات الوصولية.
class FrostedPerformance extends InheritedWidget {
  const FrostedPerformance({
    super.key,
    this.blurEnabled = true,
    this.blurScale = 1.0,
    this.fallbackOpacity = 0.88,
    required super.child,
  }) : assert(blurScale >= 0.0 && blurScale <= 1.0);

  /// إطفاء كل عمليات BackdropFilter (أعلى ربح أداء ممكن).
  final bool blurEnabled;

  /// معامل ضرب لكل قيم sigma (0.0 – 1.0).
  final double blurScale;

  /// شفافية التعبئة البديلة عندما تكون الضبابية مُطفأة.
  final double fallbackOpacity;

  static const _fallback = _Defaults();

  static FrostedPerformanceData of(BuildContext context) {
    final w = context.dependOnInheritedWidgetOfExactType<FrostedPerformance>();
    if (w == null) return const FrostedPerformanceData();
    return FrostedPerformanceData(
      blurEnabled: w.blurEnabled,
      blurScale: w.blurScale,
      fallbackOpacity: w.fallbackOpacity,
    );
  }

  @override
  bool updateShouldNotify(FrostedPerformance old) =>
      blurEnabled != old.blurEnabled ||
      blurScale != old.blurScale ||
      fallbackOpacity != old.fallbackOpacity;
}

class FrostedPerformanceData {
  const FrostedPerformanceData({
    this.blurEnabled = true,
    this.blurScale = 1.0,
    this.fallbackOpacity = 0.88,
  });
  final bool blurEnabled;
  final double blurScale;
  final double fallbackOpacity;
}
```

**الاستخدام:**

```dart
// ربطه بإعداد الوصولية "تقليل الحركة" + إعداد يدوي للمستخدم
FrostedPerformance(
  blurEnabled: !MediaQuery.disableAnimationsOf(context) && !userPrefersLiteMode,
  blurScale: isLowEndDevice ? 0.5 : 1.0,
  child: MaterialApp(...),
)
```

مع هذا المفتاح، أي تطبيق (مثلاً تطبيق صيدلية على جهاز Android متوسط) يستطيع تقديم **وضع خفيف** بسطر واحد، بنفس التخطيط تماماً وبدون أي `layout shift`.

---

#### ⭐ 9.3 إخراج الأنيميشن من داخل الطبقة المضببة

**هذا أكبر مكسب بنيوي بعد `BackdropGroup`.**

المبدأ: اجعل اللوح الزجاجي **طبقة خلفية ساكنة**، وارسم المحتوى المتحرّك **فوقه كشقيق (sibling)** وليس كابن.

**`navigation_bar.dart` — قبل:**
```dart
BlurredCard(sigmaX: 20, sigmaY: 20,
  child: Row(children: [ /* عناصر متحركة */ ]),   // ❌ داخل الفلتر
)
```

**بعد:**
```dart
SizedBox(
  height: 72,
  child: Stack(
    children: [
      // طبقة الزجاج — لا يتحرّك أي شيء داخلها إطلاقاً
      Positioned.fill(
        child: RepaintBoundary(
          child: BlurredCard(
            borderRadius: BorderRadius.circular(32),
            sigmaX: 12, sigmaY: 12,      // ← خُفّضت من 20
            border: Border.all(/* ... */),
            child: const SizedBox.expand(),
          ),
        ),
      ),
      // المحتوى المتحرّك — خارج شجرة الـ BackdropFilter
      Padding(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: List.generate(widget.items.length, (i) =>
            _FrostedNavbarItemWidget(
              item: widget.items[i], index: i, controller: widget.controller,
            ),
          ),
        ),
      ),
    ],
  ),
)
```

النتيجة: أنيميشن اللمس الآن يُعيد رسم **بكسلات فوق** الزجاج فقط، ولا يُجبر إعادة حساب الضبابية.

**نفس النمط يُطبَّق على `tabs.dart`:** الـ `AnimatedAlign` (حبّة المؤشّر المنزلقة) و `AnimatedDefaultTextStyle` يُرفعان فوق لوح زجاجي ساكن.

---

#### ⭐ 9.4 إصلاح Lottie داخل الزجاج

ثلاثة خيارات، مرتّبة من الأبسط للأفضل:

**(أ) إطفاء الضبابية أثناء التحميل — `loading_button.dart`:**
```dart
appButton(
  context: context,
  style: state == FrostLoadingButtonState.loading
      ? AppButtonStyle.colored   // ← بلا BackdropFilter أثناء الأنيميشن
      : style,
  // ...
)
```

**(ب) رسم السبينر فوق الزجاج بدل داخله** (نفس نمط 9.3).

**(ج) الأفضل — جعل `lottie` اختيارية:**
```dart
class AppLoadingIndicator extends StatelessWidget {
  const AppLoadingIndicator({super.key, this.size = 64.0, this.color, this.builder});

  /// باني مخصّص للمؤشّر. عند تركه فارغاً يُستخدم مؤشّر خفيف مرسوم بـ CustomPainter.
  final WidgetBuilder? builder;
  // ...
}
```
مع نقل نسخة Lottie إلى حزمة مرافقة `frosted_ui_kit_lottie`. هذا يحذف `lottie` + `archive` + `http` من كل مستهلكي الحزمة.

---

#### 9.5 تحسينات متوسطة

**خفض قيم sigma الافتراضية:**
```dart
// cards.dart — الافتراضي الحالي 10.0، معقول
this.sigmaX = 10.0,
this.sigmaY = 10.0,

// navigation_bar.dart — 20 مبالغ فيه
sigmaX: 12, sigmaY: 12,   // بدل 20
```

**تخزين الـ Border مؤقتاً — `app_themes.dart`:**
```dart
// بدل إنشاء Border جديد في كل build
static final Map<Color, Border> _borderCache = {};
static Border border(BuildContext context) {
  final c = borderColor(context);
  return _borderCache.putIfAbsent(c, () => Border.all(color: c));
}
```

**إضافة `RepaintBoundary`** حول شريط التنقل وشريط العنوان في `base_widget.dart`.

**تثبيت الاعتماديات — `pubspec.yaml`:**
```yaml
material_ui: ^<الإصدار_الفعلي>      # بدل any
cupertino_ui: ^<الإصدار_الفعلي>     # بدل any
```

**حذف الكود التجريبي:** انقل `lib/main.dart` و `lib/src/features/home/` إلى `example/`.

---

#### 9.6 تغييرات مقترحة لـ v2.0 (كاسرة للتوافق)

| التغيير | السبب |
| :--- | :--- |
| `AppButtonStyle.colored` كنمط افتراضي بدل `glass` | كل زر يُكتب بدون تحديد نمط يحصل على `BackdropFilter` صامت |
| `AppTextField.useGlass = false` افتراضياً | النماذج عادة فوق سطح معتم — الضبابية غير مرئية أصلاً وتُدفع كلفتها |
| `lottie` كاعتمادية اختيارية | حجم الحزمة |

---

#### 9.7 قاعدة توثيقية مقترحة لـ `FROSTED_UI_KIT.md`

> **قاعدة الميزانية الزجاجية:** الزجاج مخصّص للأسطح التي تطفو **فوق صور أو تدرّجات لونية**. فوق سطح معتم، الضبابية تُكلّف بدون أن تُرى.
> **لا تتجاوز 3 أسطح زجاجية مرئية في نفس الوقت في الشاشة الواحدة.** استخدم `FrostedListSection` (ضبابية واحدة مشتركة) بدل بطاقات زجاجية متعدّدة، واستخدم `AppButtonStyle.colored` للأزرار الثانوية.

---

### 10. خطة القياس (للتحقق قبل وبعد)

```bash
# 1. تشغيل في وضع profile على جهاز حقيقي (وليس محاكي)
flutter run --profile

# 2. في DevTools → Performance:
#    راقب سطر "Raster" تحديداً (وليس "UI").
#    إذا كان Raster > 8ms فالمشكلة GPU-bound → أي مشكلة BackdropFilter.

# 3. طبقة الأداء المرئية على الجهاز
flutter run --profile --dart-define=...   # ثم فعّل PerformanceOverlay

# 4. تتبّع تفصيلي لعمليات الرسم
flutter run --profile --trace-skia

# 5. تحليل حجم الحزمة (لقياس أثر إزالة lottie)
flutter build apk --analyze-size --target-platform android-arm64
```

**اختبار A/B سريع بعد تطبيق 9.2:**
بدّل `blurEnabled` بين `true` و `false` وقارن سطر الـ Raster. الفرق بينهما هو **الكلفة الحقيقية للزجاج على ذلك الجهاز بالضبط** — وهذا أدقّ بكثير من أي تقدير نظري في هذا التقرير.

**أجهزة الاختبار المقترحة:**
- جهاز مرجعي منخفض: Android بـ Snapdragon 4xx / Mali-G52 (يمثّل شريحة واسعة من مستخدمي السوق العراقي)
- جهاز مرجعي متوسط: Snapdragon 6xx/7xx
- iPhone حديث كمرجع أعلى

---

### 11. الحكم النهائي

| السؤال | الجواب |
| :--- | :--- |
| **هل تزيد استهلاك الموارد؟** | نعم — بشكل ملموس، والزيادة على **GPU/raster**، وليست على RAM أو CPU |
| **هل هناك تسريب ذاكرة؟** | لا. التخلّص من الـ controllers سليم وموثّق |
| **هل تصلح للإنتاج كما هي؟** | على الأجهزة الراقية: نعم. على الأجهزة المتوسطة والضعيفة: ليس بالإعدادات الافتراضية الحالية |
| **هل المشكلة قابلة للإصلاح؟** | نعم، وبشكل مركزي — أغلب الربح يأتي من `cards.dart` + `base_widget.dart` + `navigation_bar.dart` |

#### خارطة طريق مقترحة

**المرحلة 1 — لا تكسر التوافق، أعلى ربح (يوم عمل تقريباً):**
1. `BackdropGroup` + `BackdropFilter.grouped` (بند 9.1)
2. `FrostedPerformance` وضع الأداء العام (بند 9.2)
3. إطفاء ضبابية زر التحميل أثناء الـ loading (بند 9.4-أ)
4. خفض sigma شريط التنقل من 20 إلى 12

**المرحلة 2 — إعادة هيكلة موضعية (2–3 أيام):**
5. إخراج أنيميشن شريط التنقل والتبويبات من داخل الطبقة المضببة (بند 9.3)
6. `RepaintBoundary` + تخزين الـ Border مؤقتاً
7. تثبيت `material_ui` و `cupertino_ui`، ونقل الكود التجريبي إلى `example/`

**المرحلة 3 — v2.0:**
8. تغيير الأنماط الافتراضية (`colored` للأزرار، `useGlass: false` للحقول)
9. فصل `lottie` إلى حزمة مرافقة
10. توثيق "قاعدة الميزانية الزجاجية" في الدليل الرسمي

---

### المصادر

- [BackdropFilter class — Flutter API](https://api.flutter.dev/flutter/widgets/BackdropFilter-class.html)
- [BackdropGroup class — Flutter API](https://api.flutter.dev/flutter/widgets/BackdropGroup-class.html)
- [BackdropFilter.grouped constructor — Flutter API](https://api.flutter.dev/flutter/widgets/BackdropFilter/BackdropFilter.grouped.html)
- [What's new in Flutter 3.29 — Flutter Blog](https://flutter.dev/blog/whats-new-in-flutter-3-29)
- [flutter#32804 — BackdropFilter performance issue](https://github.com/flutter/flutter/issues/32804)
- [flutter#126353 — Impeller Blur BackdropFilter performance degradation](https://github.com/flutter/flutter/issues/126353)



---

## تقرير مراجعة استهلاك الموارد — Frosted UI Kit

التاريخ: 2026-09-11 | نسخة pubspec: 1.0.2 | النطاق: الكود المحلي بحالته الحالية، بما فيه الملفات غير المتتبعة.

### الحكم

نعم، استخدام المكوّنات الزجاجية يمكن أن يزيد كلفة الرسم مقارنة بواجهات بتعبئة عادية. المرشح الأساسي هو ضبابية الخلفية، خصوصاً عند تمرير محتوى خلفها، أو زيادة مساحتها وعددها وتداخلها. مقدار الزيادة غير مقاس هنا؛ لا يوجد دليل يبرر نسبة محددة للبطارية أو الذاكرة أو حكماً عاماً بأن البكج لا يصلح للأجهزة المتوسطة.

إضافة dependency وحدها لا تعني تشغيل بلور مستمر. الكلفة التشغيلية ترتبط بالمكوّنات المبنية والمشهد المعروض والحركات النشطة. الشاشة الساكنة ليست بالضرورة تعيد الرسم باستمرار.

**التوصية:** استخدام انتقائي للزجاج، توفير تعطيل فعلي مركزي له، ثم اختبار مشاهد واقعية على أجهزة مستهدفة قبل اعتماد الإعدادات الافتراضية للإنتاج.

### النطاق وحدود الإثبات

قُرئت تعليمات `.agents/AGENTS.md` والدليل `doc/FROSTED_UI_KIT.md`، وروجعت مكوّنات العرض المركزية، المتحكمات، الاعتماديات والاختبارات. تعذر فتح رابط Claude؛ النسخة المحلية كانت متاحة. يوجد تقرير سابق `doc/PERFORMANCE_ANALYSIS.md` وملف `frosted_performance.dart` غير متتبعين؛ هذا التقرير مستقل ويحافظ عليهما.

هذه مراجعة كود مع فحوص تحليل واختبار، وليست benchmark. لم تُقَس FPS أو طاقة أو ذاكرة GPU أو حجم APK، ولم يُجرَ profiling على هاتف. الأولويات أدناه تقدير هندسي وليست نتائج زمنية.

### أثر الموارد

| المورد | التأثير المتوقع | ما يرفع الكلفة |
|---|---|---|
| الرسم / GPU | المرشح الرئيسي لزيادة الكلفة | بلور واسع، عدة أسطح، خلفية متحركة أو تمرير خلفها |
| CPU | بناء وتخطيط المكوّنات ومعالجة الحركة وتجهيز الرسم | عناصر كثيرة غير كسولة، تغييرات الحالة والحركات المتزامنة |
| الذاكرة | قد ترتفع للطبقات والموارد الرسومية وكاش الحركات | مساحة بالبكسل الفعلي، عدد الطبقات، كاش إضافي |
| البطارية والحرارة | قد ترتفع مع استمرار العمل الإضافي | تحميل طويل، تمرير متكرر، معدل تحديث عالٍ |
| حجم التطبيق | يتأثر بالكود والأصول والاعتماديات المحتفظ بها في البناء | يجب قياس release؛ حجم dependency ليس حجم الزيادة النهائي |
| الشبكة | مؤشّر التحميل يستخدم أصلاً محلياً | طلبات المصادقة تأتي من استخدام repository، وليست شرطاً للزجاج |

زمن Raster ليس قراءة مباشرة لنسبة انشغال GPU؛ ارتفاعه يستدعي فحص التتبع قبل تحديد السبب. كذلك لا يصح استبعاد CPU وRAM لمجرد أن البلور هو المرشح الأكبر.

### النتائج من الكود

#### 1. نقطة البلور مركزية، لكنها بلا تعطيل صريح — أولوية عالية

`lib/src/shared/widgets/cards.dart:98` و`:108`: مساران لإنشاء `BackdropFilter`؛ البطاقة تستخدم واحداً منهما بحسب الشكل، لا فلترين معاً. الافتراضي `sigmaX/Y = 10` في السطرين 22–23. يوجد clipping حول الفلتر، وهذا اختيار جيد لتحديد المساحة. حتى عندما تكون sigma صفراً يستمر إنشاء widget الفلتر؛ لا يوجد مسار صريح لتجاوزه.

بما أن معظم الأسطح تعتمد على `BlurredCard`، تحسينها ينعكس على عدة مكوّنات. قيمة sigma ليست وحدها ميزانية الأداء؛ بطاقة كبيرة قد تكون أكلف من عدة أزرار صغيرة. توثيق Flutter يصف البلور بأنه عملية مكلفة نسبياً. [مرجع BackdropFilter](https://api.flutter.dev/flutter/widgets/BackdropFilter-class.html).

#### 2. وضع الأداء الموجود لا يغيّر أي سطح حالياً — أولوية عالية

`lib/src/utils/frosted_performance.dart` يعرّف Full/Balanced/Lite، لكن البحث في الكود لم يجد مستهلكاً لهذه الإعدادات خارج الملف نفسه، وهو غير مُصدَّر من `lib/frosted_ui_kit.dart`. لذلك وضع `FrostedPerformance.lite` حول التطبيق لا يعطّل بلور البكج الحالي.

الملف يستورد `material_ui` وهي ليست dependency معلنة في pubspec الحالي؛ التحليل أبلغ عنها. الحل المقترح عند التنفيذ: الاستيراد من Flutter مباشرة، ربط الإعدادات بالبطاقة المركزية، تصدير الواجهة، وتمرير overrides عبر المكوّنات والمساعدات. توفير تعبئة بديلة مقروءة عند تعطيل البلور، مع الحفاظ على القياسات. ادعاء أن نصف sigma يعني نصف كلفة GPU غير مثبت ويجب حذفه من التوثيق.

#### 3. بعض الإعدادات تضيف زجاجاً تلقائياً — أولوية عالية

| المكوّن | الوضع الفعلي | الإجراء المقترح |
|---|---|---|
| AppButton | `glass` افتراضياً، buttons.dart:127 | اختيار colored/outlined/text عندما لا تحتاج ضبابية |
| AppFloatingActionButton | `glass` افتراضياً، buttons.dart:594 | نفس المبدأ حسب الخلفية |
| AppTextField | `useGlass = true`، inputs.dart:77 | استخدام `AppTextField(useGlass: false)` للنماذج المناسبة |
| Navigation bar | sigma ثابتة 20، navigation_bar.dart:61 | جعلها قابلة للضبط وتجربة قيمة أقل بصرياً وأدائياً |
| Bottom sheet | sigma افتراضية 15 | تقليل المساحة أو الشدة إذا أثبت القياس الحاجة |
| FrostLoadingButton | `colored` افتراضياً، loading_button.dart:51 | لا توجد مشكلة بلور افتراضية هنا؛ تظهر عند اختيار glass |

تغيير افتراضات الأزرار والحقول يغيّر الشكل المتوقع للمستخدمين؛ الأفضل بدءاً إضافة خيارات متوافقة مع السلوك الحالي. الخلفية الموحدة لا تستفيد بصرياً كثيراً من البلور.

#### 4. الطبقات المتداخلة والتجميع — أولوية عالية مشروطة

`BaseWidget` يضع الشريطين فوق المحتوى داخل Stack. كذلك يمكن للمستخدم وضع أزرار أو حقول زجاجية داخل بطاقة زجاجية. هذه مشاهد تحتاج مراجعة عدد الفلاتر وتداخلها.

يمكن تجربة `BackdropGroup` و`BackdropFilter.grouped` للعناصر المتوافقة غير المتداخلة، مثل بطاقات قائمة منفصلة. **لا تجمع كل زجاج الشاشة بمفتاح واحد تلقائياً:** Flutter يحذر من مشاركة المفتاح بين فلاتر متداخلة لأنها قد تغيّر النتيجة البصرية. الأسطح المتراكبة والحوارات تحتاج حدود مجموعات مناسبة. [قواعد التجميع](https://api.flutter.dev/flutter/widgets/BackdropFilter-class.html).

لا يوجد ضمان أن كل N فلاتر عشوائية تتحول إلى عملية واحدة. يجب التحقق أيضاً من الحد الأدنى المدعوم لـFlutter في pubspec قبل إضافة API؛ ملف lock المحلي ليس عقد توافق لكل مستهلك.

#### 5. القوائم الكبيرة مبنية دفعة واحدة — أولوية متوسطة إلى عالية حسب الاستخدام

`FrostedListSection` يستخدم بطاقة واحدة تحيط بـColumn لجميع children، مع فواصل. هذا جيد لأقسام إعدادات قصيرة لأنه لا ينشئ بلوراً لكل صف عادي؛ لكنه ليس قائمة كسولة للمئات أو الآلاف من العناصر.

للقوائم الكبيرة، يوصى بواجهة builder أو slivers تبني العناصر المرئية، ثم اختيار خلفية واحدة أو تجميع مدروس للأسطح. تقليل الفلاتر لا يعالج وحده CPU والذاكرة إذا استمر بناء جميع الصفوف. [توصيات Flutter للقوائم والتخطيط](https://docs.flutter.dev/perf/best-practices).

#### 6. الحركة والتحميل — أولوية متوسطة، بالقياس

الشريط والتبويبات يستخدمان حركات انتقالية، ومؤشر Lottie يستمر أثناء التحميل. ملف التحميل المحلي صغير: **3072 بايت**، طبقتا أشكال، و`fr = 21`؛ هذا معدل الملف وليس إثباتاً لعدد إطارات الشاشة الفعلي. لا توجد صور مضمنة في مصفوفة assets فيه.

وجود child متحرك تحت `BackdropFilter` لا يعني أن هذا child يُطمَس؛ الفلتر يعالج المحتوى المرسوم خلفه ثم يُرسم الطفل. لا يكفي موقع الطفل في الشجرة لإثبات إعادة حساب البلور كل frame. فصل المحتوى المتحرك أو استخدام RepaintBoundary تجربة تحسين محتملة، وليس ضماناً لكاش ثابت للخلفية.

يوصى بإتاحة loadingBuilder، واحترام إعداد تقليل الحركة، وإيقاف الحركة للشاشات غير النشطة حسب طريقة إبقائها في الشجرة. خيارات كاش Lottie قد تخفف العمل مقابل ذاكرة إضافية؛ لا تفعّلها عشوائياً لهذا الأصل الصغير. [توثيق Lottie من ناشر الحزمة](https://pub.dev/packages/lottie).

#### 7. دورة الحياة والذاكرة — إيجابيات ومخاطر تحتاج اختباراً

متحكمات النص في نماذج المصادقة تُتلف في dispose، وكذلك AnimationController لعناصر التنقل. AuthView يزيل listener ويتلف المتحكم إذا أنشأه محلياً. هذه نقاط سليمة، لكنها لا تثبت غياب كل تسريب ذاكرة.

AuthView يحتفظ بمتحكم `late final` من initState ولا يعالج استبدال المتحكم الوارد عبر didUpdateWidget؛ عند تغيير الهوية مع إبقاء State نفسه قد يبقى مرتبطاً بالمتحكم القديم. كذلك عمليات AuthController غير المتزامنة قد تُكمل وتستدعي notifyListeners بعد إتلافه عند مغادرة الشاشة. هذه مخاطر صحة ودورة حياة تستحق اختبارات مخصصة؛ لم تُثبت كتسريب بقياس heap.

التحسين المقترح: التعامل مع تغيير هوية المتحكم وملكيته، وحماية الإكمال بعد dispose أو إلغاء العمليات عندما يدعم مصدرها ذلك. اختبار فتح وإغلاق المصادقة أثناء طلب بطيء وتبديل المتحكم.

### تصحيح التقرير السابق

| الادعاء | التقييم الحالي |
|---|---|
| الضرر على GPU فقط وليس RAM أو CPU | غير دقيق؛ توجد موارد أخرى محتملة |
| لا يوجد تسريب ذاكرة قطعاً | غير مثبت دون profiling واختبارات دورة حياة |
| البكج لا يصلح للأجهزة المتوسطة | حكم أوسع من الأدلة |
| تجميع الشاشة كلها حل آمن | يجب مراعاة التداخل والمفاتيح |
| تحريك الطفل يعني إعادة البلور حتماً | يحتاج تتبعاً؛ الطفل ليس هو الخلفية المفلترة |
| نصف sigma = نصف الكلفة | لا توجد علاقة خطية مضمونة |
| لا تتجاوز ثلاث بطاقات | ليست قاعدة Flutter ولا حدّاً مثبتاً |
| material_ui وcupertino_ui معرفتان بـany | غير موجودتين في pubspec الحالي؛ توجد مشكلة import في ملف الأداء فقط |
| Raster أكبر من 8ms يعني مشكلة blur | الميزانية تعتمد على التحديث، والسبب يحتاج تتبعاً |
| كاش Map دائم للـBorder تحسين مطلوب | أولوية ضعيفة دون قياس، وقد يضيف احتفاظاً غير محدود بالألوان |

لا يُنصح بإضافة RepaintBoundary إلى كل عنصر؛ كل حدود إضافية قد ترفع كلفة الطبقات والذاكرة. كذلك نقل أمثلة من lib إلى example يحسن تنظيم الحزمة، لكنه لا يثبت تخفيض RAM للتطبيق المنتج لأن الكود غير المستخدم قد يُستبعد في البناء.

### نتائج الفحوص المنفذة

- `flutter analyze --no-pub`: اكتمل برمز خروج 1، وأبلغ عن ملاحظتين info موجودتين مسبقاً: `implementation_imports` في `example/lib/main.dart:3`، و`depend_on_referenced_packages` في `lib/src/utils/frosted_performance.dart:1`.
- `flutter test --no-pub`: فشل اختبار الجذر القديم `Counter increments smoke test` عند `test/widget_test.dart:19` لأنه يبحث عن نص `0` غير موجود في التطبيق الحالي. هذا ليس قياساً للأداء ولا دليلاً على خلل البلور.
- محاولة `flutter --version` لم تكتمل بسبب منع الكتابة في كاش SDK خارج مساحة العمل؛ لا يُنسب رقم SDK غير متحقق إليه.
- لم تُعدّل ملفات Dart، ولم تُنفذ تحسينات أو يصلَح الاختبار ضمن هذه المراجعة. التغيير الوحيد المقصود هو إنشاء هذا التقرير.

### خطة تحسين قابلة للتحقق

1. **تفعيل وضع أداء حقيقي:** ربط الإعدادات بالبطاقة، تجاوز الفلتر عند التعطيل، تعبئة بديلة مناسبة، تصدير API وتوثيقها. تحقق widget test من غياب BackdropFilter في Lite ومن بقاء الأبعاد، واختبار بصري للتباين.
2. **ضبط الكلفة حسب المشهد:** خيارات sigma للشريط، تقليل زجاج الحقول والأزرار الداخلية، تجميع غير المتداخل فقط. تحقق من شكل التداخل والحوارات قبل اعتماد التغيير.
3. **معالجة القوائم الكبيرة:** builder/slivers مع اختبار تمرير واقعي، مع الحفاظ على API الحالية للأقسام القصيرة.
4. **تحسين الحركة عند ظهور مشكلة:** قياس مناطق إعادة الرسم ثم تجربة عزلها، وإضافة تقليل الحركة وloadingBuilder عند الحاجة.
5. **تصحيح دورة الحياة والفحوص:** متحكمات المصادقة والإكمال المتأخر، استيراد الأداء، والاختبار القديم. فصل هذه الإصلاحات عن ادعاءات مكاسب الرسم.

### بروتوكول القياس قبل وبعد

استخدم تطبيق example أو harness ثابتاً في وضع profile على جهاز حقيقي من كل فئة مستهدفة. سجّل الجهاز، OS، إصدار Flutter، محرك الرسم، الدقة، معدل التحديث والسطوع. اختبر الويب منفصلاً بأدوات المتصفح. القياس في debug غير ممثل لأداء release. [دليل Performance في DevTools](https://docs.flutter.dev/tools/devtools/performance).

المشاهد المطلوبة: شاشة ساكنة؛ نموذج به عدة حقول؛ تمرير قائمة خلف الشريطين؛ بطاقات فوق صورة أو خلفية متحركة؛ حوار وsheet فوق زجاج؛ تحميل مستمر؛ دخول وخروج متكرر أثناء طلب مصادقة.

قارن: الإعداد الحالي، ثم تعطيل البلور فعلياً بعد تنفيذه، ثم sigma أخف، ثم تجميع آمن. غيّر عاملاً واحداً كل مرة مع نفس المحتوى والحركة. افصل بدء التشغيل البارد عن القياس بعد الإحماء، وكرر كل تجربة ثلاث مرات على الأقل وبترتيب متبادل لتقليل أثر الحرارة.

سجّل UI وRaster عند p50/p95/p99، والإطارات المتأخرة، وDart heap والذاكرة الكلية/الأصلية المتاحة. ميزانية الإطار نحو 16.67ms عند 60Hz، و11.11ms عند 90Hz، و8.33ms عند 120Hz؛ لا تجمع UI وRaster ببساطة لأنهما يعملان ضمن pipeline. لا تعتمد المتوسط وحده لإخفاء التقطيع.

للطاقة، قارن تجربة تفاعل موحدة لعدة دقائق مع نفس الظروف، وسجّل الحرارة والطاقة بأدوات المنصة؛ فرق البطارية اللحظي ليس دليلاً كافياً. للذاكرة، كرر فتح وإغلاق الشاشات بعد إحماء الكاش وقارن الاستقرار بعد GC؛ النمو الأولي للكاش ليس تسريباً بحد ذاته.

لحجم Android، نفذ من example بناء release مماثلاً قبل وبعد باستخدام `flutter build apk --analyze-size --target-platform android-arm64`. لا تفترض أن إزالة lottie تزيل كل اعتمادياتها العابرة، فقد يستخدمها التطبيق من طريق آخر.

| القياس | الحالي | Lite | تحسينات أخرى |
|---|---|---|---|
| UI / Raster p95 | لم يُقَس | لم يُقَس | لم يُقَس |
| نسبة الإطارات المتأخرة | لم تُقَس | لم تُقَس | لم تُقَس |
| الذاكرة والطاقة | لم تُقَس | لم تُقَس | لم تُقَس |
| حجم release | لم يُقَس | لم يُقَس | لم يُقَس |

القرار الإنتاجي يبنى على هذه النتائج لكل مشهد وجهاز. الكود الحالي يوضح أين نبدأ التحسين، لكنه لا يحدد وحده حجم الزيادة في موارد جهاز المستخدم.