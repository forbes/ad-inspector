# GPT-Bookmarklet

A bookmarklet for monitoring GPT ad units and their associated targeting on web pages.

* [Installation](#installation)
* [Additional Information](#additional-information)
* [Deployment](#deployment)
* [Authors](#authors)

## Installation

Create a bookmark in your browser. Paste the following into the "URL" field:

```
javascript:(function() {
	var script = document.createElement('script');
	script.src = 'your-hosted-filepath/gpt-bookmark.js';
	script.id = 'gpt-bookmarklet';
	document.body.appendChild(script);
})();
```

## Additional Information

This tool should work on all pages that utilize GPT Tags. It does not require any supplemental data to be provided in the page.

## Deployment

For general use, place the files in your preferred server location after changing the URLs inside the files to match.  

For local testing, run npm-start to host the src folder. Use a proxy application like Charles to map the hosted local files address to the address of the files stored on the server.  

## Author

**Anthony Giallella** - ajg723@gmail.com

```
Based on the original gpt-bokmarklet created by:  
Johnny McCampbell - jmccampbell@forbes.com  
Alexander Shnayderman - ashnayderman@forbes.com  
```
