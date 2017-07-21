const path = require('path');
const fs = require('fs');

module.exports = {
  entry: {
    admin: './packages/node_modules/Admin.js',
    search: './packages/node_modules/Search.js',
  },
  output: {
    path: path.resolve('./js'),
    filename: './[name].[chunkhash].js',
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
  plugins: [
    function() {
      this.plugin('done', stats => {
        const hashFile = path.join(__dirname, 'webpack-hash.json');
        const { assetsByChunkName } = stats.toJson();
        fs.writeFileSync(hashFile, JSON.stringify(assetsByChunkName));
      });
    },
  ],
};
