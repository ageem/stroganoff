module.exports = {
  webpack: (config, { isServer }) => {
    // Disable source maps in production
    if (!isServer) {
      config.devtool = false;
    }

    // Ignore source map warnings
    config.ignoreWarnings = [/Failed to parse source map/];

    return config;
  },
  productionBrowserSourceMaps: false,
} 