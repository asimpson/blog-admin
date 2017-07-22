module.exports = {
  plugins: [
    require('postcss-partial-import')({
      root: './css',
      prefix: '_',
    }),
    require('postcss-nested')(),
    require('cssnano')(),
  ],
};
