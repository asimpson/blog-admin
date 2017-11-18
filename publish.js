'use strict';
const fs = require('fs');
const shell = require('child_process').spawnSync;

const LAMBDA_LOCATION = './packages/node_modules/@lambdas';
const BUCKET = 'ams-admin';

fs
  .readdirSync(LAMBDA_LOCATION)
  .filter(x => !/\.DS_Store/.test(x))
  .forEach((file, step, array) => {
    const statement = `exports.handler = require('./packages/node_modules/@lambdas/${file}');`;
    const [name] = file.split('.');
    console.log(`${step + 1}/${array.length} Uploading ${name}...`);
    fs.writeFileSync(`${file}`, statement);
    const update = shell('deployless', [
      'update',
      `bucket=${BUCKET}`,
      `name=${name}`,
      `key=${name}.zip`,
      `file=${file}`,
      'webpack-hash.json',
      `./packages`,
    ]);
    console.log(update.stderr.toString());
    shell('rm', [`${file}.js`]);
  });
