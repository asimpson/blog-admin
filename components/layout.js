<!doctype html>
<html class="no-js" lang="en">
  <head>
    <meta charset="utf-8">
    <title>{{pageTitle}}</title>
    <meta name="description" content="{{metaDesc}}">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,shrink-to-fit=no">
    <link href='https://adamsimpson.net/rss.xml' title='adamsimpson.net: Post Feed' rel='alternate' type='application/rss+xml'>
    <link rel="stylesheet" href="/css/base.css">
    <link rel="webmention" href="https://adamsimpson.net/webmention" />
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png">
    <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="/android-chrome-192x192.png" sizes="192x192">
    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
    <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
    <link rel="manifest" href="/manifest.json">
    <meta name="msapplication-TileColor" content="#2d89ef">
    <meta name="msapplication-TileImage" content="/mstile-144x144.png">
    <meta name="theme-color" content="#ffffff">
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@a_simpson" />
    <meta name="twitter:title" content="{{pageTitle}}" />
    <meta name="twitter:description" content="{{metaDesc}}" />
    {{#if slug}}
      <link rel="canonical" href="https://adamsimpson.net/writing/{{slug}}">
    {{/if}}
  </head>
  <body>
    <div id="app">{{{content}}}</div>
    <footer>
      <script async defer src="/js/browser.js"></script>
      <script async defer src="/js/twitter-widget.js"></script>
    </footer>
  </body>
</html>