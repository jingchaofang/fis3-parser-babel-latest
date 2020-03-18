var path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'none',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs',
  },
  externals: ['@babel/core']
};