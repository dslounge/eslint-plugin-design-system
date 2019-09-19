"use strict";

/**
 * @fileoverview enforce design system
 * @author Rafael Mendiola
 */
var allRules = {
  "no-custom-colors": require("./rules/no-custom-colors"),
  "use-design-system-components": require("./rules/use-design-system-components")
};
module.exports = {
  rules: allRules
};