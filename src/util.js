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

    _.isArray = Array.isArray || function(value) {
        return Object.prototype.toString.call(value) === "[object Array]";
    };

    /**
     * Promise polyfill (https://github.com/RubenVerborgh/promiscuous)
     */

    _.Promise = window.Promise;

    if (!_.Promise) {

        _.Promise = (function (func, obj) {

            function is(type, item) { return (typeof item)[0] == type; }

            function Promise(callback, handler) {

                handler = function pendingHandler(resolved, rejected, value, queue, then, i) {

                    queue = pendingHandler.q;

                    if (resolved != is) {
                        return Promise(function (resolve, reject) {
                            queue.push({ p: this, r: resolve, j: reject, 1: resolved, 0: rejected });
                        });
                    }

                    if (value && (is(func, value) | is(obj, value))) {
                        try { then = value.then; }
                        catch (reason) { rejected = 0; value = reason; }
                    }

                    if (is(func, then)) {
                        var valueHandler = function (resolved) {
                            return function (value) { return then && (then = 0, pendingHandler(is, resolved, value)); };
                        };
                        try { then.call(value, valueHandler(1), rejected = valueHandler(0)); }
                        catch (reason) { rejected(reason); }

                    } else {

                        handler = function (Resolved, Rejected) {
                            if (!is(func, (Resolved = rejected ? Resolved : Rejected))) return callback;
                            return Promise(function (resolve, reject) { finalize(this, resolve, reject, value, Resolved); });
                        };

                        i = 0;

                        while (i < queue.length) {
                            then = queue[i++];
                            if (!is(func, resolved = then[rejected])) {
                                (rejected ? then.r : then.j)(value);
                            } else {
                                finalize(then.p, then.r, then.j, value, resolved);
                            }
                        }
                    }
                };

                handler.q = [];

                callback.call(callback = {
                        then:  function (resolved, rejected) { return handler(resolved, rejected); },
                        catch: function (rejected)           { return handler(0,        rejected); }
                    },
                    function (value)  { handler(is, 1,  value); },
                    function (reason) { handler(is, 0, reason); }
                );

                return callback;
            }

            // Finalizes the promise by resolving/rejecting it with the transformed value
            function finalize(promise, resolve, reject, value, transform) {
                setTimeout(function () {
                    try {
                        // Transform the value through and check whether it's a promise
                        value = transform(value);
                        transform = value && (is(obj, value) | is(func, value)) && value.then;
                        // Return the result if it's not a promise
                        if (!is(func, transform))
                            resolve(value);
                        // If it's a promise, make sure it's not circular
                        else if (value == promise)
                            reject(TypeError());
                        // Take over the promise's state
                        else
                            transform.call(value, resolve, reject);
                    }
                    catch (error) { reject(error); }
                }, 0);
            }

            Promise.resolve = ResolvedPromise;
            function ResolvedPromise(value) { return Promise(function (resolve) { resolve(value); }); }

            Promise.reject = function (reason) { return Promise(function (resolve, reject) { reject(reason); }); };

            Promise.all = function (promises) {
                return Promise(function (resolve, reject, count, values) {

                    values = [];
                    count  = promises.length || resolve(values);

                    promises.map(function (promise, index) {
                        ResolvedPromise(promise).then(
                        // Store the value and resolve if it was the last
                        function (value) {
                            values[index] = value;
                            count = count -1;
                            if(!count) resolve(values);
                        },
                        // Reject if one element fails
                        reject);
                    });
                });
            };

            return Promise;

        })('f', 'o');
    }

    return _;
};
