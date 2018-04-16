const utils = require('./utils');

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
    const account = getAccountName(slot);
    const params = {};

    if (resp && resp.creativeId) {
        params['Creative ID'] = [utils.dom('a', {}, {
            href: getLink(account, 'creative', resp.creativeId),
            target: '_new',
        }, resp.creativeId)];
    } else if (resp && resp.sourceAgnosticCreativeId) {
        params['Creative ID'] = [utils.dom('a', {}, {
            href: getLink(account, 'creative', resp.sourceAgnosticCreativeId),
            target: '_new',
        }, resp.sourceAgnosticCreativeId)];
    }

    if (resp && resp.lineItemId) {
        params['Line Item ID'] = [utils.dom('a', {}, {
            href: getLink(account, 'lineItem', resp.lineItemId),
            target: '_new',
        }, resp.lineItemId)];
    } else if (resp && resp.sourceAgnosticLineItemId) {
        params['Line Item ID'] = [utils.dom('a', {}, {
            href: getLink(account, 'lineItem', resp.sourceAgnosticLineItemId),
            target: '_new',
        }, resp.sourceAgnosticLineItemId)];
    }
    return params;
};

/**
 * Returns link to creative and line item
 * @return {String}
 */
const getLink = (account, type, id) => {
    return `https://www.google.com/dfp/${account}#delivery/${type}Detail/${type}Id=${id}`;
};

/**
 * Returns the account name of a slot
 * @return {String}
 */
const getAccountName = (slot) => {
    const name = slot.getName();
    const pattern = /^\/(\d+)\//;
    return pattern.exec(name)[1];
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

module.exports = {
    getDomId,
    getClientAdIds,
    getLink,
    getAccountName,
    getSlotSizes
};
