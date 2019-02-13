const { docsUrl } = require('../utils')

/**
 * Converts the properties of an `ObjectExpression` to a `Map`.
 *
 * @param {object} objectExpression The `ObjectExpression` node.
 * @returns {Map<string, string|null>} A map of object key names to values.
 */
const convertPropertiesToMap = objectExpression => {
  const { properties = [] } = objectExpression || {}
  const map = new Map()
  properties.forEach(property => {
    map.set(property.key.name, property.value.value || null)
  })
  return map
}

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
      const requestConfigMap = convertPropertiesToMap(optionsObjectNode)
      if (!requestConfigMap.has('method')) {
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
