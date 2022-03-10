import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
// import ExtReloader from 'webpack-ext-reloader'
import { VueLoaderPlugin } from 'vue-loader'
import { Configuration } from 'webpack'
import { resolve } from 'path'

export default <Configuration>{
  entry: {
    content: resolve(__dirname, 'src/content.ts'),
    background: resolve(__dirname, 'src/background.ts'),
    popup: resolve(__dirname, 'src/popup/index.ts'),
    options: resolve(__dirname, 'src/options/index.ts'),
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'ts',
          target: 'es2015',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          reactivityTransform: true,
          enableTsInTemplate: true,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    // new ExtReloader(),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: resolve(__dirname, 'src/static') }],
    }),
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      inject: false,
      templateParameters: {
        js: 'popup.js',
      },
    }),
    new HtmlWebpackPlugin({
      filename: 'options.html',
      inject: false,
      templateParameters: {
        js: 'options.js',
      },
    }),
  ],
}
