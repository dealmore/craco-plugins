/**
 * Craco plugin which adds all presets to use linaria 2+
 * inside of create react app
 */

import * as path from 'path';

import { getBabelLoader, getCssLoader } from '../utils';

const LINARIA_EXTENSION = '.linaria.module.css';

interface PluginOptions {
  sourceMap: boolean;
  linaria?: any;
}

export const linariaPlugin = {
  overrideWebpackConfig: ({
    webpackConfig,
    pluginOptions: _pluginOptions,
    context: { paths, env },
  }) => {
    const cssLoader = getCssLoader(webpackConfig);
    console.log('cssLoader', cssLoader);

    console.log('rules', webpackConfig.module.rules[2].oneOf);
    // process.exit();

    const cwd = paths.appPath as string;

    const pluginOptions: PluginOptions = {
      ..._pluginOptions,
      sourceMap:
        _pluginOptions && _pluginOptions.sourceMap !== undefined
          ? Boolean(_pluginOptions.sourceMap)
          : env !== 'production',
    };
    // Add the paths to the babel-loader
    const babelLoader = getBabelLoader(webpackConfig);

    babelLoader.use = [
      {
        loader: require.resolve('linaria/loader', { paths: [cwd] }),
        options: {
          sourceMap: pluginOptions.sourceMap,
          ...(pluginOptions.linaria || {}),
          extension: LINARIA_EXTENSION,
          cacheDirectory: path.join(paths.appSrc, '.linaria-cache'),
        },
      },
      {
        loader: babelLoader.loader,
        options:
          env !== 'production'
            ? babelLoader.options
            : {
                ...babelLoader.options,
                presets: [
                  ...babelLoader.options.presets,
                  require.resolve('linaria/babel', { paths: [cwd] }),
                ],
              },
      },
    ];

    delete babelLoader.loader;
    delete babelLoader.options;

    return webpackConfig;
  },
};
