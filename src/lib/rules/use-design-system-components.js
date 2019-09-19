import get from "lodash.get";
const meta = {
  docs: {
    description: "Enforce design system",
    category: "Design System",
    recommended: false,
  },
  fixable: null, // or "code" or "whitespace"
  schema: [
    // fill in your schema
  ],
};

const create = context => {
  const userConfig = get(context, "settings.design-system.forbidden", null);

  return {
    ImportDeclaration(node) {
      if (!userConfig) {
        return;
      }

      const importPath = node.source.value;
      const importSpecifiers = node.specifiers;

      const importRule = userConfig.find(importConfig => {
        const pattern = importConfig.module;
        if (importConfig.isRelative) {
          return importPath.indexOf(pattern) !== -1;
        }
        return importPath === pattern;
      });

      if (!importRule) {
        return;
      }

      const forbiddenImports = importRule.imports;

      const forbiddenSpecifiers = importSpecifiers.filter(item => {
        return (
          item.imported && forbiddenImports.indexOf(item.imported.name) !== -1
        );
      });

      const specifierLabels = forbiddenSpecifiers.map(spec => {
        return spec.imported.name;
      });

      if (forbiddenSpecifiers.length > 0) {
        context.report({
          node,
          message: `${specifierLabels.join(
            ", "
          )} from ${importPath} is forbidden. Please use Design System`,
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
