const React = require('react');
const Header = require('./Header');
const Footer = require('./Footer');
const Post = require('./Post');
const List = require('./List');

const dynamicComponent = {
  post: Post,
  list: List,
};

const App = React.createClass({
  render() {
    const Comp = dynamicComponent[this.props.component];
    return (
      <div className="app">
        <Header />
        <Comp data={this.props.data} />
        <Footer />
      </div>
    );
  },
});

module.exports = App;
