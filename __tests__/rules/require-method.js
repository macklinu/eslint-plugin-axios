const { RuleTester } = require('eslint')
const requireMethod = require('../../lib/rules/require-method')

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 9 },
})

ruleTester.run('require-method', requireMethod, {
  valid: [
    `axios({ method: 'GET' })`,
    `axios({ method })`,
    `axios(url, { method: 'GET', timeout: 1000 })`,
    `axios.get('/users/123/')`,
    `axios.get('/user', { params: { ID: '123' } })`,
    `axios.request({ method: 'GET', url: '/api/v1/example' })`,
  ],
  invalid: [
    {
      code: `axios({ url: '/api/v1/example' })`,
      errors: [{ messageId: 'requireMethod' }],
    },
    {
      code: `axios('/api/v1/example', { timeout: 1000 })`,
      errors: [{ messageId: 'requireMethod' }],
    },
    {
      code: `axios.request({ url: '/api/v1/example' })`,
      errors: [{ messageId: 'requireMethod' }],
    },
  ],
})
