const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/mint-nft-to-detail',
    createProxyMiddleware({
      target: 'https://stromzaehler-nft.yanacocha.fit.fraunhofer.de',
      changeOrigin: true,
      secure: false,
    })
  );
}; 