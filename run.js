'use strict';

const aws = require('aws-sdk');

const [, , FunctionName] = process.argv;
const secrets = require('./config.js');

const lambda = new aws.Lambda({ region: 'us-east-1' });
const cf = new aws.CloudFront();

const clear = () => {
  const cfParams = {
    DistributionId: secrets.cf,
    InvalidationBatch: {
      CallerReference: `${Date.now()}`,
      Paths: {
        Quantity: 1,
        Items: ['/*'],
      },
    },
  };

  cf.createInvalidation(cfParams, (err, data) => {
    if (err) {
      console.log(`🔥 Error running: ${err}`);
    } else {
      console.log(`✅ Done: ${JSON.stringify(data)}`);
    }
  });
};

lambda.invoke({ FunctionName }, (err, data) => {
  if (err) {
    console.log(`🔥 Error running: ${JSON.stringify(err)}`);
  } else {
    console.log(`✅ Ran: ${JSON.stringify(data)}`);
    clear();
  }
});
