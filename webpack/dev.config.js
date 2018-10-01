const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/js/index.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../dist')
  },
  output: {
    // filename: '[name].app.js',
    path: path.resolve(__dirname, '../dist'),
    filename: 'app.js',
    publicPath: '/js'
  }
};
