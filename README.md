# eslint-plugin-axios
Axios plugin for ESLint

:warning: There is no code for this plugin yet; just gathering ideas. :smile:

## Rule Ideas

- `require-post-data`: Helps warn about the Content-Type not being set for POST requests with a `data` config property (see https://github.com/axios/axios/issues/86)
- `require-method`: Always declare a `method` property in your Axios API request config.
- `prefer-factory`: Instead of using `axios.get()`, use `axios({ method: 'GET' })`.
