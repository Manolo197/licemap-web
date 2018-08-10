const proxy = [
    {
      context: '/api',
      target: 'http://localhost:4000',
      pathRewrite: {'^/api' : ''}
    }
  ];
  module.exports = proxy;