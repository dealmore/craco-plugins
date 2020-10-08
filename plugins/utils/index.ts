import { getLoader, loaderByName } from '@craco/craco';

const babelLoaderName = 'babel-loader';

export function getBabelLoader(webpackConfig, throwError) {
  const {
    isFound,
    match: { loader },
  } = getLoader(webpackConfig, loaderByName(babelLoaderName));

  if (!isFound) {
    throwError(
      `Could not find ${babelLoaderName} in the webpack config!`,
      `webpack+${babelLoaderName}`
    );
  }

  return loader;
}
