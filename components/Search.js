import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import lunr from 'lunr';
import { render } from 'react-dom';
import ListItem from './ListItem';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: {},
      searchTerm: '',
    };

    this.fetchIndex = this.fetchIndex.bind(this);
    this.renderResults = this.renderResults.bind(this);
    this.performSearch = this.performSearch.bind(this);
    this.fetchPosts = this.fetchPosts.bind(this);
  }

  componentDidMount() {
    this.fetchIndex();
    this.fetchPosts();
  }

  fetchPosts() {
    fetch('https://9h6llisbo1.execute-api.us-east-1.amazonaws.com/prod/posts')
    .then(x => x.json())
    .then(x => this.setState({ posts: x }));
  }

  fetchIndex() {
    fetch('/searchIndex.json')
    .then(x => x.json())
    .then(x => {
      this.lunr = lunr.Index.load(x);
    });
  }

  performSearch(e) {
    e.preventDefault();
    this.setState({ searchTerm: this.input.value });
  }

  renderResults() {
    if (this.state.searchTerm) {
      const results = this.lunr.search(this.state.searchTerm).map((x) => {
        const article = this.state.posts.filter(post => post.slug === x.ref);

        return <ListItem key={x.ref} data={article} />;
      });

      return (
        <div className="results">
          {results}
        </div>
      );
    }

    return null;
  }

  render() {
    return (
      <div className="pl-max-width">
        <form onSubmit={this.performSearch}>
          <label>
            <input
              ref={(e => this.input = e)}
              name="search"
              type="text"
              placeholder="Search posts..."
            />
          </label>
          <input
            name="searchButton"
            type="submit"
            value="Go"
          />
        </form>
        {this.renderResults()}
      </div>
    );
  }
}

const root = document.querySelector('#search-root');

if (root) {
  render(<Search />, root);
}
