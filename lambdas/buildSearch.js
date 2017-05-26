const sql = require('sqlite3');
const fs = require('fs');
const aws = require('aws-sdk');
const lunr = require('lunr');
const shell = require('child_process').spawnSync;

const BLOG = '/tmp/BLOG';
const INDEX = '/tmp/searchIndex.json';
const s3 = new aws.S3({ region: 'us-east-1' });

const saveIndex = (json, cb) => {
  fs.writeFileSync(INDEX, json);
  shell('gzip', ['-9', INDEX]);
  const Body = fs.readFileSync(`${INDEX}.gz`);

  const params = {
    Body,
    Bucket: process.env.bucket,
    ACL: 'public-read',
    ContentType: 'application/json',
    ContentEncoding: 'gzip',
    Key: 'searchIndex.json',
  };

  s3.putObject(params, (err, data) => {
    if (!err) {
      cb(null, data);
    } else {
      cb(err);
    }
  });
};

const buildSearch = (event, con, cb) => {
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
      const index = lunr(function() {
        this.ref('slug');
        this.field('title');
        this.field('content');

        d.forEach((doc) => {
          this.add(doc);
        }, this);
      });

      saveIndex(JSON.stringify(index), cb);
    });
  });
};

exports.handler = buildSearch;
