const React = require('react');
const PostPagination = require('./PostPagination.js');
const ListItem = require('./ListItem.js');

const titleList = React.createClass({
  componentDidMount() {
    document.title = 'adamsimpson.net';
    const meta = document.querySelectorAll('meta[name=description]');
    const canonical = document.querySelectorAll('link[rel=canonical]');
    meta[0].setAttribute('content', 'The design and development log of Adam Simpson.');
    if (canonical.length) {
      canonical[0].parentNode.removeChild(canonical[0]);
    }
  },
  render() {
    const current = this.props.data.current;
    const total = this.props.data.total - 1;
    const pageInfo = {
      current,
      total,
    };

    return (
      <div>
        <ListItem data={this.props.data.posts} />
        <PostPagination data={pageInfo} />
      </div>
    );
  },
});

module.exports = titleList;
