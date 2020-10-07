/**
 * Craco plugin which allows to import uncompiled modules from
 * outside the `src` directory
 */

import * as path from 'path';

import { getBabelLoader } from '../utils';

export const babelIncludePlugin = {
  overrideWebpackConfig: ({ webpackConfig, pluginOptions }) => {
    // Remove ModuleScopePlugin
    if (Array.isArray(webpackConfig.resolve.plugins)) {
      webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter(
        (p) => p.constructor.name !== 'ModuleScopePlugin'
      );
    }

    // Add the paths to the babel-loader
    const babelLoader = getBabelLoader(webpackConfig);

    let includePaths = Array.isArray(pluginOptions.include)
      ? pluginOptions.include
      : [pluginOptions.include];

    // Ensure absolute paths
    includePaths = includePaths.map((_path) => path.resolve(_path));

    if (!Array.isArray(babelLoader.include)) {
      babelLoader.include = [babelLoader.include];
    }

    babelLoader.include.push(...includePaths);

    return webpackConfig;
  },
};
