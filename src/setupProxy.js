const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // In development, this will proxy requests to our serverless function
  // In production, the actual serverless function will be used
  app.use(
    '/api/fred',
    createProxyMiddleware({
      target: 'https://api.stlouisfed.org',
      changeOrigin: true,
      pathRewrite: {
        '^/api/fred': '/fred/series/observations'
      },
      onProxyReq: (proxyReq, req) => {
        // Add the API key to the query parameters
        const url = new URL(proxyReq.path, 'https://api.stlouisfed.org');
        url.searchParams.append('api_key', process.env.REACT_APP_FRED_API_KEY);
        
        // Update the request path with the modified URL
        proxyReq.path = `${url.pathname}${url.search}`;
        
        console.log('Proxying request to:', proxyReq.path);
      },
      logLevel: 'debug'
    })
  );
};
