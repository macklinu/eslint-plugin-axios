const { docsUrl } = require('../utils')

const requireStatementQuery = [
  // Check variable declarations
  'VariableDeclarator',
  // that call the `require()` function
  '[init.type="CallExpression"]',
  '[init.callee.name="require"]',
  // with a single argument
  '[init.arguments.length=1]',
  // with the string literal "axios"
  '[init.arguments.0.value="axios"]',
  // but the variable name is *not* `axios`.
  '[id.name!="axios"]',
].join('')

const importStatementQuery = [
  // Check import statements
  'ImportDeclaration',
  // from the library name 'axios'
  '[source.value="axios"]',
  // that have a default import
  '[specifiers.0.type="ImportDefaultSpecifier"]',
  // that is *not* named `axios`.
  '[specifiers.0.local.name!="axios"]',
].join('')

module.exports = {
  meta: {
    messages: {
      require: 'Axios should be required with the variable name `axios`',
      import: 'Axios should be imported with the variable name `axios`',
    },
    type: 'suggestion',
    docs: {
      description:
        'Ensure that axios is imported with `axios` as the variable name.',
      url: docsUrl('use-axios'),
      recommended: true,
    },
    schema: [],
  },
  create: context => ({
    [requireStatementQuery]: node =>
      context.report({ node, messageId: 'require' }),
    [importStatementQuery]: node =>
      context.report({ node, messageId: 'import' }),
  }),
}
