/**
 * GPT Bookmarklet -- This bookmarklet loads a helpful display of ad related data
 *
 * The code to be inserted in a bookmark lives here:
 * https://forbes.github.io/gpt-bookmarklet/src/gpt-bookmark.js
 *
 * See the github page for more information:
 * https://github.com/forbes/gpt-bookmarklet
 */
(function() {

	/**
	 * Top Level Variables
	 */
	var el;
	var elWrapper;

	/**
	 * Slot helper is a collection of necessary queries for GPT data
	 * Each function takes a slot object as its parameter
	 * @param  {Object} slot
	 */
	var slotHelper = {
		/**
		 * Returns the ID of a slot
		 * @return {String}
		 */
		getDomId: function(slot) {
			return slot.getSlotId().getDomId();
		},
		/**
		 * Queries for Creatve and Line Item ID's for a slot
		 * @return {Array}
		 */
		getClientAdIds: function(slot) {
			var resp = slot.getResponseInformation();
			var account = this.getAccountName(slot);
			var params = {};

			if (resp && resp.creativeId) {
				params['Creative ID'] = [dom('a', {}, {
					href: slotHelper.getLink(account, 'creative', resp.creativeId),
					target: '_new',
				}, resp.creativeId)];
			} else if (resp && resp.sourceAgnosticCreativeId) {
				params['Creative ID'] = [dom('a', {}, {
					href: slotHelper.getLink(account, 'creative', resp.sourceAgnosticCreativeId),
					target: '_new',
				}, resp.sourceAgnosticCreativeId)];
			}

			if (resp && resp.lineItemId) {
				params['Line Item ID'] = [dom('a', {}, {
					href: slotHelper.getLink(account, 'lineItem', resp.lineItemId),
					target: '_new',
				}, resp.lineItemId)];
			} else if (resp && resp.sourceAgnosticLineItemId) {
				params['Line Item ID'] = [dom('a', {}, {
					href: slotHelper.getLink(account, 'lineItem', resp.sourceAgnosticLineItemId),
					target: '_new',
				}, resp.sourceAgnosticLineItemId)];
			}
			return params;
		},
		/**
		 * Returns link to creative and line item
		 * @return {String}
		 */
		getLink: function(account, type, id) {
			return 'https://www.google.com/dfp/' + account + '#delivery/' + type + 'Detail/' + type + 'Id=' + id;
		},
		/**
		 * Returns the account name of a slot
		 * @return {String}
		 */
		getAccountName: function(slot) {
			var name = slot.getName();
			var pattern = /^\/(\d+)\//;
			return pattern.exec(name)[1];
		},
		/**
		 * Returns possible sizes for a slot
		 * @return {Array}
		 */
		getSlotSizes: function(slot) {
			var size_array = [];
			var sizes = slot.getSizes();
			for (var i = 0; i < sizes.length; i++) {
				if (typeof sizes[i] == 'string') {
					size_array.push(sizes[i]);
				} else {
					size_array.push(sizes[i].getWidth() + 'x' + sizes[i].getHeight());
				}
			}
			return size_array;
		}
	};

	/**
	 * Returns the offset of an HTML element including potential parent element offset
	 * @param {HTMLElement} element
	 */
	function getOffset(element) {
		if (element.offsetParent) {
			var offset = getOffset(element.offsetParent);
			return {
				left: offset.left + element.offsetLeft,
				top: offset.top + element.offsetTop
			};
		}
		return {
			left: element.offsetLeft,
			top: element.offsetTop
		};
	}

	/**
	 * Returns a style object to be used for highlighting an element
	 * @param {HTMLElement} element
	 */
	function getHighlightStyle(element) {
		var style = getOffset(element);
		var padding = 10;
		for (var k in style) {
			style[k] = Math.max(0, style[k] - padding) + 'px';
		}
		style.width = Math.min(document.width || document.body.offsetWidth, element.offsetWidth + padding * 2) + 'px';
		style.height = Math.min(document.height || document.body.offsetHeight, element.offsetHeight + padding * 2) + 'px';
		return style;
	}

	/**
	 * Sets the style values for an HTML Element
	 * @param {HTMLElement} element
	 * @param {Array} style
	 */
	function setStyle(element, style) {
		for (var key in style) {
			element.style[key] = style[key];
		}
	}

	/**
	 * Manages the creation of the top button bar
	 * and adds the buttons to the bar
	 */
	function setButtonBar(gptLoaded) {
		var swapBtn = dom(
			'button',
			{},
			{ className: 'gpt-bm__btn gpt-bm__btn--rect-sm gpt-bm__btn--black' },
			'Swap Side',
			toggleSide,
		);
		var refreshBtn = dom(
			'button',
			{},
			{ className: 'gpt-bm__btn gpt-bm__btn--rect-sm gpt-bm__btn--black' },
			'Refresh',
			refresh,
		);
		var closeBtn = dom(
			'button',
			{},
			{ className: 'gpt-bm__btn gpt-bm__btn--circle gpt-bm__btn--black' },
			' X ',
			close,
		);
		var topbar = dom('div', {}, {
			className: 'gpt-bm__buttons',
		});
		if (gptLoaded) {
			topbar.append(swapBtn, refreshBtn, closeBtn);
		} else {
			topbar.append(closeBtn);
		}
		
		elWrapper.appendChild(topbar);

	}

	/**
	 * Remove Bookmarklet from Dom
	 */
	function close() {
		document.body.removeChild(el);
	}

	/**
	 * Create any type of HTML element
	 * @param {String} tag
	 * @param {Object} [style]
	 * @param {Object} [props]
	 * @param {String} [content]
	 */
	function dom(tag, style, props, content, func) {
		var element = document.createElement(tag);

		if (style) {
			setStyle(element, style);
		}

		if (props) {
			for (var key in props) {
				element[key] = props[key];
			}
		}

		if (content) {
			element.appendChild(document.createTextNode(content));
		}

		if (func) {
			element.onclick = func;
		}

		return element;
	}

	/**
	 * Add an event listener to an HTMl element
	 * @param {HTMLElement} element
	 * @param {String} evnt
	 * @param {Function} callback
	 */
	function listen(element, evnt, callback) {
		if (element.addEventListener) {
			element.addEventListener(evnt, callback, false);
		} else {
			element.attachEvent('on' + evnt, callback);
		}
	}

	/**
	 * Clears the existing Bookmarklet content
	 * rebuild and re-query for changes to ads on the page
	 */
	function refresh() {
		while (elWrapper.hasChildNodes()) {
		  elWrapper.removeChild(elWrapper.lastChild);
		}
		[].forEach.call(el.querySelectorAll('.gpt-bm__highlight'), function(e) {
			el.removeChild(e);
		});
		contentInit();
	}

	/**
	 * Calculates if element is in view
	 * Scrolls window to view if not
	 * @param {Object} elOffset
	 */
	function scroll(elOffset) {
		window.scroll(0, elOffset - 60);
	}

	/**
	 * Manages all of the desired data collection and
	 * HTML structuring/highlight hover functionality for one ad slot
	 * @param {Object} slot
	 */
	function slotBuilder(slot) {
		var params = slot.getTargetingMap();
		params.Sizes = slotHelper.getSlotSizes(slot);
		params = Object.assign(params, slotHelper.getClientAdIds(slot));
		var wrap = dom('div', {}, {
			className: 'gpt-bm__slot',
		});
		var name = '(' + slot.getSlotId().getName() + ')';
		var elementId = slot.getSlotElementId();
		var head = dom('h3', {}, { className: 'gpt-bm__h3' }, elementId);
		head.append(dom('span', {}, {}, name));
		var list = ulBuilder(params);

		if (document.getElementById(slotHelper.getDomId(slot)) != null) {
			var slotEl = document.getElementById(slotHelper.getDomId(slot));
			var visEl = slotEl.querySelector('iframe') || slotEl;
			var high = dom('div', getHighlightStyle(visEl), {
				className: 'gpt-bm__highlight',
			});
			el.appendChild(high);
			var select = function() {
				[].forEach.call(el.querySelectorAll('.gpt-bm__highlight'), function(e) {
					e.classList.remove('gpt-bm__highlight--visible');
				});
				high.classList.add('gpt-bm__highlight--visible');
				scroll(getOffset(high).top);
			};
			wrap.onclick = select;
		}

		wrap.appendChild(head);
		wrap.appendChild(list);
		elWrapper.appendChild(wrap);
	}

	/**
	 * Move Bookmarklet to left or right side of screen, replace button text
	 */
	function toggleSide() {
		if (elWrapper.classList.contains('gpt-bm__wrapper--left')) {
			elWrapper.classList.remove('gpt-bm__wrapper--left');
		} else {
			elWrapper.classList.add('gpt-bm__wrapper--left');
		}
	}

	/**
	 * Builds an unordered list based off of the collected properties of an ad slot
	 * @param {Object} obj
	 */
	function ulBuilder(obj) {
		var ulDom = dom('ul');
		for (var key in obj) {
			var liDom = dom('li', {}, {}, key + ': ');

			for (var i = 0, len = (obj[key] || []).length; i < len; i++) {
				if ('object' == typeof obj[key][i]) {
					liDom.appendChild(obj[key][i]);
					if (i != len - 1) {
						liDom.appendChild(document.createTextNode(', '));
					}
				} else {

					var keyLength = obj[key][i].length;
					if (i != len - 1) {
						if (obj[key][i].charAt(keyLength - 1) === '' && obj[key][i].charAt(keyLength - 2) === ',') {
							obj[key][i] += '';
						} else {
							if (obj[key][i] != '') {
								obj[key][i] += ', ';
							}
						}
					}
					liDom.appendChild(document.createTextNode(obj[key][i]));

				}
			}
			ulDom.appendChild(liDom);
		}
		return ulDom;
	}

	/**
	 * Manages calling all functions that will result in HTML elements being added into the Bookmarklet body
	 * Checks for GPT markers on the window
	 * Starting point for all GPT queries
	 */
	function contentInit() {
		if (window.googletag && googletag.pubads) {

			var pa = googletag.pubads();
			var slots = pa.getSlots();
			var targetkeys = googletag.pubads().getTargetingKeys();
			var targetArr = [];

			setButtonBar(true);

			elWrapper.appendChild(dom('h1', {}, { className: 'gpt-bm__h1' }, 'Ad Inspector'));
			elWrapper.appendChild(dom('h2', {}, { className: 'gpt-bm__h2' }, 'Page Level Targeting'));

			for (var j = 0; j < targetkeys.length; j++) {
				targetArr[targetkeys[j]] = googletag.pubads().getTargeting(targetkeys[j]);
			}

			elWrapper.appendChild(ulBuilder(targetArr));

			elWrapper.appendChild(dom('h2', {}, { className: 'gpt-bm__h2' }, 'Slot Level Targeting'));

			for (var i = 0; i < slots.length; i++) {
				var slot = slots[i];
				slotBuilder(slot);
			}
		} else {
			setButtonBar(false);
			elWrapper.appendChild(dom('h1', {}, { className: 'gpt-bm__h1' }, 'No GPT Ads Found'));
		}
	}

	/**
	 * Set up DOM wrappers
	 * Two nodes are required to allow highlights to be positioned outside fixed element
	 */
	function structureInit() {
		el = dom('div', {}, {
			className: 'gpt-bm',
		});
		elWrapper = dom('div', {}, {
			className: 'gpt-bm__wrapper',
		});
		el.append(elWrapper);
		document.body.appendChild(el);
	}

	structureInit();
	contentInit();

})();
