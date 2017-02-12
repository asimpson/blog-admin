'use strict';

const sql = require('sqlite3');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const App = require('./app');
const template = require('./template');
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');

const s3 = new aws.S3({ region: 'us-east-1' });

const makeIndex = data => new Promise((resolve, reject) => {
  const params = {
    Bucket: process.env.bucket,
    Body: data,
    Key: 'index',
  };

  s3.putObject(params, (indexErr, uploadData) => {
    if (indexErr) {
      reject(indexErr);
    }

    if (uploadData) {
      resolve(uploadData);
    }
  });
});

const writePages = (cb, page, title, data) => new Promise((resolve, reject) => {
  const ele = React.createElement(App.app, { component: 'list', data });
  const html = ReactDOMServer.renderToString(ele);
  const perma = '';
  const desc = 'The design and development log of Adam Simpson.';
  const params = {
    Bucket: process.env.bucket,
    Body: template(title, desc, html, perma),
    Key: `page/${page}`,
  };

  s3.putObject(params, (err, uploadData) => {
    if (err) {
      reject(err);
    }

    if (uploadData) {
      resolve(uploadData);
    }
  });
});

const buildIndexPages = (event, context, callback) => {
  const buildSteps = [];

  s3.getObject({
    Bucket: 'ams-admin',
    Key: 'BLOG',
  }, (err, data) => {
    if (err) {
      callback(err);
    }

    fs.writeFileSync('/tmp/BLOG', data.Body);
    const dbFile = path.join('/tmp/BLOG');
    const db = new sql.Database(dbFile);

    db.all('SELECT * from posts', (dbErr, dbData) => {
      const posts = dbData.map(x => ({
        excerpt: x.excerpt,
        slug: x.slug,
        date: x.pub_date,
        title: x.title,
      })).reverse();

      const pages = Math.ceil((posts.length) / 10);

      for (let i = 0; i <= pages; i += 1) {
        let segment;
        let postData = {};

        if (i === 0) {
          segment = posts.slice(0, (i + 10));
          postData = {
            posts: segment,
            total: posts.length,
            current: i,
          };

          const ele = React.createElement(App.app, { component: 'list', data: postData });
          const home = ReactDOMServer.renderToString(ele);
          const temp = template('adamsimpson.net', 'The design and development log of Adam Simpson.', home, '');
          buildSteps.push(makeIndex(temp));
        } else {
          segment = posts.slice((i * 10), (i * 10) + 10);

          if (segment.length) {
            postData = {
              posts: segment,
              total: posts.length,
              current: i,
            };

            buildSteps.push(writePages(callback, i, 'adamsimpson.net', postData));
          }
        }
      }
      if (dbErr) {
        callback(dbErr);
      } else {
        Promise.all(buildSteps)
        .then(() => callback(null, 'build done'))
        .catch(x => callback(x));
      }
    });
  });
};


exports.handler = buildIndexPages;
