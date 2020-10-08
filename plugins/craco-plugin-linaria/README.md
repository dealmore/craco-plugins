# @dealmore/craco-plugin-linaria

[![Current npm version](https://img.shields.io/npm/v/@dealmore/craco-plugin-linaria.svg)](https://www.npmjs.com/package/@dealmore/craco-plugin-linaria)

[Craco](https://github.com/gsoft-inc/craco) plugin which configures babel & webpack to work with [linaria](https://linaria.dev/) 2+.

## Usage

```sh
npm i --save-dev @dealmore/craco-plugin-linaria  # npm or
yarn add -D @dealmore/craco-plugin-linaria       # yarn
```

```js
// craco.config.js
const linaria = require('@dealmore/craco-plugin-linaria');

module.exports = {
  plugins: [
    {
      plugin: linaria,
    },
  ],
};
```

### With TypeScript

When using TypeScript, you need at least version `>=3.8.0"`.

| Option      | Type      | Description                                                                         |
| ----------- | --------- | ----------------------------------------------------------------------------------- |
| `sourceMap` | `boolean` | `true` to emit a css-sourceMap. Emits a sourceMap per default in production builds. |

## Example

- [linaria example](https://github.com/dealmore/craco-plugins/tree/main/examples/linaria)

## License

Apache-2.0 - see [LICENSE](./LICENSE) for details.
