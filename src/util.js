/**
 * Utility functions.
 */

import Promise from './promise';

var {hasOwnProperty} = {}, {slice} = [], debug = false, ntick;

export const inBrowser = typeof window !== 'undefined';

export default function ({config, nextTick}) {
    ntick = nextTick;
    debug = config.debug || !config.silent;
}

export function warn(msg) {
    if (typeof console !== 'undefined' && debug) {
        console.warn('[VueResource warn]: ' + msg);
    }
}

export function error(msg) {
    if (typeof console !== 'undefined') {
        console.error(msg);
    }
}

export function nextTick(cb, ctx) {
    return ntick(cb, ctx);
}

export function trim(str) {
    return str ? str.replace(/^\s*|\s*$/g, '') : '';
}

export function toLower(str) {
    return str ? str.toLowerCase() : '';
}

export function toUpper(str) {
    return str ? str.toUpperCase() : '';
}

export const isArray = Array.isArray;

export function isString(val) {
    return typeof val === 'string';
}

export function isBoolean(val) {
    return val === true || val === false;
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

export function isBlob(obj) {
    return typeof Blob !== 'undefined' && obj instanceof Blob;
}

export function isFormData(obj) {
    return typeof FormData !== 'undefined' && obj instanceof FormData;
}

export function when(value, fulfilled, rejected) {

    var promise = Promise.resolve(value);

    if (arguments.length < 2) {
        return promise;
    }

    return promise.then(fulfilled, rejected);
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

    if (isArray(obj)) {
        for (i = 0; i < obj.length; i++) {
            iterator.call(obj[i], obj[i], i);
        }
    } else if (isObject(obj)) {
        for (key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                iterator.call(obj[key], obj[key], key);
            }
        }
    }

    return obj;
}

export const assign = Object.assign || _assign;

export function merge(target) {

    var args = slice.call(arguments, 1);

    args.forEach(source => {
        _merge(target, source, true);
    });

    return target;
}

export function defaults(target) {

    var args = slice.call(arguments, 1);

    args.forEach(source => {

        for (var key in source) {
            if (target[key] === undefined) {
                target[key] = source[key];
            }
        }

    });

    return target;
}

function _assign(target) {

    var args = slice.call(arguments, 1);

    args.forEach(source => {
        _merge(target, source);
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
