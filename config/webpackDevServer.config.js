module.exports = {
  // ... other config options ...
  allowedHosts: 'all',
  proxy: {
    '/mint-nft-to-detail': {
      target: 'https://stromzaehler-nft.yanacocha.fit.fraunhofer.de',
      changeOrigin: true,
      secure: false,
    },
  },
}; 