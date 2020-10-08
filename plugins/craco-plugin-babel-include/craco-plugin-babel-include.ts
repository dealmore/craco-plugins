/**
 * Craco plugin which allows to import uncompiled modules from
 * outside the `src` directory
 */

import * as path from 'path';
import { throwUnexpectedConfigError } from '@craco/craco';

import { name as pkgName } from './package.json';
import { getBabelLoader } from '../utils';
import { repoName } from '../utils/constants';

const throwError = (message, githubIssueQuery) =>
  throwUnexpectedConfigError({
    packageName: pkgName,
    githubRepo: repoName,
    message,
    githubIssueQuery,
  });

export const babelIncludePlugin = {
  overrideWebpackConfig: ({
    webpackConfig,
    pluginOptions,
    context: { paths },
  }) => {
    // Remove ModuleScopePlugin
    if (Array.isArray(webpackConfig.resolve.plugins)) {
      webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter(
        (p) => p.constructor.name !== 'ModuleScopePlugin'
      );
    }

    // Add the paths to the babel-loader
    const babelLoader = getBabelLoader(webpackConfig, throwError);

    let includePaths = Array.isArray(pluginOptions.include)
      ? pluginOptions.include
      : [pluginOptions.include];

    // Ensure absolute paths
    includePaths = includePaths.map((_path) => {
      try {
        // Check if the path is an npm module
        return path.dirname(
          require.resolve(path.join(_path, 'package.json'), {
            paths: [paths.appPath],
          })
        );
      } catch (err) {
        // Otherwise resolve local
        return path.resolve(_path);
      }
    });

    if (!Array.isArray(babelLoader.include)) {
      babelLoader.include = [babelLoader.include];
    }

    babelLoader.include.push(...includePaths);

    return webpackConfig;
  },
};
