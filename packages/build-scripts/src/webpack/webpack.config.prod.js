import fs from 'fs';
import { merge } from 'webpack-merge';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import baseConfig from './webpack.config.base';
import paths from '../paths';

export default ({ useTypescript = false, ...config }) =>
  merge(
    baseConfig({ useTypescript }),
    {
      mode: 'production',
      optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({ parallel: true }), new CssMinimizerPlugin()],
      },
      plugins: [
        // Generate a service worker script that will precache, and keep up to date,
        // the HTML & assets that are part of the webpack build.
        fs.existsSync(paths.serviceWorker) &&
          new WorkboxWebpackPlugin.InjectManifest({
            swSrc: paths.serviceWorker,
            dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
            exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/],
            // Bump up the default maximum size (2mb) that's precached,
            // to make lazy-loading failure scenarios less likely.
            // See https://github.com/cra-template/pwa/issues/13#issuecomment-722667270
            maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
          }),
        new CompressionPlugin({ test: /\.js$|\.css$|\.html$/ }),
        new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false }), // static disabled
      ].filter(Boolean),
    },
    config
  );
