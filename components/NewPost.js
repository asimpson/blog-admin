import React, { Component } from 'react';
import moment from 'moment';
import marked from 'marked';
import Preview from './Frame';
import template from './template';

export default class NewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      excerpt: '',
      body: '',
      html: '',
      slug: '',
    };

    this.publish = this.publish.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.renderPreview = this.renderPreview.bind(this);
    this.excerptChange = this.excerptChange.bind(this);
    this.slugChange = this.slugChange.bind(this);
  }

  titleChange(e) {
    this.setState({ title: e.target.value }, () => (this.renderPreview()));
  }

  publish(e) {
    e.preventDefault();
    const payload = {
      title: this.state.title,
      excerpt: this.state.excerpt,
      post: this.state.body,
      slug: this.state.slug,
      date: moment().format('YYYY-MM-DD HH:mm:ss'),
      mod_date: moment().format('YYYY-MM-DD HH:mm:ss'),
    };

    const post = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    fetch('https://9h6llisbo1.execute-api.us-east-1.amazonaws.com/prod/publish', post)
    .then(x => x.json())
    .then(() => {
      this.setState({
        title: '',
        excerpt: '',
        body: '',
        html: '',
        slug: '',
      });
    });
  }

  excerptChange(e) {
    this.setState({ excerpt: e.target.value });
  }

  slugChange(e) {
    this.setState({ slug: e.target.value });
  }

  renderPreview() {
    const body = marked(this.body.value);
    const html = template(this.state.title, body);

    this.setState({ html, body });
  }

  render() {
    return (
      <form onSubmit={this.publish}>
        <div>
          <label>
            Title
            <input onChange={this.titleChange} type="text" />
          </label>
        </div>
        <div>
          <label>
            Excerpt
            <input onChange={this.excerptChange} type="text" />
          </label>
        </div>
        <div>
          <label>
            Slug
            <input onChange={this.slugChange} type="text" />
          </label>
        </div>
        <div>
          <label>
            Post
            <textarea onChange={this.renderPreview} ref={(ele) => { this.body = ele; }} />
          </label>
        </div>
        <div>
          <input name="publish" type="submit" value="Publish" />
        </div>
        <Preview css="https://adamsimpson.net/css/base-da17be6277.css" html={this.state.html} />
      </form>
    );
  }
}
