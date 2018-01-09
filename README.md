# Forbes Ad Inspector

A bookmarklet for monitoring GPT ad units and their associated targeting on web pages.

* [Installation](#installation)
* [Additional Information](#additional-information)
* [Contributors](#contributors)

## Installation

Create a bookmark in your browser. Paste the following into the "URL" field:

```
javascript:(function() {
  var script = document.createElement('script');
  script.src = 'https://forbes.github.io/ad-inspector/src/loader.js';
  script.id = 'ad-inspector';
  document.body.appendChild(script);
})();
```

## Additional Information

This tool should work on all pages that utilize GPT Tags. It does not require any supplemental data to be provided in the page.

## Contributors

**Anthony Giallella** - ajg723@gmail.com
**Johnny McCampbell** - jmccampbell@forbes.com
**Alexander Shnayderman** - ashnayderman@forbes.com
