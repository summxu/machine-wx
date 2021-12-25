/*
 * @Auth: Chenxu
 * @Date: 2020-01-17 15:28:35
 * @LastEditTime: 2021-12-25 09:41:24
 */
const autoprefixer = require("autoprefixer");
const pxtoviewport = require("postcss-px-to-viewport");

module.exports = {
  publicPath: "/",
  filenameHashing: false,
  css: {
    extract: false,
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtoviewport({
            viewportWidth: 375, // (Number) The width of the viewport.
            viewportHeight: 667, // (Number) The height of the viewport.
            unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
            viewportUnit: "vw", // (String) Expected units.
            selectorBlackList: [".ignore", ".hairlines"], // (Array) The selectors to ignore and leave as px.
            minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
            mediaQuery: true, // (Boolean) Allow px to be converted in media queries.
            exclude: /(\/|\\)(node_modules)(\/|\\)/
          })
        ]
      }
    }
  },
  devServer: {
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: "http://101.34.41.251:9000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api"
        }
      },
    }
  }
};