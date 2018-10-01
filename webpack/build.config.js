const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    app: './src/js/index.js'
  },
  output: {
    path: path.resolve('./build/js'),
    filename: 'app.js'
  }
};
