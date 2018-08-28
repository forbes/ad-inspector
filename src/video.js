const utils = require('./utils');

let header;
let wrapper;
let button;
let refresh;
let error;

/**
 * Returns initial video section
 * @returns {HTMLDivElement} the section to display video info in
 */
const initVideo = () => {
    wrapper = utils.dom('div', {}, { className: 'gpt-bm__video' }, '');
    header = utils.dom('h2', {}, { className: 'gpt-bm__h2' }, 'Video Ad Info');
    button = utils.dom('button', { marginTop: '10px' }, { className: 'gpt-bm__btn gpt-bm__btn--rect-sm gpt-bm__btn--black' }, 'Click For Video Ad Info');
    error = utils.dom('p', {}, { className: 'gpt-bm__p--desc' }, '');
    button.addEventListener('click', handleButtonClick);
    wrapper.appendChild(header);
    wrapper.appendChild(button);

    refresh = utils.dom('button', { marginTop: '10px' }, { className: 'gpt-bm__btn gpt-bm__btn--rect-sm gpt-bm__btn--black' }, 'Refresh');
    refresh.addEventListener('click', handleButtonClick);
    
    return wrapper;
};

/**
 * Button click handler for getting and refreshing video ad info
 */
const handleButtonClick = () => {
    wrapper.innerHTML = header.outerHTML;

    setTimeout(() => {
        populatePreroll();
    }, 300);
};

/**
 * Gets the current video player from videojs
 * @returns {Object} the video player
 */
const getCurrentPlayer = () => {
    const players = (window.videojs || {}).players;
    const keys = Object.keys(players);
    const index = keys.length - 1;
    return players[keys[index]];
};

const creativeBaseUrl = 'https://admanager.google.com/7175#delivery/CreativeDetail/creativeId=';
const lineItemBaseUrl = 'https://admanager.google.com/7175#delivery/LineItemDetail/lineItemId=';

/**
 * Creates item in the video info list
 * @param {string} label the label for the list item
 * @param {string[]} value the value(s) to stringify for display
 * @returns {HTMLLIElement} the element for display in list
 */
const createListItem = (label, values) => {
    const baseUrl = label.indexOf('Creative') !== -1 ? creativeBaseUrl : lineItemBaseUrl;
    const listItem = utils.dom('li');
    let valuesNode;
    if (values.length > 0) {
        valuesNode = utils.dom('div', {}, { 'class': 'gpt-bm__slot-creative'}, null);
        values.forEach((value) => {
            const valueNode = utils.dom('a', {}, { 'href': `${baseUrl + value}`}, `${value}`);
            valuesNode.appendChild(valueNode);
        });
    } else {
        valuesNode = document.createTextNode('Not found. If an ad is playing try refresh.');
    }

    listItem.appendChild(utils.dom('b', {}, {}, `${label}`));
    listItem.appendChild(valuesNode);
    
    return listItem;
};

/**
 * Extracts the creative id from current ad object
 * @param {Object} currentAd the ad currently playing
 * @returns {string[]} all values obtained from functions related to getting crative ids
 */
const getCreativeId = (currentAd) => {
    const creativeId = currentAd.getCreativeId();
    return [
        creativeId, 
        ...(currentAd.getWrapperCreativeIds() || [])
    ].filter(utils.nonEmptyString);
};

/**
 * Displays error message when failures occur
 */
const handleError = () => {
    refresh.innerText = 'Retry'; 
    error.innerHTML = 'There is no video ad data available.';
    wrapper.appendChild(refresh);
    wrapper.appendChild(error);
};

/**
 * Populates video section of ad-inspector with video ad data
 */
const populatePreroll = () => {
    const videojs = window.videojs;
    if (!videojs) {
        handleError();
        return;
    }
    
    const currentPlayer = getCurrentPlayer();
    if (!currentPlayer) {
        handleError();
        return;
    }
    
    const currentAd = currentPlayer.ima3 && currentPlayer.ima3.adsManager ? currentPlayer.ima3.adsManager.getCurrentAd() : false;
    if (!currentAd) {
        handleError();
        return;
    }
    
    const lineItemIds = (currentAd.getWrapperAdIds() || []).filter(utils.nonEmptyString);
    const creativeId = getCreativeId(currentAd);
    
    const videoSection = utils.dom('div', {}, { className: 'gpt-bm__slot' });
    const list = utils.dom('ul');
    const lineItems = createListItem('Line Item ID(s): ', lineItemIds);
    const creativeIds = createListItem('Creative ID(s): ', creativeId);
    
    refresh.innerText = 'Refresh';
    list.appendChild(lineItems);
    list.appendChild(creativeIds);
    list.appendChild(refresh);    
    videoSection.appendChild(list);
    wrapper.appendChild(videoSection);
};

module.exports = {
    initVideo
};
