const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://agora-token-service-production-f87a.up.railway.app",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};