# GPT-Bookmarklet

A bookmarklet for monitoring GPT ad units and their associated targeting on web pages.

* [Installation](#installation)
* [Additional Information](#additional-information)
* [Contributors](#contributors)

## Installation

Create a bookmark in your browser. Paste the following into the "URL" field:

```
javascript:(function() {
  var link = document.createElement('link');
  link.rel='stylesheet';
  link.type='text/css';
  link.href = 'https://forbes.github.io/gpt-bookmarklet/src/gpt-styles.css';
  document.head.appendChild(link);
  var script = document.createElement('script');
  script.src = 'https://forbes.github.io/gpt-bookmarklet/src/gpt-loader.js';
  script.id = 'gpt-bookmarklet';
  document.body.appendChild(script);
})();

```

## Additional Information

This tool should work on all pages that utilize GPT Tags. It does not require any supplemental data to be provided in the page.

## Contributors

**Anthony Giallella** - ajg723@gmail.com
**Johnny McCampbell** - jmccampbell@forbes.com
**Alexander Shnayderman** - ashnayderman@forbes.com
