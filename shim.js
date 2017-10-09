'use strict';
const fs = require('fs');

const [, , file] = process.argv;
const statement = `exports.handler = require('./packages/node_modules/@lambdas/${file}');`;
fs.writeFileSync(`${file}.js`, statement);
