const aws = require('aws-sdk');
const fs = require('fs');

const s3 = new aws.S3({ region: 'us-east-1' });
const Key = '2f6b63a9ed76d41e6a4d889d4456d275';

const Body = fs.readFileSync(`${Key}.js`);
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
