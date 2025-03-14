const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    process: require.resolve("process/browser"),
    // You can add more polyfills here as necessary (e.g., util, buffer)
  };

  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: "process/browser", // polyfill for process
    }),
  ];

  return config;
};
