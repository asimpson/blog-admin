import React, { Component } from 'react';

export default class Frame extends Component {
  componentDidMount() {
    this.frame.contentDocument.body.innerHTML = this.props.html;
    const head = this.frame.contentDocument.getElementsByTagName('head')[0];
    head.innerHTML = `<link rel="stylesheet" href="${this.props.css}" type="text/css"/>`;
  }

  componentWillUpdate(nextProps) {
    this.frame.contentDocument.body.innerHTML = nextProps.html;
  }

  render() {
    return <iframe ref={(ele) => { this.frame = ele; }} />;
  }
}

Frame.propTypes = {
  html: React.PropTypes.string.isRequired,
  css: React.PropTypes.string.isRequired,
};
