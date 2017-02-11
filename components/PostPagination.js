var React = require('react');

const PostPagination = React.createClass({

  render: function() {
    var total = parseInt(this.props.data.total, 10);
    var currentNumber = parseInt(this.props.data.current, 10);
    var nextNumber = currentNumber+1;
    var prevNumber = currentNumber-1;
    var nextSlug = encodeURI( "/page/" +  nextNumber );
    var prevSlug = encodeURI( "/page/" + prevNumber );
    var pagesLeft = currentNumber+"/"+total;

    if (currentNumber < total) {
      if (currentNumber === 0) {
        var nextLink = <a title="next page" href={nextSlug} className="next-unicode tx-no-underline full-width pd_all"></a>;
      } else {
        var nextLink = <a title="next page" href={nextSlug} className="next-unicode tx-no-underline pd_all"></a>;
      }
    } else {
      var nextLink = null;
    }

    if (currentNumber === 0) {
      var prevLink = null;
    } else {
      if (currentNumber === 1) {
        var prevLink = <a title="previous page" href='/' className="prev-unicode tx-no-underline full-width pd_all"></a>;
      }
      if (currentNumber === total) {
        var prevLink = <a title="previous page" href={prevSlug} className="prev-unicode tx-no-underline full-width pd_all"></a>;
      } else if (currentNumber !== 1) {
        var prevLink = <a title="previous page" href={prevSlug} className="prev-unicode tx-no-underline pd_all"></a>;
      }
    }

    return (
    <div className="pagination-wrapper tx-center">
      {prevLink}
      {nextLink}
    </div>
    );
  }
});

module.exports = PostPagination;
