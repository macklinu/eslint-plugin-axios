const { docsUrl, parseObjectExpression } = require('../utils')

// axios({ url, method: 'POST'})
const axiosFactoryFunctionQuery = [
  'CallExpression',
  '[callee.type="Identifier"]',
  '[callee.name="axios"]',
  '[arguments.0.type="ObjectExpression"]',
].join('')

// axios(url, { method: 'POST' })
const axiosFactoryFunctionQueryWithUrlFirst = [
  'CallExpression',
  '[callee.type="Identifier"]',
  '[callee.name="axios"]',
  '[arguments.1.type="ObjectExpression"]',
].join('')

// axios.request({ url, method: 'POST' })
const axiosRequestMethodAliasFunction = [
  'CallExpression',
  '[callee.type="MemberExpression"]',
  '[callee.property.name="request"]',
  '[arguments.0.type="ObjectExpression"]',
].join('')

// axios.post({ url })
const axiosPostMethodAliasFunction = [
  'CallExpression',
  '[callee.type="MemberExpression"]',
  '[callee.property.name="post"]',
  '[arguments.0.type="ObjectExpression"]',
].join('')

module.exports = {
  meta: {
    messages: {
      requirePostData:
        'Include the `data` property with POST requests to avoid potential bugs.',
    },
    type: 'suggestion',
    docs: {
      description:
        'Include the `data` property with POST requests to avoid potential bugs.',
      url: docsUrl('require-post-data'),
    },
    schema: [],
  },
  create(context) {
    const isPostRequest = value => value && value.toLowerCase() === 'post'

    const ensurePostRequestHasData = (
      argumentIndex,
      checkMethod = true
    ) => node => {
      const optionsObjectNode = node.arguments[argumentIndex]
      const axiosConfig = parseObjectExpression(optionsObjectNode)
      const method = checkMethod ? axiosConfig.getValueForKey('method') : 'post'
      const hasData = axiosConfig.hasKey('data')
      if (isPostRequest(method) && !hasData) {
        context.report({
          node: optionsObjectNode,
          messageId: 'requirePostData',
        })
      }
    }

    return {
      [axiosFactoryFunctionQuery]: ensurePostRequestHasData(0),
      [axiosFactoryFunctionQueryWithUrlFirst]: ensurePostRequestHasData(1),
      [axiosRequestMethodAliasFunction]: ensurePostRequestHasData(0),
      [axiosPostMethodAliasFunction]: ensurePostRequestHasData(0, false),
    }
  },
}
