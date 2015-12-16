module.exports = function (_) {

    var Promise = window.Promise || require('./lib/promise')(_);

    var Adapter = function (executor) {

        if (executor instanceof Promise) {
            this.promise = executor;
        } else {
            this.promise = new Promise(executor);
        }

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

    Adapter.prototype.bind = function (context) {
        this.context = context;
        return this;
    };

    Adapter.prototype.catch = function (onRejected) {

        if (onRejected && this.context) {
            onRejected = onRejected.bind(this.context);
        }

        this.promise = this.promise.catch(onRejected);
        return this;
    };

    Adapter.prototype.then = function (onFulfilled, onRejected) {

        if (onFulfilled && this.context) {
            onFulfilled = onFulfilled.bind(this.context);
        }

        if (onRejected && this.context) {
            onRejected = onRejected.bind(this.context);
        }

        this.promise = this.promise.then(onFulfilled, onRejected);
        return this;
    };

    Adapter.prototype.finally = function (callback) {

        return this.then(

            function (value) {

                callback.call(this);
                return value;

            },

            function (value) {

                callback.call(this);
                return Promise.reject(value);

            }

        );

    };

    return Adapter;

};