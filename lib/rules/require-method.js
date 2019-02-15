const { docsUrl, parseObjectExpression } = require('../utils')

// axios({ url, method: 'GET'})
const axiosFactoryFunctionQuery = [
  'CallExpression',
  '[callee.type="Identifier"]',
  '[callee.name="axios"]',
  '[arguments.0.type="ObjectExpression"]',
].join('')

// axios(url, { method: 'GET' })
const axiosFactoryFunctionQueryWithUrlFirst = [
  'CallExpression',
  '[callee.type="Identifier"]',
  '[callee.name="axios"]',
  '[arguments.1.type="ObjectExpression"]',
].join('')

// axios.request({ url, method: 'GET' })
const axiosRequestMethodAliasFunction = [
  'CallExpression',
  '[callee.type="MemberExpression"]',
  '[callee.property.name="request"]',
  '[arguments.0.type="ObjectExpression"]',
].join('')

module.exports = {
  meta: {
    messages: {
      requireMethod:
        'Use the "method" option to be explicit about which HTTP method you are using',
    },
    type: 'suggestion',
    docs: {
      description:
        'Always declare a `method` property in your Axios API request config.',
      url: docsUrl('require-method'),
    },
    schema: [],
  },
  create(context) {
    const ensureMethodExists = argumentIndex => node => {
      const optionsObjectNode = node.arguments[argumentIndex]
      const axiosConfig = parseObjectExpression(optionsObjectNode)
      if (!axiosConfig.hasKey('method')) {
        context.report({
          node: optionsObjectNode,
          messageId: 'requireMethod',
        })
      }
    }

    return {
      [axiosFactoryFunctionQuery]: ensureMethodExists(0),
      [axiosFactoryFunctionQueryWithUrlFirst]: ensureMethodExists(1),
      [axiosRequestMethodAliasFunction]: ensureMethodExists(0),
    }
  },
}
