/**
 * Utility functions.
 */

module.exports = function (Vue) {

    var _ = Vue.util.extend({}, Vue.util);

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

    function extend (target, source, deep) {
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

    _.isFunction = function (obj) {
        return obj && typeof obj === 'function';
    };

    /**
     * Promise polyfill (https://gist.github.com/briancavalier/814313)
     */

    _.Promise = window.Promise;

    if (!_.Promise) {

        _.Promise = function (executor) {
            executor(this.resolve.bind(this), this.reject.bind(this));
            this._thens = [];
        };

        _.Promise.prototype = {

            then: function (onResolve, onReject, onProgress) {
                this._thens.push({resolve: onResolve, reject: onReject, progress: onProgress});
            },

            'catch': function (onReject) {
                this._thens.push({reject: onReject});
            },

            resolve: function (value) {
                this._complete('resolve', value);
            },

            reject: function (reason) {
                this._complete('reject', reason);
            },

            progress: function (status) {

                var i = 0, aThen;

                while (aThen = this._thens[i++]) {
                    aThen.progress && aThen.progress(status);
                }
            },

            _complete: function (which, arg) {

                this.then = which === 'resolve' ?
                    function (resolve, reject) { resolve && resolve(arg); } :
                    function (resolve, reject) { reject && reject(arg); };

                this.resolve = this.reject = this.progress =
                    function () { throw new Error('Promise already completed.'); };

                var aThen, i = 0;

                while (aThen = this._thens[i++]) {
                    aThen[which] && aThen[which](arg);
                }

                delete this._thens;
            }
        };
    }

    return _;
};
