const { RuleTester } = require('eslint')
const useAxios = require('../../lib/rules/use-axios')

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
  },
})

ruleTester.run('use-axios', useAxios, {
  valid: [
    `const axios = require('axios')`,
    `const axios = require(dynamicPath)`,
    `const fs = require('fs')`,
    // todo: should there be a warning for this?
    `const axios = require('some-other-lib')`,
    // Only check for global `require()` statements.
    `const foo = something.require('axios')`,
    // This wouldn't work at runtime, but the rule should only check for one argument.
    `const foo = require('axios', {})`,
    `import axios from 'axios'`,
    `import axios, { AxiosResponse } from 'axios'`,
  ],
  invalid: [
    {
      code: `const somethingElse = require('axios')`,
      errors: [{ messageId: 'require' }],
    },
    {
      code: `import api from 'axios'`,
      errors: [{ messageId: 'import' }],
    },
  ],
})
