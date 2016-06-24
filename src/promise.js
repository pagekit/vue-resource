/**
 * Promise adapter.
 */

import PromiseLib from './lib/promise';

var PromiseObj = window.Promise || PromiseLib;

export default function Promise(executor, context) {

    if (executor instanceof PromiseObj) {
        this.promise = executor;
    } else {
        this.promise = new PromiseObj(executor.bind(context));
    }

    this.context = context;
}

Promise.all = function (iterable, context) {
    return new Promise(PromiseObj.all(iterable), context);
};

Promise.resolve = function (value, context) {
    return new Promise(PromiseObj.resolve(value), context);
};

Promise.reject = function (reason, context) {
    return new Promise(PromiseObj.reject(reason), context);
};

Promise.race = function (iterable, context) {
    return new Promise(PromiseObj.race(iterable), context);
};

var p = Promise.prototype;

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

    return new Promise(this.promise.then(fulfilled, rejected), this.context);
};

p.catch = function (rejected) {

    if (rejected && rejected.bind && this.context) {
        rejected = rejected.bind(this.context);
    }

    return new Promise(this.promise.catch(rejected), this.context);
};

p.finally = function (callback) {

    return this.then(function (value) {
            callback.call(this);
            return value;
        }, function (reason) {
            callback.call(this);
            return PromiseObj.reject(reason);
        }
    );
};
