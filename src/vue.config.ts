// vue.config.js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.intern.d-tt.nl',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
}
