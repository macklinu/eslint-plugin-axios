const { RuleTester } = require('eslint')
const consistentMethodCasing = require('../../lib/rules/consistent-method-casing')

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 9 },
})

ruleTester.run('consistent-method-casing', consistentMethodCasing, {
  valid: [
    `axios({ url: '/api/v1/example', method: 'GET' })`,
    `axios.request({ url: '/api/v1/example', method: 'GET' })`,
    `axios({ url, method })`,
    `axios({ url, method: null })`,
    {
      code: `axios({ url: '/api/v1/example', method: 'GET' })`,
      options: ['uppercase'],
    },
    {
      code: `axios({ url: '/api/v1/example', method: 'get' })`,
      options: ['lowercase'],
    },
  ],
  invalid: [
    {
      code: `axios({ url: '/api/v1/example', method: 'get' })`,
      options: ['uppercase'],
      errors: [{ messageId: 'uppercase', type: 'ObjectExpression' }],
      output: `axios({ url: '/api/v1/example', method: 'GET' })`,
    },
    {
      code: `axios({ url: '/api/v1/example', method: 'GET' })`,
      options: ['lowercase'],
      errors: [{ messageId: 'lowercase', type: 'ObjectExpression' }],
      output: `axios({ url: '/api/v1/example', method: 'get' })`,
    },
    {
      code: `axios.request({ url: '/api/v1/example', method: 'get' })`,
      options: ['uppercase'],
      errors: [{ messageId: 'uppercase', type: 'ObjectExpression' }],
      output: `axios.request({ url: '/api/v1/example', method: 'GET' })`,
    },
    {
      code: `axios.request({ url: '/api/v1/example', method: 'GET' })`,
      options: ['lowercase'],
      errors: [{ messageId: 'lowercase', type: 'ObjectExpression' }],
      output: `axios.request({ url: '/api/v1/example', method: 'get' })`,
    },
    {
      // Respects original quote type when fixing method name.
      code: `axios({ url: '/api/v1/example', method: "get" })`,
      options: ['uppercase'],
      errors: [{ messageId: 'uppercase', type: 'ObjectExpression' }],
      output: `axios({ url: '/api/v1/example', method: "GET" })`,
    },
    {
      // fixme: allow replacing template literal strings
      code: `axios({ url: '/api/v1/example', method: \`get\` })`,
      options: ['uppercase'],
      errors: [{ messageId: 'uppercase', type: 'ObjectExpression' }],
      output: `axios({ url: '/api/v1/example', method: \`GET\` })`,
    },
  ],
})
