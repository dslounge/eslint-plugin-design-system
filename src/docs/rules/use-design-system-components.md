# Encourage use of design system components (use-design-system-components)

## Rule Details

This rule aims to prevent usage of platform supported components in cases where there are design system components. For example, you might want to use it to prevent the usage of the Text component in React Native, or to deprecate components not used by your design system anymore.

Examples of **incorrect** code for this rule:

If you've configured to prevent usage of Text from React Native, and OldButton from your components folder.

```js
import { Text } from "react-native";
```

```js
import { OldButton } from "../../components";
```

Examples of **correct** code for this rule:

```js
import { CorrectButton } from "../../design-system";
import { View } from "react-native";
```
