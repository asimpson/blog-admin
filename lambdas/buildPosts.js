const sql = require('sqlite3');
const path = require('path');
const fs = require('fs');
const React = require('react');
const App = require('./components/App');
const template = require('./template');

const dbFile = path.join(__dirname, './BLOG');
const db = new sql.Database(dbFile);
const ReactDOMServer = require('react-dom/server');

const writePosts = (data) => {
  const html = ReactDOMServer.renderToString(<App component={process.argv[2]} data={data} />);
  const perma = data.slug;
  const desc = data.excerpt || 'The design and development log of Adam Simpson.';
  fs.writeFileSync(`./site/writing/${perma}.html`, template(data.title, desc, html, perma));
};

const renderPosts = () => {
  db.all('SELECT * from posts', (e, d) => d.forEach(x => writePosts(x)));
};
