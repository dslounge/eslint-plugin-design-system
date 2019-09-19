/**
 * @fileoverview Enforce design system
 * @author Rafael Mendiola
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { RuleTester } from "eslint";
import rule from "../../../lib/rules/use-design-system-components";

RuleTester.setDefaultConfig({
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  },
});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
//

// sample config for this plugin
const settings = {
  "design-system": {
    forbidden: [
      {
        module: "react-native",
        imports: ["Text"],
      },
      {
        module: "./components",
        isRelative: true,
        imports: ["Button", "Text"],
      },
    ],
  },
};

const ruleTester = new RuleTester();
ruleTester.run("use-design-system-components", rule, {
  valid: [
    { code: "import { Stuff } from '../../components';", settings },
    { code: "import { View } from 'react-native';", settings },
    { code: "import { Text } from 'react-native-maps';", settings },
    { code: "import Loading from '../../components/Loading';", settings },
  ],

  invalid: [
    {
      code: "import { Button } from '../../components';",
      settings, // Any additional properties of a test case will be passed directly to the linter as config options.
      errors: [
        {
          message:
            "Button from ../../components is forbidden. Please use Design System",
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: "import { Button } from '../components';",
      settings,
      errors: [
        {
          message:
            "Button from ../components is forbidden. Please use Design System",
          type: "ImportDeclaration",
        },
      ],
    },
    // multiple bad imports
    {
      code: "import { Button, Text } from '../components';",
      settings,
      errors: [
        {
          message:
            "Button, Text from ../components is forbidden. Please use Design System",
          type: "ImportDeclaration",
        },
      ],
    },
    // react-native Text
    {
      code: "import { Text } from 'react-native';",
      settings,
      errors: [
        {
          message:
            "Text from react-native is forbidden. Please use Design System",
          type: "ImportDeclaration",
        },
      ],
    },
  ],
});
