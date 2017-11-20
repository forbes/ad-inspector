/**
 * GPT Bookmarklet -- This bookmarklet loads a helpful display of ad related data
 *
 * The code to be inserted in a bookmark lives here:
 * https://images.forbes.com/assets/gpt-bookmarklet/gpt-bookmarklet-bookmark.js
 *
 * See the github page for more information:
 * https://github.forbes.com/agiallella/gpt-bookmarklet-2
 */
(function() {
		var gpt = document.createElement('script');
		gpt.src = 'https://forbes.github.io/gpt-bookmarklet/src/gpt-builder.js';
		gpt.id = 'gpt-loader';
		document.head.appendChild(gpt);
})();

