const React = require('react');
const moment = require('moment');

const ListItem = React.createClass({
  render() {
    const titleObj = this.props.data.map((x, i) => {
      const slug = encodeURI(`/writing/${x.slug}`);
      const date = moment(x.date).format('ll');

      return (
        <li key={i} className="post-title sp_lg post-list">
          <a href={slug} className="tx-title block sp_none tx-no-underline">{x.title}</a>
          <div className="post-date">posted {date}</div>
          <div className="post-excerpt" dangerouslySetInnerHTML={{ __html: x.excerpt }} />
        </li>
      );
    });

    return (
      <ul className="pl-max-width title-wrapper sp_top">
        {titleObj}
      </ul>
    );
  },
});

module.exports = ListItem;
