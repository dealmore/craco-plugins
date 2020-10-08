# craco-plugin-babel-include

[![Current npm version](https://img.shields.io/npm/v/@dealmore/craco-plugin-babel-include.svg)](https://www.npmjs.com/package/@dealmore/craco-plugin-babel-include)

[Craco](https://github.com/gsoft-inc/craco) plugin which allows to import uncompiled modules from outside the `src` directory.

## Usage

```sh
npm i --save-dev @dealmore/craco-plugin-babel-include  # npm or
yarn add -D @dealmore/craco-plugin-babel-include       # yarn
```

```js
// craco.config.js
const babelInclude = require('@dealmore/craco-plugin-babel-include');

module.exports = {
  plugins: [
    {
      plugin: babelInclude,
      options: {
        include: ['@workspace/shared', '../ui-components'],
      },
    },
  ],
};
```

## Options

| Option    | Type                | Description                               |
| --------- | ------------------- | ----------------------------------------- |
| `include` | `string | string[]` | npm-package name or directory to include. |

## Example

- [babel-include example](https://github.com/dealmore/craco-plugins/tree/main/examples/babel-include)

## License

Apache-2.0 - see [LICENSE](./LICENSE) for details.
