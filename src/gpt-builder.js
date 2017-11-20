(function() {

	/**
	Top Level Variables
	 */
	var el;
	var wrap_el;
	var styleConfig = {
		linkStyle: {
			cursor: 'pointer',
			color: 'blue'
		},
		headingStyle: {
			fontFamily: 'Georgia',
			fontWeight: 'bold',
			color: 'rgb(224, 199, 89)',
			marginTop: '5px'
		},
		firstButtonStyle:{
			marginLeft: '0%',
			marginRight: '20px',
			background: 'white',
			border: 'rgb(224, 199, 89)',
			color: 'black',
			padding: '5px',
			font: '11px "Lucida Grande"',
			display: 'inline-block',
			cursor: 'pointer'
		},
		secondButtonStyle:{
			background: 'white',
			border: 'rgb(224, 199, 89)',
			color: 'black',
			padding: '5px',
			marginRight: '56%',
			font: '11px "Lucida Grande"',
			display: 'inline-block',
			cursor: 'pointer'
		},
		thirdButtonStyle:{
			background: 'white',
			border: 'rgb(224, 199, 89)',
			color: 'black',
			padding: '5px',
			display: 'inline-block',
			font: '11px "Lucida Grande"',
			cursor: 'pointer'
		},
		divStyle: {
			background: 'rgba(119,136,153,1)',
			border: 'solid 5px rgba(255,240,170,1)',
			listStyle: 'none',
			font: 'bold 15px "Lucida Grande"',
			fontWeight: 'normal',
			color: '#000',
			borderRadius: '10px',
			position: 'fixed',
			padding: '10px',
			margin: '0',
			top: '10px',
			bottom: '10px',
			right: '10px',
			width: '410px',
			overflow: 'auto',
			zIndex: 10000000000
		},
		wrapStyle: {
			padding: '5px',
			borderRadius: '10px',
			backgroundColor: 'rgb(255,250,240)'
		},
		highlightColor: 'rgba(224,199,89,0.75)',

	};

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
			var linkstyles = styleConfig.linkStyle;

			if (resp && resp.creativeId) {
				params['Creative ID'] = [dom('a', linkstyles, {
					target: '_new',
					href: 'https://www.google.com/dfp/' + account + '#delivery/CreativeDetail/creativeId=' + resp.creativeId
				}, resp.creativeId)];
			} else if (resp && resp.sourceAgnosticCreativeId) {
				params['Creative ID (SA)'] = [dom('a', linkstyles, {
					target: '_new',
					href: 'https://www.google.com/dfp/' + account + '#delivery/CreativeDetail/creativeId=' + resp.sourceAgnosticCreativeId
				}, resp.sourceAgnosticCreativeId)];
			}

			if (resp && resp.lineItemId) {
				params['Line Item ID'] = [dom('a', linkstyles, {
					target: '_new',
					href: 'https://www.google.com/dfp/' + account + '#delivery/CreativeDetail/lineItemId=' + resp.lineItemId
				}, resp.lineItemId)];
			} else if (resp && resp.sourceAgnosticLineItemId) {
				params['Line Item ID (SA)'] = [dom('a', linkstyles, {
					target: '_new',
					href: 'https://www.google.com/dfp/' + account + '#delivery/CreativeDetail/lineItemId=' + resp.sourceAgnosticLineItemId
				}, resp.sourceAgnosticLineItemId)];
			}
			return params;
		},
		/**
		 * Returns the account name of a slot
		 * @return {String}
		 */
		getAccountName: function(slot) {
			var name = slot.getName(),
				pattern = /^\/(\d+)\//;

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
	 *  @param  {HTMLElement} element
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
	 *  @param  {HTMLElement} element
	 */
	function getHighlightStyle(element) {
		var style = getOffset(element);
		var padding = 10;
		for (var k in style) {
			style[k] = Math.max(0, style[k] - padding) + 'px';
		}
		style.width = Math.min(document.width || document.body.offsetWidth, element.offsetWidth + padding * 2) + 'px';
		style.height = Math.min(document.height || document.body.offsetHeight, element.offsetHeight + padding * 2) + 'px';
		style.position = 'absolute';
		style.background = styleConfig.highlightColor;
		style.display = 'none';
		style.borderRadius = padding + 'px';

		return style;
	}

	/**
	 * Creates a Heading of a specified font-size
	 * @return {HTMLElement}
	 */
	function setHeading(size, content) {
		var style = {
			fontSize: (size * 9) + 'px',
			fontFamily: styleConfig.headingStyle.fontFamily,
			fontWeight: styleConfig.headingStyle.fontWeight,
			color: styleConfig.headingStyle.color,
			marginTop: styleConfig.headingStyle.marginTop
		};

		var heading = dom('div', style, {}, content);
		return heading;
	}

	/**
	 * Sets the style values for an HTML Element
	 * @param {HTMLElement} element
	 * @param {Array} style
	 */
	function setStyle(element, style) {
		for (var key in style) {
			try {
				element.style[key] = style[key];
			} catch (e) {
				if ('background' == key) {
					var colors = style[key].match(/rgba\((\d+), (\d+), (\d+), ([^)]+)/);
					var color = toHex(Math.floor(255 * colors.pop()));
					for (var i = 1; i < colors.length; i++) color += padder(2, toHex(parseInt(colors[i])));
					element.style.background = 'transparent';
				}
			}
		}
	}

	/**
	 * Manages the creation of the top button bar
	 * and adds the buttons to the bar
	 */
	function setButtonBar() {
		var topbar = dom('div', {
			width: '100%'
		});
		el.appendChild(topbar);

		buttonBuilder(topbar, 'Swap Side', toggleSide, {id: 'gptToggle'}, styleConfig.firstButtonStyle);
		buttonBuilder(topbar, 'Refresh', reset, {}, styleConfig.secondButtonStyle);
		buttonBuilder(topbar, ' X ', clearSlots, {}, styleConfig.thirdButtonStyle);
	}

	/**
	 * Manages the creation of the top button bar
	 * add exit button
	 */
	function setExit() {
		var topbar = dom('div', {
			width: '100%'
		});
		el.appendChild(topbar);

		buttonBuilder(topbar, ' X ', clearSlots, {}, styleConfig.firstButtonStyle);
	}

	/**
	 * Creates an HTML button and appends it to parent element
	 * if all necessary params are provided
	 * @param {HTMLElement} context
	 * @param {String} value
	 * @param {Function} func
	 * @param {Object} [props]
	 * @param {Object} [style]
	 */
	function buttonBuilder(context, value, func, props, style) {
		var button = document.createElement('input');
		button.type = 'button';
		if (value && func && context) {
			button.value = value;
			button.onclick = func;
			if (style) {
				setStyle(button, style);
			}
			if (props) {
				for (var key in props) {
					button[key] = props[key];
				}
			}
			context.appendChild(button);
		} else {
			return;
		}
	}

	/**
	 * Remove Bookmarklet from Dom
	 */
	function clearSlots() {
		wrap_el.parentNode.removeChild(wrap_el);
	}

	/**
	 * Create any type of HTML element
	 * @param {String} tag
	 * @param {Object} [style]
	 * @param {Object} [props]
	 * @param {String} [content]
	 */
	function dom(tag, style, props, content) {
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
	 * pad out a hexcode with 0's if needed
	 * @param {Number} p
	 * @param {String} n
	 */
	function padder(p, n) {
		while (n.length < p) n = '0' + n;
		return n;
	}

	/**
	 * Clears the existing Bookmarklet content
	 * rebuild and re-query for changes to ads on the page
	 */
	function reset() {
		var myNode = document.getElementById('wrapper');
		while (myNode.firstChild) {
			myNode.removeChild(myNode.firstChild);
		}
		[].forEach.call(document.querySelectorAll('div[id^="highlight"]'), function(e) {
			e.parentNode.removeChild(e);
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
		var wrap = dom('div', {
			padding: styleConfig.wrapStyle.padding,
			borderRadius: styleConfig.wrapStyle.borderRadius,
			cursor: 'pointer'
		});
		var name = slot.getSlotId().getName();
		var head = setHeading(2, name);
		var list = ulBuilder(params);

		if (document.getElementById(slotHelper.getDomId(slot)) != null) {
			var slotEl = document.getElementById(slotHelper.getDomId(slot));
			var visEl = slotEl.querySelector('iframe') || slotEl;
			var high = dom('div', getHighlightStyle(visEl), {
				id: 'highlight' + name
			});
			wrap_el.appendChild(high);
			var select = function() {
				high.style.display = 'block';
				scroll(getOffset(visEl).top);
			};
			var highlight = function() {
				wrap.style.backgroundColor = styleConfig.wrapStyle.backgroundColor;
			};
			var unselect = function() {
				wrap.style.backgroundColor = 'transparent';
				high.style.display = 'none';
			};
			listen(wrap, 'click', select);
			listen(wrap, 'mouseover', highlight);
			listen(wrap, 'mouseout', unselect);
		}

		wrap.appendChild(head);
		wrap.appendChild(list);
		el.appendChild(wrap);
	}

	/**
	 * Convert a number to hexadecimal
	 * @param {Number} num
	 */
	function toHex(num) {
		return num.toString(16);
	}

	/**
	 * Move Bookmarklet to left or right side of screen, replace button text
	 */
	function toggleSide(){
		if(el.style.right){
			el.style.right = '';
			el.style.left = '10px';
		} else{
			el.style.left = '';
			el.style.right = '10px';
		}
	}

	/**
	 * Builds an unordered list based off of the collected properties of an ad slot
	 * @param {Object} obj
	 */
	function ulBuilder(obj) {
		var ul_dom = dom('ul');
		for (var key in obj) {
			var li_dom = dom('li', {}, {}, key + ': ');

			for (var i = 0, len = (obj[key] || []).length; i < len; i++) {
				if ('object' == typeof obj[key][i]) {
					li_dom.appendChild(obj[key][i]);
					if (i != len - 1) {
						li_dom.appendChild(document.createTextNode(','));
					}
				} else {

					var keyLength = obj[key][i].length;
					if (i != len - 1) {
						if (obj[key][i].charAt(keyLength - 1) === '' && obj[key][i].charAt(keyLength - 2) === ',') {
							obj[key][i] += '';
						} else {
							if (obj[key][i] != '') {
								obj[key][i] += ',';
							}
						}
					}
					li_dom.appendChild(document.createTextNode(obj[key][i]));

				}
			}
			ul_dom.appendChild(li_dom);
		}
		return ul_dom;
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

			setButtonBar();

			el.appendChild(setHeading(3, 'GPT Ads'));
			el.appendChild(setHeading(2, 'Page Level Tags'));
			for (var j = 0; j < targetkeys.length; j++) {
				targetArr[targetkeys[j]] = googletag.pubads().getTargeting(targetkeys[j]);
			}

			el.appendChild(ulBuilder(targetArr));

			for (var i = 0; i < slots.length; i++) {
				var slot = slots[i];
				slotBuilder(slot);
			}
		} else {
			setExit();
			el.appendChild(setHeading(3, 'No GPT Tags Found'));
		}

		wrap_el.appendChild(el);
	}

	/**
	 * Manages setting up the outer shell of the Bookmarklet
	 * Content is appended as children into it
	 */
	function structureInit() {

		wrap_el = dom('div', {}, {
			id: 'GPT-Bookmarklet'
		});
		el = dom('div', styleConfig.divStyle, {
			id: 'wrapper'
		});

		document.body.appendChild(wrap_el);
	}

	/**
	 * Set up outer structure then inner content of Bookmarklet
	 */
	function init() {
		structureInit();
		contentInit();
	}
	init();

})();
