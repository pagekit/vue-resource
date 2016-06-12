/**
 * Utility functions.
 */

var util = {}, config = {}, array = [], console = window.console;

export default function (Vue) {
    util = Vue.util;
    config = Vue.config;
}

export const isArray = Array.isArray;

export function warn(msg) {
    if (console && util.warn && (!config.silent || config.debug)) {
        console.warn('[VueResource warn]: ' + msg);
    }
}

export function error(msg) {
    if (console) {
        console.error(msg);
    }
}

export function nextTick(cb, ctx) {
    return util.nextTick(cb, ctx);
}

export function trim(str) {
    return str.replace(/^\s*|\s*$/g, '');
}

export function toLower(str) {
    return str ? str.toLowerCase() : '';
}

export function isString(val) {
    return typeof val === 'string';
}

export function isFunction(val) {
    return typeof val === 'function';
}

export function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

export function isPlainObject(obj) {
    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
}

export function options(fn, obj, opts) {

    opts = opts || {};

    if (isFunction(opts)) {
        opts = opts.call(obj);
    }

    return merge(fn.bind({$vm: obj, $options: opts}), fn, {$options: opts});
}

export function each(obj, iterator) {

    var i, key;

    if (typeof obj.length == 'number') {
        for (i = 0; i < obj.length; i++) {
            iterator.call(obj[i], obj[i], i);
        }
    } else if (isObject(obj)) {
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                iterator.call(obj[key], obj[key], key);
            }
        }
    }

    return obj;
}

export function defaults(target, source) {

    for (var key in source) {
        if (target[key] === undefined) {
            target[key] = source[key];
        }
    }

    return target;
}

export function extend(target) {

    var args = array.slice.call(arguments, 1);

    args.forEach((arg) => {
        _merge(target, arg);
    });

    return target;
}

export function merge(target) {

    var args = array.slice.call(arguments, 1);

    args.forEach((arg) => {
        _merge(target, arg, true);
    });

    return target;
}

function _merge(target, source, deep) {
    for (var key in source) {
        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
            if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
                target[key] = {};
            }
            if (isArray(source[key]) && !isArray(target[key])) {
                target[key] = [];
            }
            _merge(target[key], source[key], deep);
        } else if (source[key] !== undefined) {
            target[key] = source[key];
        }
    }
}
