import Webpack from 'webpack';
import resolve from 'resolve';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import ForkTsCheckerWebpackPlugin from 'react-dev-utils/ForkTsCheckerWebpackPlugin';
import typescriptFormatter from 'react-dev-utils/typescriptFormatter';
import ReactRefreshTypeScript from 'react-refresh-typescript';

import { merge } from 'webpack-merge';
import { jsonMerge } from './utils';

import paths from '../paths';
import { getClientEnvironment } from '../env';

import babelConfig from '../babelrc';
import styleLoaders from './styleLoaders';

const IS_DEV = process.env.NODE_ENV === 'development';
const IS_PROD = process.env.NODE_ENV === 'production';

const getStyleLoaders = styleLoaders({ IS_DEV, IS_PROD });
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const localIdentName = '[name]_[local]__[hash:base64:5]';

const clientEnv = getClientEnvironment();

export default ({ useTypescript = false }) => ({
  devtool: 'cheap-module-source-map',
  entry: [!useTypescript && 'core-js/stable', !useTypescript && 'regenerator-runtime/runtime', paths.index].filter(
    Boolean
  ),
  // target: "web", // by default browserlist
  // stats: 'verbose',
  performance: {
    // TODO: split bundle to chunks
    hints: 'warning',
  },
  output: {
    path: paths.dist,
    publicPath: clientEnv.raw.PUBLIC_PATH,
    filename: 'bundle_[hash:5].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.json', useTypescript && '.ts', useTypescript && '.tsx'].filter(Boolean),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      useTypescript && {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: '@ts-tools/webpack-loader',
        options: {
          cache: IS_DEV,
          cacheDirectoryPath: `${paths.nodeModules}/.cache/${process.env.NODE_ENV}`,
          transformers: {
            before: IS_DEV ? [ReactRefreshTypeScript()] : [],
          },
        },
      },
      !useTypescript && {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: merge(babelConfig, {
              cacheDirectory: IS_DEV,
              plugins: [IS_DEV && 'react-refresh/babel'].filter(Boolean),
            }),
          },
        ].filter(Boolean),
      },
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: getStyleLoaders({
          importLoaders: 1,
          sourceMap: IS_PROD,
          modules: {
            mode: 'icss',
          },
        }),
        // Don't consider CSS imports dead code even if the
        // containing package claims to have no side effects.
        // Remove this when webpack adds a warning or an error for this.
        // See https://github.com/webpack/webpack/issues/6571
        sideEffects: true,
      },
      {
        test: cssModuleRegex,
        use: getStyleLoaders({
          importLoaders: 1,
          sourceMap: IS_PROD,
          modules: {
            localIdentName,
            exportLocalsConvention: 'camelCase',
          },
        }),
      },
      {
        test: sassRegex,
        exclude: sassModuleRegex,
        use: getStyleLoaders(
          {
            importLoaders: 3,
            sourceMap: IS_PROD,
            modules: {
              // icss give possibility to import vars from sass to js
              mode: 'icss',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                // https://github.com/webpack-contrib/sass-loader/issues/416
                // https://github.com/webpack-contrib/sass-loader/issues/763
                outputStyle: 'expanded',
              },
            },
          }
        ),
        // Don't consider CSS imports dead code even if the
        // containing package claims to have no side effects.
        // Remove this when webpack adds a warning or an error for this.
        // See https://github.com/webpack/webpack/issues/6571
        sideEffects: true,
      },
      {
        test: sassModuleRegex,
        use: getStyleLoaders(
          {
            importLoaders: 3,
            sourceMap: IS_PROD,
            modules: {
              localIdentName,
              exportLocalsConvention: 'camelCase',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                // https://github.com/webpack-contrib/sass-loader/issues/416
                // https://github.com/webpack-contrib/sass-loader/issues/763
                outputStyle: 'expanded',
              },
            },
          }
        ),
      },
      {
        test: /\.(png|gif|svg|jpe?g)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name]-[contenthash].[ext]',
              esModule: false,
            },
          },
          'img-loader',
        ],
      },
      // doesnt work with resolve-url-loader
      // https://github.com/bholloway/resolve-url-loader/issues/213
      // {
      //   test: /\.(woff|eot|ttf|woff2|otf)$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: 'fonts/[name]-[contenthash].[ext]',
      //         // esModule need set to false for properly resolve url by resolve-url-loader
      //         esModule: false,
      //       },
      //     },
      //   ],
      // },
    ].filter(Boolean),
  },
  plugins: [
    IS_DEV && new ESLintPlugin({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
    new Webpack.DefinePlugin(clientEnv.stringified),
    // TODO: make public folder
    new CopyPlugin({
      patterns: [
        {
          from: './keycloak.json',
          to: './',
          transform(content) {
            return jsonMerge(content, {
              'auth-server-url': `${process.env.KEYCLOAK_URL || process.env.DEFAULT_KEYCLOAK_URL}`,
              realm: `${process.env.KEYCLOAK_REALM || process.env.DEFAULT_KEYCLOAK_REALM}`,
            });
          },
          noErrorOnMissing: true,
        },
        {
          from: './src/robots.txt',
          to: './',
          noErrorOnMissing: true,
        },
        {
          from: './src/manifest.json',
          to: './',
          noErrorOnMissing: true,
        },
        {
          from: paths.public,
          to: './',
          noErrorOnMissing: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: paths.html,
      env: process.env,
      version: clientEnv.raw.VERSION,
      commitHash: clientEnv.raw.COMMITHASH,
      branch: clientEnv.raw.BRANCH,
      minify: {
        removeComments: false,
        // By Default
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    // Generate an asset manifest file with the following content:
    // - "files" key: Mapping of all asset filenames to their corresponding
    //   output file so that tools can pick it up without having to parse
    //   `index.html`
    // - "entrypoints" key: Array of files which are included in `index.html`,
    //   can be used to reconstruct the HTML if necessary
    new WebpackManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: clientEnv.raw.PUBLIC_PATH,
      generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path;
          return manifest;
        }, seed);
        const entrypointFiles = entrypoints.main.filter(fileName => !fileName.endsWith('.map'));

        return {
          files: manifestFiles,
          entrypoints: entrypointFiles,
        };
      },
    }),
    // TypeScript type checking
    useTypescript &&
      new ForkTsCheckerWebpackPlugin({
        typescript: resolve.sync('typescript', {
          basedir: paths.nodeModules,
        }),
        async: IS_DEV,
        checkSyntacticErrors: true,
        resolveModuleNameModule: process.versions.pnp ? `${__dirname}/pnpTs.js` : undefined,
        resolveTypeReferenceDirectiveModule: process.versions.pnp ? `${__dirname}/pnpTs.js` : undefined,
        tsconfig: paths.tsConfig,
        reportFiles: [
          // This one is specifically to match during CI tests,
          // as micromatch doesn't match
          // otherwise.
          '../**/src/**/*.{ts,tsx}',
          '**/src/**/*.{ts,tsx}',
          '!**/src/**/__tests__/**',
          '!**/src/**/?(*.)(spec|specs|test|tests).*',
          '!**/src/setupProxy.*',
          '!**/src/setupTests.*',
        ],
        silent: true,
        // The formatter is invoked directly in WebpackDevServerUtils during development
        formatter: IS_PROD ? typescriptFormatter : undefined,
      }),
    IS_PROD &&
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
  ].filter(Boolean),
});
