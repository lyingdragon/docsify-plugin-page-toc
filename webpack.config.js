const path = require('path');

module.exports = {
  entry: './src/page-toc.js',
  output: {
    filename: 'docsify-page-toc.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};
