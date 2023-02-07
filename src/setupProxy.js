const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://agora-token-service-production-f87a.up.railway.app",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
      changeOrigin: true,
    })
  );
};
