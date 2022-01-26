import Webpack from 'webpack';
import resolve from 'resolve';
import fs from 'fs';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import ForkTsCheckerWebpackPlugin from 'react-dev-utils/ForkTsCheckerWebpackPlugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';

import { merge } from 'webpack-merge';
import { jsonMerge } from './utils';

import paths from '../paths';
import { getClientEnvironment } from '../env';

import babelConfig from '../babelrc';
import styleLoaders from './styleLoaders';

const IS_DEV = process.env.NODE_ENV === 'development';
const IS_PROD = process.env.NODE_ENV === 'production';
const USE_FAST_REFRESH = IS_DEV && (!process.env.FAST_REFRESH ? true : process.env.FAST_REFRESH === 'true');

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
    // filename: IS_PROD ? '[name].[contenthash:8].js' : '[name].bundle.js',
    // chunkFilename: IS_PROD ? '[name].[contenthash:8].chunk.js' : '[name].chunk.js',
    // https://github.com/webpack/webpack/issues/9297
    filename: pathdata =>
      (pathdata.chunk || {}).chunkReason
        ? IS_PROD
          ? '[name].[contenthash:8].chunk.js'
          : '[name].chunk.js'
        : IS_PROD
        ? '[name].[contenthash:8].js'
        : '[name].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.json', useTypescript && '.ts', useTypescript && '.tsx'].filter(Boolean),
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx|css)$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      useTypescript && {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: '@ts-tools/webpack-loader',
        options: {
          cache: IS_DEV,
          cacheDirectoryPath: `${paths.nodeModules}/.cache/${process.env.NODE_ENV}`,
          transformers: {
            before: [USE_FAST_REFRESH && ReactRefreshTypeScript()].filter(Boolean),
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
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: IS_DEV,
              compact: IS_PROD,
              plugins: [USE_FAST_REFRESH && require.resolve('react-refresh/babel')].filter(Boolean),
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
    new CopyPlugin({
      patterns: [
        fs.existsSync(paths.public) && {
          from: paths.public,
          to: './',
          noErrorOnMissing: true,
        },
        {
          from: path.join(paths.root, 'keycloak.json'),
          to: './',
          transform(content) {
            return jsonMerge(content, {
              'auth-server-url': `${process.env.KEYCLOAK_URL || process.env.DEFAULT_KEYCLOAK_URL}`,
              realm: `${process.env.KEYCLOAK_REALM || process.env.DEFAULT_KEYCLOAK_REALM}`,
            });
          },
          noErrorOnMissing: true,
        },
        // Copies of robots.txt and manifest.json are deprected, should be moved to public folder
        {
          from: path.join(paths.src, 'robots.txt'),
          to: './',
          noErrorOnMissing: true,
        },
        {
          from: path.join(paths.src, 'manifest.json'),
          to: './',
          noErrorOnMissing: true,
        },
      ].filter(Boolean),
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
        async: IS_DEV,
        typescript: {
          typescriptPath: resolve.sync('typescript', {
            basedir: paths.nodeModules,
          }),
          configOverwrite: {
            compilerOptions: {
              sourceMap: true,
              skipLibCheck: true,
              inlineSourceMap: false,
              declarationMap: false,
              noEmit: true,
              incremental: true,
              tsBuildInfoFile: paths.tsBuildInfoFile,
            },
          },
          context: paths.appPath,
          diagnosticOptions: {
            syntactic: true,
          },
          mode: 'write-references',
        },
        issue: {
          // This one is specifically to match during CI tests,
          // as micromatch doesn't match
          // '../template/src/App.tsx'
          // otherwise.
          include: [{ file: '../**/src/**/*.{ts,tsx}' }, { file: '**/src/**/*.{ts,tsx}' }],
          exclude: [
            { file: '**/src/**/__tests__/**' },
            { file: '**/src/**/?(*.){spec|test|tests}.*' },
            { file: '**/src/setupProxy.*' },
            { file: '**/src/setupTests.*' },
          ],
        },
        logger: {
          infrastructure: 'silent',
        },
      }),
  ].filter(Boolean),
});
