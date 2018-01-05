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
