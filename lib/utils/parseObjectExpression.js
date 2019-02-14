/**
 * An AST Node.
 * @typedef {object} Node
 */

/**
 * A helper object for interacting with a parsed `ObjectExpression` node.
 * @typedef {object} ParsedObjectExpression
 * @property {(key: string) => boolean} hasKey Whether the object contains a property `key`.
 * @property {(key: string) => Node | undefined} getNodeForKey Returns the AST Node for a given key,
 * or undefined if one was not found.
 * @property {(key: string) => string | number | boolean | undefined} getValueForKey Returns the primitive value
 * for a given key in the `ObjectExpression` object, or undefined if one was not found.
 */

/**
 * Parses an `ObjectExpression` into helper object, which is useful for getting
 * key names, values, and AST nodes in an easier to read fashion.
 *
 * @param {object} objectExpression The `ObjectExpression` node.
 * @returns {ParsedObjectExpression} An object containing helper methods
 * for interacting with the keys and values of object.
 */
const parseObjectExpression = objectExpression => {
  const { properties = [] } = objectExpression || {}
  const nodeMap = new Map()
  properties.forEach(property => {
    nodeMap.set(property.key.name, property.value)
  })
  return {
    hasKey(key) {
      return nodeMap.has(key)
    },
    getNodeForKey(key) {
      return nodeMap.get(key)
    },
    getValueForKey(key) {
      const node = nodeMap.get(key)
      if (node) {
        if (node.type === 'TemplateLiteral') {
          // Not sure how to handle template literals with expressions.
          // Returning undefined to ignore this scenario.
          if (node.expressions.length) {
            return undefined
          }
          return node.quasis[0].value.raw
        }
        return node.value || undefined
      }
      return undefined
    },
  }
}

module.exports = parseObjectExpression
