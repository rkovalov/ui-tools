const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssNormalize = require('postcss-normalize');

const getStyleLoaders =
  ({ IS_DEV, IS_PROD }) =>
  (cssOptions, preProcessor) => {
    const loaders = [
      IS_DEV && require.resolve('style-loader'),
      IS_PROD && {
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: require.resolve('css-loader'),
        options: cssOptions,
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          postcssOptions: {
            // Necessary for external CSS imports to work
            ident: 'postcss',
            plugins: [
              require('postcss-flexbugs-fixes'),
              require('postcss-preset-env')({
                autoprefixer: {
                  flexbox: 'no-2009',
                },
                stage: 3,
              }),
              // Adds PostCSS Normalize as the reset css with default options,
              // so that it honors browserslist config in package.json
              // which in turn let's users customize the target behavior as per their needs.
              postcssNormalize(),
            ],
          },
          sourceMap: IS_PROD,
        },
      },
    ].filter(Boolean);
    if (preProcessor) {
      loaders.push(
        {
          loader: require.resolve('resolve-url-loader'),
          options: {
            sourceMap: IS_PROD,
          },
        },
        {
          loader: require.resolve(preProcessor.loader),
          options: preProcessor.options,
        }
      );
    }
    return loaders;
  };

module.exports = getStyleLoaders;
