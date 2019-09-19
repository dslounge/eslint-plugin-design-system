/**
 * @fileoverview don&#39;t allow custom colors
 * @author Rafael Mendiola
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import { RuleTester } from "eslint";
import rule from "../../../lib/rules/no-custom-colors";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

RuleTester.setDefaultConfig({
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  },
});

const ruleTester = new RuleTester();

ruleTester.run("no-custom-colors", rule, {
  valid: [
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: `
      const styles = StyleSheet.create({
  someStyle: {
    backgroundColor: '#FFFFFF',
  }})
      `,
      errors: [
        {
          message: "Please use Design System colors",
          type: "Property",
        },
      ],
    },
    {
      code: `
  const someStyle = {
    backgroundColor: 'rgba(0, 0, 0, .5)',
  }
      `,
      errors: [
        {
          message: "Please use Design System colors",
          type: "Property",
        },
      ],
    },
  ],
});
