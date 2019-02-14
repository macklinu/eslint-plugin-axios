const {
  docsUrl,
  getQuotedReplacement,
  parseObjectExpression,
} = require('../utils')

const CasingOptions = {
  Uppercase: 'uppercase',
  Lowercase: 'lowercase',
}

/**
 *
 * @param {string} value
 * @returns {boolean}
 */
const isUppercase = value => {
  return value.toUpperCase() === value
}

/**
 *
 * @param {string} value
 * @returns {boolean}
 */
const isLowercase = value => {
  return value.toLowerCase() === value
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
      lowercase: 'Ensure method casing is lowercase.',
      uppercase: 'Ensure method casing is uppercase.',
    },
    type: 'layout',
    docs: {
      description: 'Enforce consistent casing of the `method` config property.',
      url: docsUrl('consistent-method-casing'),
    },
    fixable: 'code',
    schema: [{ enum: [CasingOptions.Uppercase, CasingOptions.Lowercase] }],
  },
  create(context) {
    const casingOption = context.options[0] || CasingOptions.Uppercase

    const isProperCase = value =>
      casingOption === CasingOptions.Uppercase
        ? isUppercase(value)
        : isLowercase(value)

    const toProperCase = value =>
      casingOption === CasingOptions.Uppercase
        ? value.toUpperCase()
        : value.toLowerCase()

    const validateMethodValueCase = argumentIndex => node => {
      const optionsObjectNode = node.arguments[argumentIndex]
      const axiosConfig = parseObjectExpression(optionsObjectNode)

      if (!axiosConfig.hasKey('method')) {
        return
      }

      const methodValue = axiosConfig.getValueForKey('method')
      if (typeof methodValue !== 'string') {
        return
      }

      if (isProperCase(methodValue)) {
        return
      }

      context.report({
        node: optionsObjectNode,
        messageId: casingOption,
        fix: fixer => {
          const valueNode = axiosConfig.getNodeForKey('method')
          const replacementValue = toProperCase(methodValue)
          return fixer.replaceText(
            valueNode,
            getQuotedReplacement(valueNode, replacementValue)
          )
        },
      })
    }

    return {
      [axiosFactoryFunctionQuery]: validateMethodValueCase(0),
      [axiosFactoryFunctionQueryWithUrlFirst]: validateMethodValueCase(1),
      [axiosRequestMethodAliasFunction]: validateMethodValueCase(0),
    }
  },
}
