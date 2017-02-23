import React, { Component } from 'react';
import moment from 'moment';
import marked from 'marked';
import toHTML from 'to-markdown';
import Preview from './Frame';
import template from './template';
import publishPost from './publish';
import editPost from './edit';
import { clearCache, buildPosts, buildIndex } from './posts';

export default class NewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      excerpt: '',
      body: '',
      html: '',
      posts: [],
      id: '',
      editing: false,
      compose: false,
      markdown: '',
      slug: '',
      error: '',
    };

    this.publish = this.publish.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.renderPreview = this.renderPreview.bind(this);
    this.excerptChange = this.excerptChange.bind(this);
    this.slugChange = this.slugChange.bind(this);
    this.renderScreen = this.renderScreen.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.editPost = this.editPost.bind(this);
    this.updatePreview = this.updatePreview.bind(this);
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    if (this.state.posts.length < 1) {
      fetch('https://9h6llisbo1.execute-api.us-east-1.amazonaws.com/prod/posts')
      .then(x => x.json())
      .then(x => this.setState({
        compose: false,
        posts: x,
      }));
    } else {
      this.setState({ compose: false });
    }
  }

  editPost(e) {
    const id = e.target.id;
    /* eslint eqeqeq: 0 */
    const post = this.state.posts.filter(x => x.id == id)[0];
    const md = toHTML(decodeURI(post.content));

    this.setState({
      editing: true,
      compose: true,
      title: post.title,
      excerpt: decodeURI(post.excerpt),
      slug: post.slug,
      markdown: md,
      body: decodeURI(post.content),
      id,
    }, this.updatePreview(decodeURI(post.content)));
  }

  excerptChange(e) {
    this.setState({ excerpt: e.target.value });
  }

  publish(e) {
    e.preventDefault();

    const payload = {
      title: this.state.title,
      excerpt: this.state.excerpt,
      post: this.state.body,
      slug: this.state.slug,
      id: this.state.id,
      mod_date: moment().format('YYYY-MM-DD HH:mm:ss'),
    };

    if (this.state.editing) {
      const slug = this.state.slug;

      editPost(payload)
      .then(() => {
        this.setState({
          title: '',
          excerpt: '',
          body: '',
          html: '',
          slug: '',
        });
      })
      .catch(error => this.setState({ error }))
      .then(() => buildIndex())
      .then(() => buildPosts())
      .then(() => clearCache(slug))
      .then(() => console.log('done'))
      .catch(error => this.setState({ error }));
    } else {
      payload.date = moment().format('YYYY-MM-DD HH:mm:ss');
      publishPost(payload).then(() => {
        this.setState({
          title: '',
          excerpt: '',
          body: '',
          html: '',
          slug: '',
        });
      })
      .catch(error => this.setState({ error }))
      .then(() => buildIndex())
      .then(() => buildPosts())
      .then(() => clearCache())
      .then(() => console.log('done'))
      .catch(error => this.setState({ error }));
    }
  }

  titleChange(e) {
    this.setState({ title: e.target.value }, () => (this.renderPreview()));
  }

  slugChange(e) {
    this.setState({ slug: e.target.value });
  }

  updatePreview(string) {
    const body = string;
    const html = template(this.state.title, body);

    this.setState({ html, body });
  }

  renderPreview() {
    const body = marked(this.body.value);
    const html = template(this.state.title, body);

    this.setState({ html, body, markdown: this.body.value });
  }

  renderScreen() {
    if (this.state.compose) {
      return (
        <form onSubmit={this.publish}>
          <div>
            <label>
              Title
              <input value={this.state.title} onChange={this.titleChange} type="text" />
            </label>
          </div>
          <div>
            <label>
              Excerpt
              <input value={this.state.excerpt} onChange={this.excerptChange} type="text" />
            </label>
          </div>
          <div>
            <label>
              Slug
              <input value={this.state.slug} onChange={this.slugChange} type="text" />
            </label>
          </div>
          <div>
            <label>
              Post
              <textarea value={this.state.markdown} onChange={this.renderPreview} ref={(ele) => { this.body = ele; }} />
            </label>
          </div>
          <div>
            <input name="publish" type="submit" value="Publish" />
          </div>
          <Preview css="https://adamsimpson.net/css/base-da17be6277.css" html={this.state.html} />
        </form>
      );
    }

    const posts = this.state.posts.map((x, i) => (
      <li key={i}>
        <button onClick={this.editPost} id={x.id}>{x.title}</button>
        <p>{x.excerpt}</p>
      </li>
    ));

    return (
      <ul>
        {posts}
      </ul>
    );
  }

  render() {
    return (
      <span>
        <div>
          <button onClick={this.getPosts}>Edit</button>
        </div>
        <div>
          <button onClick={() => this.setState({ compose: true })}>Compose</button>
        </div>
        {this.renderScreen()}
        <p>{this.state.error}</p>
      </span>
    );
  }
}
