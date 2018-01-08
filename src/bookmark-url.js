javascript:(function() {
  var link = document.createElement('link');
  link.rel='stylesheet';
  link.type='text/css';
  link.href = 'https://forbes.github.io/ad-inspector/src/styles.css';
  document.head.appendChild(link);
	var script = document.createElement('script');
	script.src = 'https://forbes.github.io/ad-inspector/src/loader.js';
	script.id = 'ad-inspector';
	document.body.appendChild(script);
})();
