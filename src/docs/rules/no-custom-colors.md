# don't allow custom colors (no-custom-colors)

## Rule Details

This rule aims to prevent usage of custom colors in the codebase. We should be using colors from the design system.

Examples of **incorrect** code for this rule:

```js
const styles = StyleSheet.create({
  someStyle: {
    backgroundColor: '#FFFFFF',
  },
});
```

```js
const someStyle = {
  backgroundColor: 'rgba(0, 0, 0, .5)',
};
```

Examples of **correct** code for this rule:

```js
const someStyle = {
  backgroundColor: colors.black,
};
```
