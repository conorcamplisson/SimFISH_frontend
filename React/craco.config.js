const path = require('path')
module.exports = {
  devServer: {
    devMiddleware: {
      writeToDisk: (filePath) => {
        return !filePath.includes('hot-update')
      },
    },
    host: '0.0.0.0',
    port: 6996,
  },
}
