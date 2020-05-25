const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Timestamp = new Date().getTime();
module.exports = {
  publicPath: "./",
  assetsDir: "static",
  filenameHashing: true,
  productionSourceMap: process.env.NODE_ENV !== "production",
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       // 定义全局变量，任何文件都可拿到
  //       data: `
  //       @import "@/assets/style/public.scss";
  //       `
  //     }
  //   }
  // },
  configureWebpack: {
    // webpack 配置
    output: {
      // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `static/js/[name].${Timestamp}.js`,
      chunkFilename: `static/js/[name].${Timestamp}.js`
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `static/css/[name].${Timestamp}.css`,
        chunkFilename: `static/css/[name].${Timestamp}.css`
      })
    ]
  },
  // 修改打包后img文件名
  // chainWebpack: config => {
  //   config.module.rule('images')
  //     .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
  //     .use('image-webpack-loader')
  //     .loader('image-webpack-loader')
  //     .options({
  //       bypassOnDebug: true,
  //       name: `static/img/[name].${Timestamp}.[ext]`
  //     })
  //   config.module
  //     .rule("images")
  //     .use("url-loader")
  //     .loader("url-loader")
  //     .tap(options => {
  //       return {
  //         limit: 4096,
  //         fallback: {
  //           loader: "file-loader",
  //           options: {
  //             name: `static/img/[name].${Timestamp}.[ext]`
  //           }
  //         }
  //       };
  //     });
  // },
  devServer: {
    proxy: {
      // 配置跨域
      "/api": {
        // 要访问的跨域的api的域名
        target: "http://1.71.190.139:8081",
        changOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": "/" // 重写,
        }
      }
    }
  },
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require("postcss-px2rem")({
            // 把px单位换算成rem单位
            remUnit: 32
          })
        ]
      }
    }
  },
  //提取公共模块
  chainWebpack: (config) => {
    config
        .optimization
        .splitChunks({
            chunks: "all",
            maxInitialRequests: Infinity,
            minSize: 80 * 1024,
            minChunks: 1,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: function (module, chunks, chacheGroupKey) {
                        const packageName = module.context.match(
                            /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                        )[1];
                        return `vendor_${packageName.replace("@", "")}`;
                    }
                }
            }
        });
},
};
