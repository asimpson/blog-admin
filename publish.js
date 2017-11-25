'use strict';

const fs = require('fs');
const shell = require('child_process').spawnSync;
const path = require('path');

const [, , target] = process.argv;
const LAMBDA_LOCATION = './packages/node_modules/@lambdas';
const BUCKET = 'ams-admin';

const prepare = file => {
  const statement = `exports.handler = require('./packages/node_modules/@lambdas/${file}');`;
  const [name] = file.split('.');
  fs.writeFileSync(`${file}`, statement);
  const update = shell('deployless', [
    'update',
    `bucket=${BUCKET}`,
    `name=${name}`,
    `key=${name}.zip`,
    `file=${file}`,
    'webpack-hash.json',
    './packages',
  ]);
  console.log(update.stderr.toString());
  shell('rm', [file]);
};

if (target) {
  prepare(path.basename(target));
} else {
  fs
    .readdirSync(LAMBDA_LOCATION)
    .filter(x => !/\.DS_Store/.test(x))
    .forEach((file, step, array) => {
      console.log(`${step + 1}/${array.length} Uploading ${name}...`);
      prepare(file);
    });
}
