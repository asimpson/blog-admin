'use strict';

const sql = require('sqlite3');
const fs = require('fs');
const aws = require('aws-sdk');

const BLOG = '/tmp/BLOG';
const s3 = new aws.S3({ region: 'us-east-1' });

const persistDB = (cb, thisDb) => {
  const db = fs.readFileSync(BLOG);
  const params = {
    Bucket: 'ams-admin',
    Key: process.env.fileName,
    Body: db,
  };

  s3.putObject(params, (err) => {
    if (err) {
      cb(JSON.stringify(err));
    } else {
      cb(null, JSON.stringify(thisDb));
    }
  });
};

const newPost = (event, con, cb) => {
  s3.getObject({
    Bucket: 'ams-admin',
    Key: 'BLOG',
  }, (err, data) => {
    if (err) {
      cb(JSON.stringify(err));
    }

    fs.writeFileSync(BLOG, data.Body);
    const db = new sql.Database(BLOG);

    db.run('INSERT INTO posts VALUES($id, $title, $pub_date, $mod_date, $content, $slug, $status, $excerpt, $type)', {
      $id: null,
      $title: event.title,
      $pub_date: event.date,
      $mod_date: event.mod_date,
      $content: event.post,
      $slug: event.slug,
      $status: 'published',
      $excerpt: event.excerpt,
      $type: 'post',
    }, function newRun(insertErr) {
      if (insertErr) {
        cb(JSON.stringify(insertErr));
      } else {
        persistDB(cb, this);
      }
    });
  });
};

exports.handler = newPost;
