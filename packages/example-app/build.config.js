const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  webpack: (config, { mode }) => {
    // `mode` has a value of 'development' or 'production'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Return the altered config
    if (mode === 'production') {
      return [
        {
          ...config,
          output: { ...config.output, path: path.join(__dirname, './dist/website') },
          plugins: [
            ...config.plugins,
            new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: true }), // static disabled
          ],
          buildFor: 'website',
        },
        {
          ...config,
          output: { ...config.output, path: path.join(__dirname, './dist/electron') },
          buildFor: 'electron',
        },
      ];
    }
    return { ...config, devServer: { ...config.devServer, port: 3000 } };
  },
};
