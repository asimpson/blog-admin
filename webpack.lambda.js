const path = require('path');

module.exports = {
  entry: './packages/node_modules/App.js',
  output: {
    filename: './react-app.js',
    path: path.resolve('./packages/node_modules/'),
    library: 'react-app',
    libraryTarget: 'commonjs',
  },
  externals: {
    react: {
      commonjs: 'react',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: `${path.resolve(__dirname)}/node_modules`,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['es2015', 'react'] },
          },
        ],
      },
    ],
  },
};
