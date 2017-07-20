const React = require('react');

const PostPagination = React.createClass({

  render() {
    const total = parseInt(this.props.data.total, 10);
    const currentNumber = parseInt(this.props.data.current, 10);
    const nextNumber = currentNumber + 1;
    const prevNumber = currentNumber - 1;
    const nextSlug = encodeURI(`/page/${nextNumber}`);
    const prevSlug = encodeURI(`/page/${prevNumber}`);
    const pagesLeft = `${currentNumber}/${total}`;

    if (currentNumber < total) {
      if (currentNumber === 0) {
        var nextLink = <a title="next page" href={nextSlug} className="next-unicode tx-no-underline full-width pd_all" />;
      } else {
        var nextLink = <a title="next page" href={nextSlug} className="next-unicode tx-no-underline pd_all" />;
      }
    } else {
      var nextLink = null;
    }

    if (currentNumber === 0) {
      var prevLink = null;
    } else {
      if (currentNumber === 1) {
        var prevLink = <a title="previous page" href="/" className="prev-unicode tx-no-underline full-width pd_all" />;
      }
      if (currentNumber === total) {
        var prevLink = <a title="previous page" href={prevSlug} className="prev-unicode tx-no-underline full-width pd_all" />;
      } else if (currentNumber !== 1) {
        var prevLink = <a title="previous page" href={prevSlug} className="prev-unicode tx-no-underline pd_all" />;
      }
    }

    return (
      <div className="pagination-wrapper tx-center">
        {prevLink}
        {nextLink}
      </div>
    );
  },
});

module.exports = PostPagination;
