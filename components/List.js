var React = require('react');
var PostPagination = require('./PostPagination.js');
var ListItem = require('./ListItem.js');

const titleList = React.createClass({
  componentDidMount: function() {
    document.title = "adamsimpson.net";
    var meta = document.querySelectorAll('meta[name=description]');
    var canonical = document.querySelectorAll('link[rel=canonical]');
    meta[0].setAttribute("content", "The design and development log of Adam Simpson.");
    if (canonical.length) {
      canonical[0].parentNode.removeChild(canonical[0]);
    }
  },
  render: function() {
    var current = this.props.data.current;
    var total = this.props.data.total - 1;
    var pageInfo = {
      current: current,
      total: total
    };

    return (
      <div>
        <ListItem data={this.props.data.posts} />
        <PostPagination data={pageInfo} />
      </div>
    );
  }
});

module.exports = titleList;
