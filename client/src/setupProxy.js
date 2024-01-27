const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/oauth2/v2/userinfo",
    createProxyMiddleware({
      target: "https://www.googleapis.com",
      changeOrigin: true,
    })
  );
};