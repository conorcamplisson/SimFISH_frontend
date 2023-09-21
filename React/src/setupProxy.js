const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/websocket', {
      target: 'ws://localhost:6997',
    })
  )
  app.use(
    createProxyMiddleware('/autoreload', {
      target: 'ws://localhost:6997',
    })
  )
}
