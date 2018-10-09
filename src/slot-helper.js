const utils = require('./utils');

let accountNumber = '';

/**
 * Returns the ID of a slot
 * @return {String}
 */
const getDomId = (slot) => {
    return slot.getSlotId().getDomId();
};

/**
 * Queries for Creatve and Line Item ID's for a slot
 * @return {Array}
 */
const getClientAdIds = (slot) => {
    const resp = slot.getResponseInformation();
    const params = {};

    if (resp && resp.creativeId) {
        params['Creative ID'] = [utils.dom('a', {}, {
            href: getLink('creative', resp.creativeId),
            target: '_new',
        }, resp.creativeId)];
    } else if (resp && resp.sourceAgnosticCreativeId) {
        params['Creative ID'] = [utils.dom('a', {}, {
            href: getLink('creative', resp.sourceAgnosticCreativeId),
            target: '_new',
        }, resp.sourceAgnosticCreativeId)];
    }

    if (resp && resp.lineItemId) {
        params['Line Item ID'] = [utils.dom('a', {}, {
            href: getLink('lineItem', resp.lineItemId),
            target: '_new',
        }, resp.lineItemId)];
    } else if (resp && resp.sourceAgnosticLineItemId) {
        params['Line Item ID'] = [utils.dom('a', {}, {
            href: getLink('lineItem', resp.sourceAgnosticLineItemId),
            target: '_new',
        }, resp.sourceAgnosticLineItemId)];
    }
    return params;
};

/**
 * Returns link to creative and line item
 * @return {String}
 */
const getLink = (type = '', id) => {
    const propercased = type.charAt(0).toUpperCase() + type.substr(1);
    return `https://admanager.google.com/${accountNumber}#delivery/${propercased}Detail/${type}Id=${id}`;
};

/**
 * Returns possible sizes for a slot
 * @return {Array}
 */
const getSlotSizes = (slot) => {
    const size_array = [];
    const sizes = slot.getSizes();
    for (let i = 0; i < sizes.length; i++) {
        if (typeof sizes[i] == 'string') {
            size_array.push(sizes[i]);
        } else {
            size_array.push(`${sizes[i].getWidth()}x${sizes[i].getHeight()}`);
        }
    }
    return size_array;
};

/**
 * Set the Ad Manager account number from the first slot returned
 * @param {Array} slots 
 */
const setAccountNumber = (slots = []) => {
    if (!accountNumber) {
        accountNumber = ((slots[0] || {}).getAdUnitPath() || '').split('/')[1];    
    }
};

module.exports = {
    accountNumber,
    getDomId,
    getClientAdIds,
    getLink,
    getSlotSizes,
    setAccountNumber,
};
