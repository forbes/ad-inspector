<<<<<<< HEAD
!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=8)}([function(t,e,n){"use strict";var o=function(t,e){for(var n in e)t.style[n]=e[n]};t.exports={dom:function(t,e,n,r,i){var a=document.createElement(t);if(e&&o(a,e),n)for(var s in n)a[s]=n[s];return r&&a.appendChild(document.createTextNode(r)),i&&(a.onclick=i),a},setStyle:o}},function(t,e,n){"use strict";var o=n(0),r=function(t,e,n){return"https://www.google.com/dfp/"+t+"#delivery/"+e+"Detail/"+e+"Id="+n},i=function(t){var e=t.getName();return/^\/(\d+)\//.exec(e)[1]};t.exports={getDomId:function(t){return t.getSlotId().getDomId()},getClientAdIds:function(t){var e=t.getResponseInformation(),n=i(t),a={};return e&&e.creativeId?a["Creative ID"]=[o.dom("a",{},{href:r(n,"creative",e.creativeId),target:"_new"},e.creativeId)]:e&&e.sourceAgnosticCreativeId&&(a["Creative ID"]=[o.dom("a",{},{href:r(n,"creative",e.sourceAgnosticCreativeId),target:"_new"},e.sourceAgnosticCreativeId)]),e&&e.lineItemId?a["Line Item ID"]=[o.dom("a",{},{href:r(n,"lineItem",e.lineItemId),target:"_new"},e.lineItemId)]:e&&e.sourceAgnosticLineItemId&&(a["Line Item ID"]=[o.dom("a",{},{href:r(n,"lineItem",e.sourceAgnosticLineItemId),target:"_new"},e.sourceAgnosticLineItemId)]),a},getLink:r,getAccountName:i,getSlotSizes:function(t){for(var e=[],n=t.getSizes(),o=0;o<n.length;o++)"string"==typeof n[o]?e.push(n[o]):e.push(n[o].getWidth()+"x"+n[o].getHeight());return e}}},function(t,e,n){"use strict";var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r=n(1),i=n(0),a=void 0,s=void 0,p=function t(e){if(e.offsetParent){var n=t(e.offsetParent);return{left:n.left+e.offsetLeft,top:n.top+e.offsetTop}}return{left:e.offsetLeft,top:e.offsetTop}},l=function(t){var e=i.dom("button",{},{className:"gpt-bm__btn gpt-bm__btn--rect-sm gpt-bm__btn--black"},"Swap Side",u),n=i.dom("button",{},{className:"gpt-bm__btn gpt-bm__btn--rect-sm gpt-bm__btn--black"},"Refresh",c),o=i.dom("button",{},{className:"gpt-bm__btn gpt-bm__btn--circle gpt-bm__btn--black"}," X ",d),r=i.dom("div",{},{className:"gpt-bm__buttons"});t?r.append(e,n,o):r.append(o),s.appendChild(r)},d=function(){var t=document.getElementById("ad-inspector");document.body.removeChild(t),document.body.removeChild(a)},c=function(){for(;s.hasChildNodes();)s.removeChild(s.lastChild);[].forEach.call(a.querySelectorAll(".gpt-bm__highlight"),function(t){a.removeChild(t)}),m()},f=function(t){var e=t.getTargetingMap();e.Sizes=r.getSlotSizes(t),e=Object.assign(e,r.getClientAdIds(t));var n=i.dom("div",{},{className:"gpt-bm__slot"}),o="("+t.getSlotId().getName()+")",l=t.getSlotElementId(),d=i.dom("h3",{},{className:"gpt-bm__h3"},l);d.append(i.dom("span",{},{},o));var c=g(e);if(null!=document.getElementById(r.getDomId(t))){var f=document.getElementById(r.getDomId(t)),u=f.querySelector("iframe")||f,m=i.dom("div",function(t){var e=p(t);for(var n in e)e[n]=Math.max(0,e[n]-10)+"px";return e.width=Math.min(document.width||document.body.offsetWidth,t.offsetWidth+20)+"px",e.height=Math.min(document.height||document.body.offsetHeight,t.offsetHeight+20)+"px",e}(u),{className:"gpt-bm__highlight"});a.appendChild(m);n.onclick=function(){var t;[].forEach.call(a.querySelectorAll(".gpt-bm__highlight"),function(t){t.classList.remove("gpt-bm__highlight--visible")}),m.classList.add("gpt-bm__highlight--visible"),t=p(m).top,window.scroll(0,t-60)}}n.appendChild(d),n.appendChild(c),s.appendChild(n)},u=function(){s.classList.contains("gpt-bm__wrapper--left")?s.classList.remove("gpt-bm__wrapper--left"):s.classList.add("gpt-bm__wrapper--left")},g=function(t){var e=i.dom("ul");for(var n in t){var r=i.dom("b",{},{},n+": "),a=i.dom("li",{},{});a.appendChild(r);for(var s=0,p=(t[n]||[]).length;s<p;s++)if("object"==o(t[n][s]))a.appendChild(t[n][s]),s!=p-1&&a.appendChild(document.createTextNode(", "));else{var l=t[n][s].length;s!=p-1&&(""===t[n][s].charAt(l-1)&&","===t[n][s].charAt(l-2)?t[n][s]+="":""!=t[n][s]&&(t[n][s]+=", ")),a.appendChild(document.createTextNode(t[n][s]))}e.appendChild(a)}return e},m=function(){if(window.googletag&&googletag.pubads){var t=googletag.pubads().getSlots(),e=googletag.pubads().getTargetingKeys(),n=[];l(!0),s.appendChild(i.dom("img",{},{className:"gpt-bm__forbes-logo",src:"https://i.forbesimg.com/assets/images/forbes-ad-inspector.png"})),s.appendChild(i.dom("h1",{},{className:"gpt-bm__h1"},"Ad Inspector")),s.appendChild(i.dom("h2",{},{className:"gpt-bm__h2"},"Page Level Targeting"));for(var o=0;o<e.length;o++)n[e[o]]=googletag.pubads().getTargeting(e[o]);s.appendChild(g(n)),s.appendChild(i.dom("h2",{},{className:"gpt-bm__h2"},"Slot Level Targeting"));for(var r=0;r<t.length;r++){var a=t[r];f(a)}}else l(!1),s.appendChild(i.dom("h1",{},{className:"gpt-bm__h1"},"No GPT Ads Found"))};t.exports={contentInit:m,structureInit:function(){a=i.dom("div",{},{className:"gpt-bm"}),s=i.dom("div",{},{className:"gpt-bm__wrapper"}),a.append(s),document.body.appendChild(a)}}},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,o=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var r,i=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?t:(r=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:o+i.replace(/^\.\//,""),"url("+JSON.stringify(r)+")")})}},function(t,e,n){var o,r,i={},a=(o=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===r&&(r=o.apply(this,arguments)),r}),s=function(t){var e={};return function(t){if("function"==typeof t)return t();if(void 0===e[t]){var n=function(t){return document.querySelector(t)}.call(this,t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}}(),p=null,l=0,d=[],c=n(3);function f(t,e){for(var n=0;n<t.length;n++){var o=t[n],r=i[o.id];if(r){r.refs++;for(var a=0;a<r.parts.length;a++)r.parts[a](o.parts[a]);for(;a<o.parts.length;a++)r.parts.push(v(o.parts[a],e))}else{var s=[];for(a=0;a<o.parts.length;a++)s.push(v(o.parts[a],e));i[o.id]={id:o.id,refs:1,parts:s}}}}function u(t,e){for(var n=[],o={},r=0;r<t.length;r++){var i=t[r],a=e.base?i[0]+e.base:i[0],s={css:i[1],media:i[2],sourceMap:i[3]};o[a]?o[a].parts.push(s):n.push(o[a]={id:a,parts:[s]})}return n}function g(t,e){var n=s(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var o=d[d.length-1];if("top"===t.insertAt)o?o.nextSibling?n.insertBefore(e,o.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),d.push(e);else if("bottom"===t.insertAt)n.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var r=s(t.insertInto+" "+t.insertAt.before);n.insertBefore(e,r)}}function m(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=d.indexOf(t);e>=0&&d.splice(e,1)}function b(t){var e=document.createElement("style");return t.attrs.type="text/css",h(e,t.attrs),g(t,e),e}function h(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}function v(t,e){var n,o,r,i;if(e.transform&&t.css){if(!(i=e.transform(t.css)))return function(){};t.css=i}if(e.singleton){var a=l++;n=p||(p=b(e)),o=y.bind(null,n,a,!1),r=y.bind(null,n,a,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(t){var e=document.createElement("link");return t.attrs.type="text/css",t.attrs.rel="stylesheet",h(e,t.attrs),g(t,e),e}(e),o=function(t,e,n){var o=n.css,r=n.sourceMap,i=void 0===e.convertToAbsoluteUrls&&r;(e.convertToAbsoluteUrls||i)&&(o=c(o));r&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var a=new Blob([o],{type:"text/css"}),s=t.href;t.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}.bind(null,n,e),r=function(){m(n),n.href&&URL.revokeObjectURL(n.href)}):(n=b(e),o=function(t,e){var n=e.css,o=e.media;o&&t.setAttribute("media",o);if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}.bind(null,n),r=function(){m(n)});return o(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;o(t=e)}else r()}}t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=a()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=u(t,e);return f(n,e),function(t){for(var o=[],r=0;r<n.length;r++){var a=n[r];(s=i[a.id]).refs--,o.push(s)}t&&f(u(t,e),e);for(r=0;r<o.length;r++){var s;if(0===(s=o[r]).refs){for(var p=0;p<s.parts.length;p++)s.parts[p]();delete i[s.id]}}}};var _,x=(_=[],function(t,e){return _[t]=e,_.filter(Boolean).join("\n")});function y(t,e,n,o){var r=n?"":o.css;if(t.styleSheet)t.styleSheet.cssText=x(e,r);else{var i=document.createTextNode(r),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(i,a[e]):t.appendChild(i)}}},function(t,e){t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var n=function(t,e){var n=t[1]||"",o=t[3];if(!o)return n;if(e&&"function"==typeof btoa){var r=(a=o,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),i=o.sources.map(function(t){return"/*# sourceURL="+o.sourceRoot+t+" */"});return[n].concat(i).concat([r]).join("\n")}var a;return[n].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},r=0;r<this.length;r++){var i=this[r][0];"number"==typeof i&&(o[i]=!0)}for(r=0;r<t.length;r++){var a=t[r];"number"==typeof a[0]&&o[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},function(t,e,n){(t.exports=n(5)(!1)).push([t.i,'.gpt-bm {}\n.gpt-bm__wrapper {\n\tbackground: #fff;\n\tborder-radius: 10px;\n\tborder: 5px solid #666;\n\tbottom: 10px;\n\toverflow: auto;\n\tpadding: 10px 0;\n\tposition: fixed;\n\tright: 10px;\n\ttop: 10px;\n\twidth: 410px;\n\tz-index: 10000000000;\n}\n.gpt-bm__wrapper--left {\n\tleft: 10px;\n\tright: auto;\n}\n.gpt-bm__forbes-logo {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n}\n/* Fonts */\n.gpt-bm__h1,\n.gpt-bm__h2,\n.gpt-bm__h3,\n.gpt-bm li,\n.gpt-bm__btn {\n\tfont-family: Avenir, "Noto Sans", "Droid Sans", "Helvetica Neue", Helvetica, Arial;\n\tfont-weight: normal;\n}\n/* Buttons */\n.gpt-bm__buttons {\n\talign-items: center;\n\tdisplay: flex;\n\tjustify-content: flex-end;\n\tpadding: 0 10px;\n\tposition: absolute;\n\tright: 0;\n\ttop: 5px;\n}\n.gpt-bm__btn {\n\talign-items: center;\n\tborder-radius: 5px;\n\tborder: none;\n\tbox-sizing: border-box;\n\tcursor: pointer;\n\tdisplay: inline-flex;\n\tfont-size: 0.875rem;\n\tfont-weight: bold;\n\tjustify-content: center;\n\tline-height: 1;\n\tmargin-left: 10px;\n\ttransition: all 200ms ease;\n}\n.gpt-bm__btn.gpt-bm__btn--rect-lg {\n\tpadding: 1.5em 1em;\n}\n.gpt-bm__btn.gpt-bm__btn--rect-sm {\n\tpadding: 0.75em 1em;\n}\n.gpt-bm__btn.gpt-bm__btn--square {\n\twidth: 45px;\n\theight: 45px;\n\tpadding: 1.1em 1em;\n}\n.gpt-bm__btn.gpt-bm__btn--circle {\n  width: 2rem;\n\theight: 2rem;\n\tborder-radius: 50%;\n}\n.gpt-bm__btn.gpt-bm__btn--black {\n  background-color: #fff;\n  border: 2px solid #000;\n\tcolor: #000;\n}\n.gpt-bm__btn:hover {\n\tbox-shadow: 0 0 20px rgba(0, 0, 0, 0.2);\n}\n/* Slots */\n.gpt-bm__slot {\n\tcursor: pointer;\n\tpadding: 10px;\n}\n.gpt-bm__slot:hover {\n\tbackground: white;\n\tborder-radius: 10px;\n}\n.gpt-bm__slot a {\n\tcolor: #003891;\n}\n/* Headers */\n.gpt-bm__h1 {\n\tfont-size: 40px;\n\tline-height: 64px;\n\tborder-bottom: 1px solid black;\n\tmargin: 30px 10px 0;\n}\n.gpt-bm__h2 {\n\tfont-size: 32px;\n\tline-height: 51.2px;\n\tmargin-top: 10px;\n\tpadding-left: 10px;\n}\n.gpt-bm__h3 {\n\tborder-top-left-radius: 5px;\n\tborder-top-right-radius: 5px;\n\tbackground: #666;\n\tcolor: #fff;\n\tfont-size: 24px;\n\tline-height: 38.4px;\n\tpadding: 0 10px;\n}\n.gpt-bm__h3 span {\n\tfont-size: 12px;\n\tmargin-left: 10px;\n}\n/* Highlights */\n.gpt-bm__highlight {\n\tbackground: rgba(200, 200, 200, 0.5);\n\tdisplay: none;\n\tborder-radius: 10px;\n\tposition: absolute;\n\tz-index: 2;\n}\n.gpt-bm__highlight--visible {\n\tdisplay: block;\n}\n/* Page level */\n.gpt-bm ul {\n\tborder: 1px solid #666;\n\tborder-bottom-left-radius: 5px;\n\tborder-bottom-right-radius: 5px;\n\tmargin: 0 10px;\n\tpadding: 5px;\n}\n.gpt-bm .gpt-bm__slot ul {\n\tmargin: 0;\n}\n.gpt-bm li {\n\tfont-size: 16px;\n\tline-height: 25.6px;\n\tword-wrap: break-word;\n}\n.gpt-bm li b {\n\tfont-weight: bold;\n}\n',""])},function(t,e,n){var o=n(6);"string"==typeof o&&(o=[[t.i,o,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(4)(o,r);o.locals&&(t.exports=o.locals)},function(t,e,n){"use strict";n(7);var o=n(2);o.structureInit(),o.contentInit()}]);
=======
/**
 * Ad Inspector -- This bookmarklet loads a helpful display of ad related data for GPT served ads.
 *
 * The code to be inserted in a bookmark lives here:
 * https://forbes.github.io/ad-inspector/src/bookmark-url.js
 *
 * See the github page for more information:
 * https://github.com/forbes/ad-inspector
 */

const video = require('./video');
const slotHelper = require('./slot-helper');
const utils = require('./utils');

/**
 * Top Level Variables
 */
let el;
let elWrapper;

/**
 * Returns the offset of an HTML element including potential parent element offset
 * @param {HTMLElement} element
 */
const getOffset = (element) => {
    if (element.offsetParent) {
        const offset = getOffset(element.offsetParent);
        return {
            left: offset.left + element.offsetLeft,
            top: offset.top + element.offsetTop
        };
    }
    return {
        left: element.offsetLeft,
        top: element.offsetTop
    };
};

/**
 * Returns a style object to be used for highlighting an element
 * @param {HTMLElement} element
 */
const getHighlightStyle = (element) => {
    const style = getOffset(element);
    const padding = 10;
    for (let k in style) {
        style[k] = `${Math.max(0, style[k] - padding)}px`;
    }
    style.width = `${Math.min(document.width || document.body.offsetWidth, element.offsetWidth + padding * 2)}px`;
    style.height = `${Math.min(document.height || document.body.offsetHeight, element.offsetHeight + padding * 2)}px`;
    return style;
};

/**
 * Manages the creation of the top button bar
 * and adds the buttons to the bar
 */
const setButtonBar = (gptLoaded) => {
    const swapBtn = utils.dom(
        'button',
        {},
        { className: 'gpt-bm__btn gpt-bm__btn--rect-sm gpt-bm__btn--black' },
        'Swap Side',
        toggleSide
    );
    const refreshBtn = utils.dom(
        'button',
        {},
        { className: 'gpt-bm__btn gpt-bm__btn--rect-sm gpt-bm__btn--black' },
        'Refresh',
        refresh
    );
    const closeBtn = utils.dom(
        'button',
        {},
        { className: 'gpt-bm__btn gpt-bm__btn--circle gpt-bm__btn--black' },
        ' X ',
        close
    );
    const topbar = utils.dom('div', {}, {
        className: 'gpt-bm__buttons',
    });
    if (gptLoaded) {
        topbar.append(swapBtn, refreshBtn, closeBtn);
    } else {
        topbar.append(closeBtn);
    }

    elWrapper.appendChild(topbar);
};

/**
 * Remove Bookmarklet from Dom
 */
const close = () => {
    const script = document.getElementById('ad-inspector');
    document.body.removeChild(script);
    document.body.removeChild(el);
};

/**
 * Clears the existing Bookmarklet content
 * rebuild and re-query for changes to ads on the page
 */
const refresh = () => {
    while (elWrapper.hasChildNodes()) {
        elWrapper.removeChild(elWrapper.lastChild);
    }
    [].forEach.call(el.querySelectorAll('.gpt-bm__highlight'), (e) => {
        el.removeChild(e);
    });
    contentInit();
};

/**
 * Calculates if element is in view
 * Scrolls window to view if not
 * @param {Object} elOffset
 */
const scroll = (elOffset) => {
    window.scroll(0, elOffset - 60);
};

/**
 * Manages all of the desired data collection and
 * HTML structuring/highlight hover functionality for one ad slot
 * @param {Object} slot
 */
const slotBuilder = (slot) => {
    let params = slot.getTargetingMap();
    params.Sizes = slotHelper.getSlotSizes(slot);
    params = Object.assign(params, slotHelper.getClientAdIds(slot));
    const wrap = utils.dom('div', {}, {
        className: 'gpt-bm__slot',
    });
    const name = '(' + slot.getSlotId().getName() + ')';
    const elementId = slot.getSlotElementId();
    const head = utils.dom('h3', {}, { className: 'gpt-bm__h3' }, elementId);
    head.append(utils.dom('span', {}, {}, name));
    const list = ulBuilder(params);

    if (document.getElementById(slotHelper.getDomId(slot)) != null) {
        const slotEl = document.getElementById(slotHelper.getDomId(slot));
        const visEl = slotEl.querySelector('iframe') || slotEl;
        const high = utils.dom('div', getHighlightStyle(visEl), {
            className: 'gpt-bm__highlight',
        });
        el.appendChild(high);
        const select = () => {
            [].forEach.call(el.querySelectorAll('.gpt-bm__highlight'), (e) => {
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
};

/**
 * Move Bookmarklet to left or right side of screen, replace button text
 */
const toggleSide = () => {
    if (elWrapper.classList.contains('gpt-bm__wrapper--left')) {
        elWrapper.classList.remove('gpt-bm__wrapper--left');
    } else {
        elWrapper.classList.add('gpt-bm__wrapper--left');
    }
};

/**
 * Builds an unordered list based off of the collected properties of an ad slot
 * @param {Object} obj
 */
const ulBuilder = (obj) => {
    const ulDom = utils.dom('ul');
    for (let key in obj) {
        const keyDom = utils.dom('b', {}, {}, `${key}: `);
        const liDom = utils.dom('li', {}, {});
        liDom.appendChild(keyDom);

        for (let i = 0, len = (obj[key] || []).length; i < len; i++) {
            if ('object' == typeof obj[key][i]) {
                liDom.appendChild(obj[key][i]);
                if (i != len - 1) {
                    liDom.appendChild(document.createTextNode(', '));
                }
            } else {
                const keyLength = obj[key][i].length;
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
};

/**
 * Manages calling all functions that will result in HTML elements being added into the Bookmarklet body
 * Checks for GPT markers on the window
 * Starting point for all GPT queries
 */
const contentInit = () => {
    if (window.googletag && googletag.pubads) {

        const pa = googletag.pubads();
        const slots = pa.getSlots();
        const targetkeys = googletag.pubads().getTargetingKeys();
        const targetArr = [];

        setButtonBar(true);

        elWrapper.appendChild(utils.dom('img', {}, {
            className: 'gpt-bm__forbes-logo',
            src: 'https://i.forbesimg.com/assets/images/forbes-ad-inspector.png',
        }));
        elWrapper.appendChild(utils.dom('h1', {}, { className: 'gpt-bm__h1' }, 'Ad Inspector'));
        elWrapper.appendChild(video.initVideo());
        elWrapper.appendChild(utils.dom('h2', {}, { className: 'gpt-bm__h2' }, 'Page Level Targeting'));

        for (let j = 0; j < targetkeys.length; j++) {
            targetArr[targetkeys[j]] = googletag.pubads().getTargeting(targetkeys[j]);
        }

        elWrapper.appendChild(ulBuilder(targetArr));

        elWrapper.appendChild(utils.dom('h2', {}, { className: 'gpt-bm__h2' }, 'Slot Level Targeting'));

        for (let i = 0; i < slots.length; i++) {
            const slot = slots[i];
            slotBuilder(slot);
        }
    } else {
        setButtonBar(false);
        elWrapper.appendChild(utils.dom('h1', {}, { className: 'gpt-bm__h1' }, 'No GPT Ads Found'));
    }
};

/**
 * Set up DOM wrappers
 * Two nodes are required to allow highlights to be positioned outside fixed element
 */
const structureInit = () => {
    el = utils.dom('div', {}, {
        className: 'gpt-bm',
    });
    elWrapper = utils.dom('div', {}, {
        className: 'gpt-bm__wrapper',
    });
    el.append(elWrapper);
    document.body.appendChild(el);
};

module.exports = {
    contentInit,
    structureInit
};
>>>>>>> 2abf55e... Add video section
