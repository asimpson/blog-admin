'use strict';

const sql = require('sqlite3');
const path = require('path');
const fs = require('fs');
const React = require('react');
const App = require('./app');
const aws = require('aws-sdk');
const template = require('./template');

const s3 = new aws.S3({ region: 'us-east-1' });
const ReactDOMServer = require('react-dom/server');

const writePosts = data => new Promise((done, reject) => {
  const ele = React.createElement(App.app, { component: 'post', data });
  const html = ReactDOMServer.renderToString(ele);
  const perma = data.slug;
  const desc = data.excerpt || 'The design and development log of Adam Simpson.';

  const params = {
    Bucket: process.env.bucket,
    Body: template(data.title, desc, html, perma),
    Key: `writing/${perma}`,
  };

  s3.putObject(params, (err, uploadData) => {
    if (err) {
      reject(err);
    }

    if (uploadData) {
      done(uploadData);
    }
  });
});

const renderPosts = (event, context, cb) => {
  const posts = [];

  s3.getObject({
    Bucket: 'ams-admin',
    Key: 'BLOG',
  }, (err, data) => {
    if (err) {
      cb(err);
    }

    fs.writeFileSync('/tmp/BLOG', data.Body);
    const dbFile = path.join('/tmp/BLOG');
    const db = new sql.Database(dbFile);
    db.all('SELECT * from posts', (e, d) => d.forEach(x => posts.push(writePosts(x))));

    Promise.all(posts)
    .then(() => cb(null, 'posts built!'))
    .catch(promiseErr => cb(`error ${promiseErr}`));
  });
};

exports.handler = renderPosts;
