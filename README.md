# craco plugins

This is a small collection of well-crafted [craco](https://github.com/gsoft-inc/craco) plugins which we use internally to customize our create react app setup.

## Plugins

### babel-include

This plugin allows the import of non transpiled files outside of the `src` folder.
Especially useful in a Typescript monorepo setup where you have shared components.

```sh
npm i --save-dev @dealmore/craco-plugin-babel-include   # npm or
yarn add -D @dealmore/craco-plugin-babel-include        # yarn
```

Usage & configuration: [Readme](./plugins/craco-plugin-babel-include)

## linaria

Use linaria 2+ together with create react app.

```sh
npm i --save-dev @dealmore/craco-plugin-linaria  # npm or
yarn add -D @dealmore/craco-plugin-linaria       # yarn
```

Usage & configuration: [Readme](./plugins/craco-plugin-linaria)

## License

Apache-2.0 - see [LICENSE](./LICENSE) for details.
