const meta = {
  docs: {
    description: "don't allow custom colors",
    category: "Fill me in",
    recommended: false,
  },
  fixable: null, // or "code" or "whitespace"
  schema: [
    // fill in your schema
  ],
};

const create = context => {
  const colorRegex = /#([\da-fA-F]{3}){1,2}/gm;
  const rgbRegex = /(rgb|hsl).?\(.*\)/gm;

  return {
    Property(node) {
      const isLiteral = node.value.type === "Literal";
      // we only care about literal values
      if (!isLiteral) {
        return;
      }

      const literalValue = node.value.raw;

      if (colorRegex.test(literalValue) || rgbRegex.test(literalValue)) {
        context.report({
          node,
          message: "Please use Design System colors",
        });
      }
    },
  };
};

// because I don't know how to get babel to transpile `export default`
module.exports = {
  meta,
  create,
};
