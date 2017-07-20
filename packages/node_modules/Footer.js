const React = require('react');

const Footer = React.createClass({
  render() {
    return (
      <div className="footer-wrapper">
        <div className="footer-info pl-max-width">
          <a className="footer-feed-link" href="/rss.xml">Post Feed</a>
          <span className="seperator">|</span>
          <a className="footer-feed-link" href="http://api.adamsimpson.net/feed/?post_type=notes">Notes Feed</a>
          <div className="footer-made">
            Made with <a href="http://wordpress.org">WordPress</a> and hosted on <a href="https://chunkhost.com/r/46012">Chunkhost</a>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Footer;
