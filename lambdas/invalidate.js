'use strict';

const aws = require('aws-sdk');

const cf = new aws.CloudFront();
const s3 = new aws.S3({ region: 'us-east-1' });

const getPageObjects = () => new Promise((resolve, reject) => {
  const params = {
    Bucket: 'ams-blog',
    Prefix: 'page',
  };

  s3.listObjects(params, (err, data) => {
    if (err) {
      reject(err);
    } else {
      const names = data.Contents.map(x => `/${x.Key}`);
      resolve(names);
    }
  });
});

const invalidate = (event, con, cb) => {
  getPageObjects().then((x) => {
    const eventItems = JSON.parse(event.items);
    eventItems.forEach(y => x.push(y));
    const Items = x;
    const params = {
      DistributionId: process.env.ID,
      InvalidationBatch: {
        CallerReference: `${Date.now()}`,
        Paths: {
          Quantity: Items.length,
          Items,
        },
      },
    };

    cf.createInvalidation(params, (err, data) => {
      if (err) cb(JSON.stringify(err.stack));
      else cb(null, data);
    });
  })
  .catch(x => cb(JSON.stringify(x.stack)));
};

exports.handler = invalidate;
