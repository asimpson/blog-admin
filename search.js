const aws = require('aws-sdk');
const fs = require('fs');

const s3 = new aws.S3({ region: 'us-east-1' });
const search = JSON.parse(fs.readFileSync('./webpack-hash.json').toString());
const Key = search.search;

const Body = fs.readFileSync(`./js/${Key}.js`);
const params = {
  Body,
  Key: `js/${Key}.js`,
  Bucket: process.env.bucket,
  ContentType: 'text/javascript',
  ACL: 'public-read',
};

s3.putObject(params, (err, data) => {
  if (!err) {
    console.log(data);
  } else {
    console.log(err);
  }
});
