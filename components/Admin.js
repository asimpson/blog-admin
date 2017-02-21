import React, { Component } from 'react';
import { render } from 'react-dom';
import fetch from 'isomorphic-fetch';
import NewPost from './NewPost';

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authd: false,
      sent: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderForms = this.renderForms.bind(this);
    this.url = 'https://9h6llisbo1.execute-api.us-east-1.amazonaws.com/prod';
  }

  componentDidMount() {
    const stored = sessionStorage.getItem('aws_token');

    if (!stored) {
      const token = location.search.split('token=');

      if (token.length > 1) {
        const post = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: token[1] }),
        };
        fetch(`${this.url}/get_token`, post)
        .then(x => x.json())
        .then((x) => {
          sessionStorage.setItem('aws_token', JSON.stringify(x));
          this.setState({ authd: true });
          history.pushState({}, 'amsLoggedIn', '/admin');
        });
      }
    } else {
      this.setState({ authd: true });
    }
  }

  handleChange(e) {
    this.setState({ email: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const post = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
      }),
    };

    fetch(`${this.url}/login`, post)
    .then(x => x.text())
    .then(() => this.setState({ sent: true }));
  }

  renderForms() {
    if (!this.state.authd && !this.state.sent) {
      return (
        <form onSubmit={this.handleSubmit} action="/login">
          <label htmlFor="email">
            <input onChange={this.handleChange} placeholder="bilbo@thering.com" name="email" type="email" />
          </label>
        </form>
      );
    }

    if (this.state.sent && !this.state.authd) {
      return <p>Check your email</p>;
    }

    if (this.state.authd) {
      return <NewPost />;
    }

    return null;
  }

  render() {
    return (
      <div>
        { this.renderForms() }
      </div>
    );
  }
}

render(<Admin />, document.querySelector('.app'));
