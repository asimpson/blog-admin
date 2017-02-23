'use strict';

const aws = require('aws-sdk');
const globby = require('globby');
const fs = require('fs');
const path = require('path');
const type = require('content-type-mime');

const s3 = new aws.S3({ region: 'us-east-1' });

const clear = () => {
  const cf = new aws.CloudFront();
  const params = {
    DistributionId: process.env.ID,
    InvalidationBatch: {
      CallerReference: `${Date.now()}`,
      Paths: {
        Quantity: 1,
        Items: [
          '/admin',
        ],
      },
    },
  };

  cf.createInvalidation(params, (err, data) => {
    if (err) console.log(err, err.stack);
    else console.log('🚀', data);
  });
};

const upload = file => new Promise((resolve, reject) => {
  let Key;
  const Body = fs.readFileSync(file);

  if (/html/.test(file)) {
    Key = path.basename(file, '.html');
  } else {
    Key = file;
  }


  const params = {
    Bucket: process.env.bucket,
    ContentType: type(file),
    ACL: 'public-read',
    Key,
    Body,
  };

  s3.putObject(params, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  });
});

const deploy = () => {
  const files = globby.sync(['dist*.js', 'admin.html']);
  const tasks = files.map((x => upload(x)));
  Promise.all(tasks).then(() => clear());
};

deploy();
