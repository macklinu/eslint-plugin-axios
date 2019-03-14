const { RuleTester } = require('eslint')
const requirePostData = require('../../lib/rules/require-post-data')

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 9 },
})

ruleTester.run('require-post-data', requirePostData, {
  valid: [
    `axios({ method: 'POST', data })`,
    `axios({ method })`,
    `axios(url, { method: 'POST', data: {} })`,
    `axios.post('/users/123/', { data })`,
    `axios.get('/user', { method: 'GET', data: null })`,
  ],
  invalid: [
    {
      code: `axios({ method: 'POST', url: '/api/v1/example' })`,
      errors: [{ messageId: 'requirePostData' }],
    },
    {
      code: `axios('/api/v1/example', { method: 'post', timeout: 1000 })`,
      errors: [{ messageId: 'requirePostData' }],
    },
    {
      code: `axios.request({ method: \`POST\`, url: '/api/v1/example' })`,
      errors: [{ messageId: 'requirePostData' }],
    },
    {
      code: `axios.post({ url: '/api/v1/example' })`,
      errors: [{ messageId: 'requirePostData' }],
    },
  ],
})
