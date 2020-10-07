import { getLoader, loaderByName } from '@craco/craco';

const cssLoaderName = 'css-loader';

export function getCssLoader(webpackConfig) {
  const {
    isFound,
    match: { loader },
  } = getLoader(webpackConfig, loaderByName(cssLoaderName));

  if (!isFound) {
    throw new Error(
      `Could not locate "${cssLoaderName}" in your Webpack config`
    );
  }

  return loader;
}

const babelLoaderName = 'babel-loader';

export function getBabelLoader(webpackConfig) {
  const {
    isFound,
    match: { loader },
  } = getLoader(webpackConfig, loaderByName(babelLoaderName));

  if (!isFound) {
    throw new Error(
      `Could not locate "${babelLoaderName}" in your Webpack config`
    );
  }

  return loader;
}
