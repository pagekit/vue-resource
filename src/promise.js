/**
 * Promise adapter.
 */

module.exports = function (_) {

    var Promise = window.Promise || require('./lib/promise')(_);

    var Adapter = function (executor) {

        if (executor instanceof Promise) {
            this.promise = executor;
        } else {
            this.promise = new Promise(executor);
        }

        this.context = undefined;
    };

    Adapter.all = function (iterable) {
        return new Adapter(Promise.all(iterable));
    };

    Adapter.resolve = function (value) {
        return new Adapter(Promise.resolve(value));
    };

    Adapter.reject = function (reason) {
        return new Adapter(Promise.reject(reason));
    };

    Adapter.race = function (iterable) {
        return new Adapter(Promise.race(iterable));
    };

    var p = Adapter.prototype;

    p.bind = function (context) {
        this.context = context;
        return this;
    };

    p.then = function (fulfilled, rejected) {

        if (fulfilled && fulfilled.bind && this.context) {
            fulfilled = fulfilled.bind(this.context);
        }

        if (rejected && rejected.bind && this.context) {
            rejected = rejected.bind(this.context);
        }

        this.promise = this.promise.then(fulfilled, rejected);

        return this;
    };

    p.catch = function (rejected) {

        if (rejected && rejected.bind && this.context) {
            rejected = rejected.bind(this.context);
        }

        this.promise = this.promise.catch(rejected);

        return this;
    };

    p.finally = function (callback) {

        return this.then(function (value) {
                callback.call(this);
                return value;
            }, function (reason) {
                callback.call(this);
                return Promise.reject(reason);
            }
        );
    };

    p.success = function (callback) {

        _.warn('The `success` method has been deprecated. Use the `then` method instead.');

        return this.then(function (response) {
            return callback.call(this, response.data, response.status, response) || response;
        });
    };

    p.error = function (callback) {

        _.warn('The `error` method has been deprecated. Use the `catch` method instead.');

        return this.catch(function (response) {
            return callback.call(this, response.data, response.status, response) || response;
        });
    };

    p.always = function (callback) {

        _.warn('The `always` method has been deprecated. Use the `finally` method instead.');

        var cb = function (response) {
            return callback.call(this, response.data, response.status, response) || response;
        };

        return this.then(cb, cb);
    };

    return Adapter;
};
