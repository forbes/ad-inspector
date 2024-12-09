/**
 * Ad Inspector -- This bookmarklet loads a helpful display of ad related data for GPT served ads.
 *
 * The code to be inserted in a bookmark lives here:
 * https://forbes.github.io/ad-inspector/src/bookmark-url.js
 *
 * See the github page for more information:
 * https://github.com/forbes/ad-inspector
 */

const slotHelper = require('./slot-helper');
const utils = require('./utils');
const video = require('./video');

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
        { 
            className: 'gpt-bm__btn gpt-bm__btn--rect-sm gpt-bm__btn-top gpt-bm__btn--black gpt-bm__swap',
            title: 'Swap Side'
        },
        '',
        toggleSide
    );
    const refreshBtn = utils.dom(
        'button',
        {},
        { 
            className: 'gpt-bm__btn gpt-bm__btn--rect-sm gpt-bm__btn-top gpt-bm__btn--black gpt-bm__refresh',
            title: 'Refresh'
        },
        '',
        refresh
    );
    const closeBtn = utils.dom(
        'button',
        {},
        { 
            className: 'gpt-bm__btn gpt-bm__btn--rect-sm gpt-bm__btn-top gpt-bm__btn--black gpt-bm__close',
            title: 'Close'
        },
        '',
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

    elWrapper.querySelector('.gpt-bm__header-container').appendChild(topbar);
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

const refreshAd = () => {
    const refreshBtn = el.querySelectorAll('.gpt-bm_btn--refresh');
    refreshBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            let logOnce = false;
            const posElement = e.target.parentElement.querySelector('ul').children[0]; // pos
            const slotElement = e.target.parentElement.querySelector('ul').children[1]; // slotId
            if (slotElement && !logOnce) {
                logOnce = true;
                const slotName = slotElement.textContent.split(' ')[1];
                const position = posElement.textContent.split(' ')[1];

                googletag.pubads().getSlots().forEach((slot) => {
                    if(slot.getSlotElementId() == slotName) {
                        // refresh only the clicked ad slot
                        // get fbs-ad with position="topx"
                        const adList = document.querySelectorAll(`fbs-ad[position="${position}"]`);
                        adList.forEach((ad) => {
                            const adDiv = ad.querySelector(`div[id="${slotName}"]`);

                            if (adDiv) {
                                ad.refresh();
                                // TODO tomorrow clean up code, this is firing 2-3 times for some reason
                            }
                            
                        });
                    }
                });
            }
            // console.log('TEST: ', slotElement);
        });
    });

    // if (window.googletag && googletag.pubads) {

    //     const pa = googletag.pubads();
    //     const slots = pa.getSlots();
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


    const slotEl = document.getElementById(slotHelper.getDomId(slot));

    if (slotEl != null) {
        const visEl = slotEl.querySelector('iframe') || slotEl;
        const highStyle = getHighlightStyle(visEl);
        const high = utils.dom('div', highStyle, {
            className: 'gpt-bm__highlight',
        });
        el.appendChild(high);
        const select = () => {
            [].forEach.call(el.querySelectorAll('.gpt-bm__highlight'), (e) => {
                e.classList.remove('gpt-bm__highlight--visible');
            });
            high.classList.add('gpt-bm__highlight--visible');
            setHighlightStyle(slotEl, high);
            scrollTo(slotEl);
        };
        wrap.onclick = select;
    }

    wrap.appendChild(head);
    wrap.appendChild(list);
    const refreshBtn = utils.dom(
        'button',
        {},
        { 
            className: 'gpt-bm__btn gpt-bm__btn--rect-sm gpt-bm__btn--black gpt-bm_btn--refresh',
            title: 'Refresh Ad'
        },
        'Refresh Ad',
        refreshAd
    );

    wrap.appendChild(refreshBtn);
    elWrapper.appendChild(wrap);
};

const setHighlightStyle = (slotEl, high) => {
    const highStyle = getHighlightStyle(slotEl);
    const mobileParentWrapper = slotEl.closest('.ribbon-mobile-ad-wrapper');
    const currentScrollableElement = mobileParentWrapper === null ? slotEl : mobileParentWrapper;
    const position = window.getComputedStyle(currentScrollableElement).position;

    if (position === 'fixed') {
        highStyle.position = 'fixed';
    } else {
        highStyle.position = 'absolute';
    }

    utils.setStyle(high, highStyle);
};

const scrollTo = (element) => {
    const mobileParentWrapper = element.closest('.ribbon-mobile-ad-wrapper');
    const currentScrollableElement = mobileParentWrapper === null ? element : mobileParentWrapper;
    const position = window.getComputedStyle(currentScrollableElement).position;

    if (position !== 'fixed') {
        window.scrollTo(0, currentScrollableElement.getBoundingClientRect().top + window.scrollY - 60);
    }
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
        slotHelper.setAccountNumber(slots);
        
        const targetkeys = googletag.pubads().getTargetingKeys();
        const targetArr = [];

        elWrapper.appendChild(utils.dom('div', {}, { className: 'gpt-bm__header-container'}));
        setButtonBar(true);

        elWrapper.querySelector('.gpt-bm__header-container').appendChild(utils.dom('img', {}, {
            className: 'gpt-bm__forbes-logo',
            src: 'https://images.forbes.com/assets/images/forbes-ad-inspector-2.png',
        }));
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
