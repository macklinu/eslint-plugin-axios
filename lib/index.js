module.exports = {
  rules: {
    'require-method': require('./rules/require-method'),
    'require-post-data': require('./rules/require-post-data'),
    'use-axios': require('./rules/use-axios'),
  },
  configs: {
    recommended: {
      plugins: ['axios'],
      rules: {
        'axios/use-axios': 'error',
      },
    },
  },
}
