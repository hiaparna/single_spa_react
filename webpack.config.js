const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: {
    'coreshell-application':  'src/core-shell.js',
    'navbarpg':  'src/core/navbar/navbar.app.js',
    'dashboardpg':  'src/core/dashboard/dashboard.app.js'
  },
  output: {
    publicPath: '/dist/',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
	 rules: [{
        test: /\.js?$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader'
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
      },{
            test: /\.(woff(2)?|eot|otf|ttf|svg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: {
              loader: 'file-loader',
              options: {
                outputPath: 'fonts/'
              }
            }
        }
    ],
  },
  node: {
    fs: 'empty'
  },
  resolve: {
	modules: [
      __dirname,
      'node_modules',
    ],
    alias: {
    	serviceHelpers : path.resolve(__dirname, 'src/common/js/utils/servicehelpers.js')
    	
    }
  },
  optimization: {
    splitChunks: {
      name: 'common-dependencies.js'
    },
  },
  plugins: [
    new CleanWebpackPlugin(['dist'])
  ],
  devtool: 'source-map',
  externals: [{
	    jquery: 'jQuery'
  }],
  devServer: {
    writeToDisk: true,
    historyApiFallback: true
  }
};
