"use strict";

var _lodash = _interopRequireDefault(require("lodash.get"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var meta = {
  docs: {
    description: "Enforce design system",
    category: "Design System",
    recommended: false
  },
  fixable: null,
  // or "code" or "whitespace"
  schema: [// fill in your schema
  ]
};

var create = function create(context) {
  var userConfig = (0, _lodash["default"])(context, "settings.design-system.forbidden", null);
  return {
    ImportDeclaration: function ImportDeclaration(node) {
      if (!userConfig) {
        return;
      }

      var importPath = node.source.value;
      var importSpecifiers = node.specifiers;
      var importRule = userConfig.find(function (importConfig) {
        var pattern = importConfig.module;

        if (importConfig.isRelative) {
          return importPath.indexOf(pattern) !== -1;
        }

        return importPath === pattern;
      });

      if (!importRule) {
        return;
      }

      var forbiddenImports = importRule.imports;
      var forbiddenSpecifiers = importSpecifiers.filter(function (item) {
        return item.imported && forbiddenImports.indexOf(item.imported.name) !== -1;
      });
      var specifierLabels = forbiddenSpecifiers.map(function (spec) {
        return spec.imported.name;
      });

      if (forbiddenSpecifiers.length > 0) {
        context.report({
          node: node,
          message: "".concat(specifierLabels.join(", "), " from ").concat(importPath, " is forbidden. Please use Design System")
        });
      }
    }
  };
}; // because I don't know how to get babel to transpile `export default`


module.exports = {
  meta: meta,
  create: create
};