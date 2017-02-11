var React = require('react');
var moment = require('moment');
var _ = require("lodash");
var Comment = null;

const Post = React.createClass({

  submitWebmention: function(e) {
    e.preventDefault();
    var self = this;
    var data = "ajax=true&source="+React.findDOMNode(self.refs.sourceInput).value+"&target="+React.findDOMNode(self.refs.targetInput).value;
    var requestComments = rest({
      path: env.API+'/webmention',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      entity: data
    }).then(function(response) {
      if (response.status.code === 409) {
        self.setState({commentStatus: 'This comment is a duplicate of a comment already submitted.'});
      }
      if (response.status.code === 202) {
        self.setState({commentStatus: 'Thanks for your comment!'});
      }
      if (response.status.code === 400) {
        self.setState({commentStatus: "Uhoh, something's broken"});
      }
    });
  },
  fetchComments: function(e) {
    e.preventDefault();
    var self = this;
    var id = _.map(this.props.data, 'id')[0];
    var requestComments = rest(env.API+'/wp-json/posts/'+id+'/comments').then(function(response) {
      var comments = JSON.parse(response.entity);
      self.setState({comments: comments});
    });
  },
  getInitialState: function() {
    return {
      comments: [],
      commentStatus: ''
    };
  },
  render: function() {
    var formattedDate = moment(this.props.data.pub_date).format("MMM Do[,] YYYY");
    var modifiedDate = moment(this.props.data.mod_date).format("MMM Do[,] YYYY, h:mm:ss a");
    var postUrl = "https://adamsimpson.net/writing/"+this.props.data.slug;

    return (
    <div>
      <article className="h-entry pl-max-width">
        <div className="sp_top">
          <h1 className="p-name tx-title sp_none">{this.props.data.title}</h1>
          <div className="post-date post-date__full-post">
            <span className="home-link">
              <a href="/">Home</a> |
            </span>
            <time className="dt-published" dateTime={this.props.data.pub_date}>{formattedDate}</time>
            <div className="post-modified-date">
              Last Modified:
              <time className="modified-date dt-updated" dateTime={this.props.data.mod_date}>{modifiedDate}</time>
            </div>
          </div>
          <div className="e-content" dangerouslySetInnerHTML={{ __html: this.props.data.content }} />
        </div>
      </article>
    </div>
    );
  }
});

module.exports = Post;
