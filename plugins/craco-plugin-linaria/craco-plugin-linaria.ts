/**
 * Craco plugin which adds all presets to use linaria 2+
 * inside of create react app
 */

import * as path from 'path';
import { whenProd, throwUnexpectedConfigError } from '@craco/craco';

import { name as pkgName } from './package.json';
import { getBabelLoader } from '../utils';
import { repoName } from '../utils/constants';

const LINARIA_EXTENSION = '.linaria.css';

interface PluginOptions {
  sourceMap: boolean;
  linaria?: any;
}

const throwError = (message, githubIssueQuery) =>
  throwUnexpectedConfigError({
    packageName: pkgName,
    githubRepo: repoName,
    message,
    githubIssueQuery,
  });

export const linariaPlugin = {
  overrideWebpackConfig: ({
    webpackConfig,
    pluginOptions: _pluginOptions,
    context: { paths, env },
  }) => {
    const cwd = paths.appPath as string;

    const pluginOptions: PluginOptions = {
      ..._pluginOptions,
      sourceMap:
        _pluginOptions && _pluginOptions.sourceMap !== undefined
          ? Boolean(_pluginOptions.sourceMap)
          : env !== 'production',
    };
    // Add the paths to the babel-loader
    const babelLoader = getBabelLoader(webpackConfig, throwError);
    const babelOptions = babelLoader.options;

    babelLoader.use = [
      {
        loader: babelLoader.loader,
        options: whenProd(
          () => ({
            ...babelOptions,
            presets: [
              ...babelOptions.presets,
              require.resolve('linaria/babel', { paths: [cwd] }),
            ],
          }),
          babelOptions
        ),
      },
      {
        loader: require.resolve('linaria/loader', { paths: [cwd] }),
        options: {
          sourceMap: pluginOptions.sourceMap,
          ...(pluginOptions.linaria || {}),
          extension: LINARIA_EXTENSION,
          babelOptions: { presets: [...babelOptions.presets] },
          cacheDirectory: path.join(paths.appSrc, '.linaria-cache'),
        },
      },
    ];

    delete babelLoader.loader;
    delete babelLoader.options;

    return webpackConfig;
  },
};
