const getQuotedReplacement = (node, value) => {
  let leftQuote
  let rightQuote
  if (node.type === 'TemplateLiteral') {
    leftQuote = '`'
    rightQuote = '`'
  } else {
    leftQuote = node.raw.charAt(0)
    rightQuote = node.raw.charAt(node.raw.length - 1)
  }
  return [leftQuote, value, rightQuote].join('')
}

module.exports = getQuotedReplacement
