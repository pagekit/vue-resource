/**
 * Utility functions.
 */

var _ = exports;

_.isArray = Array.isArray;

_.isFunction = function (obj) {
    return obj && typeof obj === 'function';
};

_.isObject = function (obj) {
    return obj !== null && typeof obj === 'object';
};

_.isPlainObject = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
};

_.options = function (key, obj, options) {

    var opts = obj.$options || {};

    return _.extend({},
        opts[key],
        options
    );
};

_.each = function (obj, iterator) {

    var i, key;

    if (typeof obj.length == 'number') {
        for (i = 0; i < obj.length; i++) {
            iterator.call(obj[i], obj[i], i);
        }
    } else if (_.isObject(obj)) {
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                iterator.call(obj[key], obj[key], key);
            }
        }
    }

    return obj;
};

_.extend = function (target) {

    var array = [], args = array.slice.call(arguments, 1), deep;

    if (typeof target == 'boolean') {
        deep = target;
        target = args.shift();
    }

    args.forEach(function (arg) {
        extend(target, arg, deep);
    });

    return target;
};

function extend(target, source, deep) {
    for (var key in source) {
        if (deep && (_.isPlainObject(source[key]) || _.isArray(source[key]))) {
            if (_.isPlainObject(source[key]) && !_.isPlainObject(target[key])) {
                target[key] = {};
            }
            if (_.isArray(source[key]) && !_.isArray(target[key])) {
                target[key] = [];
            }
            extend(target[key], source[key], deep);
        } else if (source[key] !== undefined) {
            target[key] = source[key];
        }
    }
}
