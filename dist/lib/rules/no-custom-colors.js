"use strict";

var meta = {
  docs: {
    description: "don't allow custom colors",
    category: "Fill me in",
    recommended: false
  },
  fixable: null,
  // or "code" or "whitespace"
  schema: [// fill in your schema
  ]
};

var create = function create(context) {
  var colorRegex = /#([\da-fA-F]{3}){1,2}/gm;
  var rgbRegex = /(rgb|hsl).?\(.*\)/gm;
  return {
    Property: function Property(node) {
      var isLiteral = node.value.type === "Literal"; // we only care about literal values

      if (!isLiteral) {
        return;
      }

      var literalValue = node.value.raw;

      if (colorRegex.test(literalValue) || rgbRegex.test(literalValue)) {
        context.report({
          node: node,
          message: "Please use Design System colors"
        });
      }
    }
  };
}; // because I don't know how to get babel to transpile `export default`


module.exports = {
  meta: meta,
  create: create
};