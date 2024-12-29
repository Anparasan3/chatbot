const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const svgLoader = {
  test: /\.svg$/,
  use: ['@svgr/webpack', 'file-loader'],
};
module.exports = {
  entry: './src/main.jsx', // Entry point
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'chatbot.bundle.js', // Output bundle file
    clean: true, // Clean the dist folder on each build
    library: 'chatbot',
    libraryTarget: 'umd',
    libraryExport: 'app'
  },
  mode: 'development', // Development mode
  devServer: {
    static: path.resolve(__dirname, 'public'), // Serve static files
    port: 3000, // Development server port
    open: true, // Open browser automatically
  },
  module: {
    rules: [
      svgLoader,
      {
        test: /\.js$/, // Process JavaScript files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Use Babel presets
          },
        },
      },
      {
        test: /\.css$/, // Process CSS files
        use: ['style-loader', 'css-loader', 'postcss-loader'], // CSS and Style loaders
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i, // Process image files
        type: 'asset/resource', // Use Webpack's asset modules
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Use a template for HTML
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve JS and JSX files
  },
};




// const path = require("path");
// const webpack = require("webpack")
// const TerserPlugin = require("terser-webpack-plugin");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// // const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const ImageminPlugin = require("imagemin-webpack");
// // const postcssPrefixer = require("postcss-prefixer");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const Dotenv = require('dotenv-webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


// const ROOT = path.resolve(__dirname, "src");
// // const NLP_DIRNAME = "nlp";
// const ASSETS_DIRNAME = "assets";
// const MODELS_DIRNAME = "models";
// const TASKS_DIRNAME = "tasks";

// const INTENT_CLASSIFICATION_DIRNAME = "intent-classification";
// const OUTPUT_PATH = path.resolve(__dirname, "../build/chat");

// const BOTONIC_PATH = path.resolve(__dirname, "templates");

// const WEBPACK_MODE = {
//   DEVELOPMENT: "development",
//   PRODUCTION: "production",
// };

// const WEBPACK_ENTRIES_DIRNAME = "webpack-entries";


// const UMD_LIBRARY_TARGET = "umd";
// // library & filename should be different for widget, landing, embed

// const WEBCHAT_FILENAME = "webchat.WeConnect.js";
// const BOTONIC_LIBRARY_NAME = "WeConnect";

// function sourceMap(mode) {
//   if (mode === WEBPACK_MODE.PRODUCTION) return "hidden-source-map";
//   else if (mode === WEBPACK_MODE.DEVELOPMENT) return "eval-cheap-source-map";
//   else
//     throw new Error(
//       "Invalid mode argument (" + mode + "). See package.json scripts"
//     );
// }

// const optimizationConfig = {
//   minimize: true,
//   minimizer: [
//     new TerserPlugin({
//       parallel: true,
//       terserOptions: {
//         keep_fnames: true,
//       },
//     }),
//   ],
//   // moduleIds: 'hashed',
//   // splitChunks: {
//   //     cacheGroups: {
//   //         default: false,
//   //         vendors: false,
//   //         // vendor chunk
//   //         vendor: {
//   //             name: 'vendor',
//   //             // async + async chunks
//   //             chunks: 'all',
//   //             // import file path containing node_modules
//   //             test: /node_modules/,
//   //             priority: 20
//   //         },

//   //       }  }
// };

// const resolveConfig = {
//   extensions: ["*", ".js", ".jsx", ".ts", ".tsx", ".mjs"],
//   alias: {
//     react: path.resolve(__dirname, "node_modules", "react"),
//     "styled-components": path.resolve(
//       __dirname,
//       "node_modules",
//       "styled-components"
//     ),
//     '@mui/styled-engine': '@mui/styled-engine-sc',
//   },
//   fallback: {
//     util: require.resolve("util"),
//   },
// };

// const babelLoaderConfig = {
//   test: /\.(js|jsx|ts|tsx|mjs)$/,
//   exclude: /node_modules\/(?!@botonic)/,
//   use: {
//     loader: "babel-loader",
//     options: {
//       sourceType: "unambiguous",
//       cacheDirectory: true,
//       presets: [
//         "@babel/react",
//         [
//           "@babel/preset-env",
//           {
//             modules: false,
//           },
//         ],
//       ],
//       plugins: [
//         "@babel/plugin-proposal-object-rest-spread",
//         "@babel/plugin-proposal-class-properties",
//         "@babel/plugin-transform-runtime",
//       ],
//     },
//   },
// };

// function fileLoaderConfig(outputPath) {
//   return {
//     test: /\.(jpe?g|png|gif)$/i,
//     use: [
//       {
//         loader: "file-loader",
//         options: {
//           outputPath: outputPath,
//         },
//       },
//     ],
//   };
// }

// const nullLoaderConfig = {
//   test: /\.(scss|css)$/,
//   use: "null-loader",
// };

