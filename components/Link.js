var React = require('react');

const Link = React.createClass({
  render() {
    return (
      <a  {...props} href={this.props.to} />
    );
  }
});
