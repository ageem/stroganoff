module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Disable source map loading
      webpackConfig.module.rules = webpackConfig.module.rules.map(rule => {
        if (rule.use && rule.use.some(use => use.loader && use.loader.includes('source-map-loader'))) {
          rule.use = rule.use.map(use => {
            if (use.loader && use.loader.includes('source-map-loader')) {
              return { ...use, options: { ...use.options, ignore: ['**/*'] } };
            }
            return use;
          });
        }
        return rule;
      });
      
      return webpackConfig;
    },
  },
}; 