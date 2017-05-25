const React = require('react');

const Header = React.createClass({
  render() {
    return (
      <div className="header">
        <div className="logo-wrapper pl-max-width">
          <div className="logo" dangerouslySetInnerHTML={{ __html: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 290 300.9' enable-background='new 0 0 290 300.9'><clipPath id='a'><ellipse cx='145' cy='151.7' rx='138.9' ry='137.7'/></clipPath><g clip-path='url(#a)' enable-background='new'><clipPath id='b'><path d='M6 13h278v277H6z'/></clipPath><path clip-path='url(#b)' fill='#2C2C6E' d='M1 9h287.9v285.4H1z'/><clipPath id='c'><path d='M145 64.4l73.6 113.1H71.3z'/></clipPath><g clip-path='url(#c)'><clipPath id='d'><path d='M6 13h278v277H6z'/></clipPath><path clip-path='url(#d)' fill='#fff' d='M66.3 59.4h157.3v123.1H66.3z'/></g><clipPath id='e'><path d='M145 113.9l13.3 20.7h-26.6z'/></clipPath><g clip-path='url(#e)'><clipPath id='f'><path d='M6 13h278v277H6z'/></clipPath><path clip-path='url(#f)' fill='#2C2C6E' d='M126.7 108.9h36.6v30.6h-36.6z'/></g><clipPath id='g'><path d='M173.4 178.2h-56.9l11.1-16.4h34.3z'/></clipPath><g clip-path='url(#g)'><clipPath id='h'><path d='M6 13h278v277H6z'/></clipPath><path clip-path='url(#h)' fill='#2C2C6E' d='M111.5 156.8h66.9v26.4h-66.9z'/></g><clipPath id='i'><path d='M145 295.9l73.7-113.1H71.3z'/></clipPath><g clip-path='url(#i)'><clipPath id='j'><path d='M6 13h278v277H6z'/></clipPath><g clip-path='url(#j)' enable-background='new'><clipPath id='k'><path d='M71 182h148v108H71z'/></clipPath><g clip-path='url(#k)'><clipPath id='l'><path d='M71 182h148v108H71z'/></clipPath><path clip-path='url(#l)' fill='#2C2C6E' d='M66.3 177.8h157.3v123.1H66.3z'/></g><g clip-path='url(#k)'><clipPath id='m'><path d='M69.7 183.4h150.6v10H69.7z'/></clipPath><g clip-path='url(#m)'><clipPath id='n'><path d='M71 182h148v108H71z'/></clipPath><path class='first-row' clip-path='url(#n)' fill='#3E85C6' d='M64.7 178.4h160.6v20H64.7z'/></g></g><g clip-path='url(#k)'><clipPath id='o'><path d='M69.7 198.6h150.6v10H69.7z'/></clipPath><g clip-path='url(#o)'><clipPath id='p'><path d='M71 182h148v108H71z'/></clipPath><path class='second-row' clip-path='url(#p)' fill='#3E85C6' d='M64.7 193.6h160.6v20H64.7z'/></g></g><g clip-path='url(#k)'><clipPath id='q'><path d='M69.7 213.8h150.6v10H69.7z'/></clipPath><g clip-path='url(#q)'><clipPath id='r'><path d='M71 182h148v108H71z'/></clipPath><path class='third-row' clip-path='url(#r)' fill='#3E85C6' d='M64.7 208.8h160.6v20H64.7z'/></g></g><g clip-path='url(#k)'><clipPath id='s'><path d='M69.7 229h150.6v10H69.7z'/></clipPath><g clip-path='url(#s)'><clipPath id='t'><path d='M71 182h148v108H71z'/></clipPath><path class='fourth-row' clip-path='url(#t)' fill='#3E85C6' d='M64.7 224h160.6v20H64.7z'/></g></g></g></g></g></svg>" }} />
          <div className="secondary-logos">
            <a rel="me" className="twitter-link" href="http://twitter.com/a_simpson">
              Twitter
            </a>
            <a rel="me" className="github-link" href="http://github.com/asimpson">
              Github
            </a>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = Header;
