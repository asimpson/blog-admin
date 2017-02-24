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

const updatePost = (event, context, cb) => {
  s3.getObject({
    Bucket: 'ams-admin',
    Key: 'BLOG',
  }, (err, data) => {
    if (err) {
      cb(JSON.stringify(err));
    }

    fs.writeFileSync(BLOG, data.Body);
    const db = new sql.Database(BLOG);

    db.run('UPDATE posts SET title = $title, mod_date = $mod_date, slug = $slug, excerpt = $excerpt, content = $content WHERE id = $id', {
      $title: event.title,
      $mod_date: event.mod_date,
      $slug: event.slug,
      $excerpt: event.excerpt,
      $content: event.post,
      $id: event.id,
    }, function runCallback(e) {
      if (e) {
        cb(JSON.stringify(e));
      } else {
        persistDB(cb, this);
      }
    });
  });
};

exports.handler = updatePost;
