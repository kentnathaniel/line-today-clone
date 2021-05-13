const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/id/portaljson", {
      target: "https://today.line.me/id/portaljson",
      secure: false,
      changeOrigin: true,
      prependPath: false
    })
  );
}