// const stylesLoaderConfig = {
//   test: /\.(scss|css)$/,
//   use: [
//     {
//       loader: "style-loader",
//       options: {
//         insert: function (element) {
//           if (!window._botonicInsertStyles) window._botonicInsertStyles = [];
//           window._botonicInsertStyles.push(element);
//         },
//       },
//     },
//     // {
//     //   loader: "css-loader",
//     //   options: {
//     //     // modules: true,
//     //     // importLoaders: 1,
//     //     // localIdentName: "sss[name][local][hash:base64]",
//     //     // sourceMap: true,
//     //     // minimize: true,
//     //     modules: {
//     //       // mode: "local",
//     //       // auto: true,
//     //       // exportGlobals: true,
//     //       // localIdentName: "sss[path][name]__[local]--[hash:base64:5]",
//     //       // localIdentContext: path.resolve(__dirname, "src"),
//     //       // localIdentHashPrefix: "my-custom-hash",
//     //       // namedExport: true,
//     //       // exportLocalsConvention: "camelCase",
//     //       // exportOnlyLocals: false,
//     //     },
//     //   },
//     // },
//     {
//       loader: MiniCssExtractPlugin.loader,
//       options: {
//         esModule: false,
//       },
//     },
//     "css-loader",
//     // {
//     //   loader: "postcss-loader",
//     //   options: {
//     //     postcssOptions: {
//     //       plugins: [
//     //         postcssPrefixer({
//     //           prefix: "tui-full-calendar-",
//     //         }),
//     //       ],
//     //     },
//     //   },
//     // },
//     "sass-loader",
//     // {
//     //   loader: "postcss-prefixer",
//     //   options: {
//     //     prefix: "prefix-",
//     //   },
//     // },
//   ],
// };

// const jsonLoader = {
//   test: /\.json$/,
//   use: ['json-loader'],
//   type: 'javascript/auto'
// };

// const svgLoader = {
//   test: /\.svg$/,
//   use: ['@svgr/webpack', 'file-loader'],
// };

// // const cssPrefixer = {
// //   test: /\.(scss|css)$/,
// //   use: [
// //     {
// //       loader: "react-classname-prefix-loader-with-lookup",
// //       options: {
// //         prefix: "prefix-",
// //       },
// //     },
// //   ],
// // };

// const imageminPlugin = new ImageminPlugin({
//   bail: false,
//   cache: false,
//   imageminOptions: {
//     plugins: [
//       ["imagemin-gifsicle", { interlaced: true }],
//       ["imagemin-jpegtran", { progressive: true }],
//       ["imagemin-optipng", { optimizationLevel: 5 }],
//     ],
//   },
// });


// function botonicWidgetConfig() {
//   return {
//     stats: {
//       // Display bailout reasons
//       optimizationBailout: true,
//       performance: true,
//     },
//     // mode: mode,
//     // devtool: sourceMap(mode),
//     // devtool: "source-map",
//     entry: path.resolve(WEBPACK_ENTRIES_DIRNAME, 'widget-entry.js'),
//     target: "web",
//     module: {
//       rules: [
//         babelLoaderConfig,
//         svgLoader,
//         fileLoaderConfig(ASSETS_DIRNAME),
//         stylesLoaderConfig,
//         jsonLoader
//       ],
//     },
//     output: {
//       filename: WEBCHAT_FILENAME,
//       library: BOTONIC_LIBRARY_NAME,
//       libraryTarget: "umd",
//       libraryExport: "app",
//       path: OUTPUT_PATH,
//     },
//     resolve: resolveConfig,
//     devServer: {
//       static: [OUTPUT_PATH],
//       liveReload: true,
//       historyApiFallback: true,
//       hot: true,
//     },
//     plugins: [
//       new MiniCssExtractPlugin(),
//       // new BundleAnalyzerPlugin(),
//       new HtmlWebpackPlugin({
//         template: path.resolve(BOTONIC_PATH, "src", 'webchat.template.html'),
//         filename: "index.html",
//       }),
//       new webpack.HotModuleReplacementPlugin(),
//       imageminPlugin,
//       // new webpack.DefinePlugin({
//       //   IS_BROWSER: true,
//       //   IS_NODE: false,
//       //   HUBTYPE_API_URL: JSON.stringify(process.env.HUBTYPE_API_URL),
//       //   ...(mode === "development"
//       //     ? { MODELS_BASE_URL: JSON.stringify("http://localhost:8080") }
//       //     : {}),
//       // }),
//       new webpack.ProvidePlugin({
//         process: "process/browser",
//       }),
//       new Dotenv({
//         path: path.resolve(__dirname, "../.env")
//       }),
//     ],
//   };
// }


// module.exports = function (env, argv) {
//   return [botonicWidgetConfig(argv.mode)];
// };


