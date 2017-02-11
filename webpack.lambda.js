module.exports = {
  entry: './components/App.js',
  output: {
    filename: './app.js',
    library: 'app',
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
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015', 'react'] },
        }],
      },
    ],
  },
};
