module.exports = {
  rules: {
    'require-method': require('./rules/require-method'),
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
