/**
 * Create any type of HTML element
 * @param {String} tag
 * @param {Object} [style]
 * @param {Object} [props]
 * @param {String} [content]
 */
const dom = (tag, style, props, content, func) => {
    const element = document.createElement(tag);

    if (style) {
        setStyle(element, style);
    }

    if (props) {
        for (let key in props) {
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
};

/**
 * Sets the style values for an HTML Element
 * @param {HTMLElement} element
 * @param {Array} style
 */
const setStyle = (element, style) => {
    for (let key in style) {
        element.style[key] = style[key];
    }
};

const nonEmptyString = (str) => str !== '';

module.exports = {
    dom,
    nonEmptyString,
    setStyle
};
