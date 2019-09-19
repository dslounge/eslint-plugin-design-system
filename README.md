# eslint-plugin-design-system

This plugin

## How to install

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

or with yarn

```
$ yarn add -D eslint
```

## Rules

- `design-system/no-custom-colors`: Prevents developers from adding custom colors like `#FFFFFF`
- `design-system/use-design-system-components`: Helps enforce use of design system components over platform components like React Native's `Text`

## How to use

Add `design-system` to the plugins section of your `.eslintrc` configuration file. You don't need to add the `eslint-plugin-` prefix:

```json
{
  "plugins": ["design-system"]
}
```

Add the rules you want to use under the rules section.

```json
{
  "rules": {
    "design-system/no-custom-colors": 1,
    "design-system/use-design-system-components": 1
  }
}
```

The `use-design-system-components` rule needs additional configuration in your .eslintrc file. You can configure it by adding this to the `settings` settings of your eslint config:

```
settings: {
  "design-system": {
    forbidden: [
      {
        module: "react-native",
        imports: ["Text"],
      },
      {
        module: "./components",
        isRelative: true,
        imports: ["Button"],
      },
    ],
  },
},
```

The `isRelative` flag will try to find the string specified by `module` in import paths.
