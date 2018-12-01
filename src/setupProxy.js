const proxy = require('http-proxy-middleware');

module.exports = function setup(app) {
  app.use(proxy('/api', { target: 'https://jsonplaceholder.typicode.com/' }));
};
