/**
 * Generates a rule documentation URL.
 *
 * @param {string} name The ESLint rule name.
 * @returns {string} The rule documentation URL.
 */
const docsUrl = name =>
  `https://github.com/macklinu/eslint-plugin-axios/blob/master/docs/rules/${name}.md`

module.exports = docsUrl
