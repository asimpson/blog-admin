'use strict';

const sql = require('sqlite3');
const fs = require('fs');
const aws = require('aws-sdk');

const BLOG = '/tmp/BLOG';
const s3 = new aws.S3({ region: 'us-east-1' });

const returnPosts = (event, context, cb) => {
  s3.getObject({
    Bucket: 'ams-admin',
    Key: 'BLOG',
  }, (err, data) => {
    if (err) {
      cb(JSON.stringify(err));
    }

    fs.writeFileSync(BLOG, data.Body);
    const db = new sql.Database(BLOG);

    db.all('SELECT * from posts', (e, d) => {
      if (e) {
        cb(JSON.stringify(e));
      } else {
        cb(null, JSON.stringify(d));
      }
    });
  });
};

exports.handler = returnPosts;
