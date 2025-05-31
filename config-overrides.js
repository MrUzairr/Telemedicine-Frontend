module.exports = function override(config) {
    config.watchOptions = {
      ignored: /node_modules/,
    };
    return config;
  };