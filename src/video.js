const utils = require('./utils');

// let header;
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
    button = utils.dom('button', null, { className: 'gpt-bm__btn gpt-bm__btn--rect-sm gpt-bm__btn--black gpt-bm__btn--video' }, 'Video Info');
    error = utils.dom('p', {}, { className: 'gpt-bm__p--desc' }, '');
    button.addEventListener('click', handleButtonClick);
    wrapper.appendChild(button);

    refresh = utils.dom('button', null, { className: 'gpt-bm__btn gpt-bm__btn--rect-sm gpt-bm__btn--black gpt-bm__btn--video' }, 'Refresh');
    refresh.addEventListener('click', handleButtonClick);
    
    return wrapper;
};

/**
 * Button click handler for getting and refreshing video info
 */
const handleButtonClick = () => {
    const videoList = document.querySelectorAll('fbs-video');
    
    if (!videoList || videoList.length === 0) {
        handleError();
        return;
    }

    const videoInfo = getVideoInfo(videoList);
    buildSlots(videoInfo);
};

const buildSlots = (videos) => {
    const doc = document.querySelector('.gpt-bm__h2').innerText;
    if (doc === 'Video Level Info') { return; }
    
    const wrap = wrapper.appendChild(utils.dom('h2', {}, { className: 'gpt-bm__h2' }, 'Video Level Info'));
    

    videos.forEach((video, index) => {
        wrap.parentNode.insertBefore(ulBuilder(video, index), wrap.nextSibling);
    });

    button.disabled = true;
};

/**
 * Formats video information into a list
 * @param {Object} obj. The video info object 
 * @param {Number} index. The index of the video element 
 * @returns list of video information
 */
const ulBuilder = (obj, index) => {
    const ulDom = utils.dom('ul');

    if (index === 0) {
        ulDom.style.marginTop = '10px';
    }

    for (let key in obj) {
        const keyDom = utils.dom('b', {}, {}, `${key}: `);
        const liDom = utils.dom('li', {}, {});

        liDom.appendChild(keyDom);
        liDom.appendChild(document.createTextNode(obj[key]));
        ulDom.appendChild(liDom);
    }

    return ulDom;
};

/**
 * Retreives video info from the video element
 * @param {Array} videos. The video elements to get info from 
 * @returns {Object} The video info of
 */
const getVideoInfo = (videos) => {
    const formattedVideos = [];

    videos.forEach((video) => {
        const adUnitPath = video.getAttribute('ad-unit-path') || '';
        const playerId = video.getAttribute('player-id') || '';
        const playerType = video.getAttribute('player-type');
        const isMuted = video.getAttribute('muted');
        const isAutoplay = video.getAttribute('autoplay');
        const keyValueString = video.getAttribute('key-value-string');
        const videoId = video.getAttribute('video-id') || '';
        const adsDisabled = video.getAttribute('ads-disabled') || '';
        const queries = (keyValueString && keyValueString.split('&')) || [];

        const videoInfo = {
            adUnitPath,
            playerId,
            playerType,
            muted: Boolean(isMuted) || true,
            adsDisabled: Boolean(adsDisabled) || false,
            videoId,
            autoplay: Boolean(isAutoplay) || true,
            pos: playerType === 'in-body' ? 'vid-iab' : ''
        };

        queries.forEach((query) => {
            if (query.indexOf('pos') !== -1) {
                videoInfo.pos = query.split('=')[1];
            }
        });

        formattedVideos.push(videoInfo);
    });

    return formattedVideos;
};

/**
 * Displays error message when failures occur
 */
const handleError = () => {
    refresh.innerText = 'Retry'; 
    error.innerHTML = 'There is no video ad data available.';
    wrapper.appendChild(error);
    wrapper.appendChild(refresh);
};

module.exports = {
    initVideo
};
