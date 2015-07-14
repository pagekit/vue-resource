/**
 * XMLHttp request.
 */

var _ = require('./util');
var Promise = require('./promise');

module.exports = function (url, options) {

    var request = new XMLHttpRequest(), promise;

    if (_.isFunction(options.beforeSend)) {
        options.beforeSend.call(this, request, options);
    }

    if (options.emulateHTTP && /^(put|patch|delete)$/i.test(options.method)) {
        options.headers['X-HTTP-Method-Override'] = options.method;
        options.method = 'post';
    }

    if (options.emulateJSON && _.isPlainObject(options.data)) {
        options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        options.data = url.params(options.data);
    }

    if (_.isObject(options.data) && /FormData/i.test(options.data.toString())) {
        delete options.headers['Content-Type'];
    }

    if (_.isPlainObject(options.data)) {
        options.data = JSON.stringify(options.data);
    }

    promise = new Promise(function (resolve, reject) {

        request.open(options.method, url(options), true);

        _.each(options.headers, function (value, header) {
            request.setRequestHeader(header, value);
        });

        request.onreadystatechange = function () {

            if (this.readyState === 4) {

                if (this.status >= 200 && this.status < 300) {
                    resolve(this);
                } else {
                    reject(this);
                }
            }
        };

        request.send(options.data);
    });

    _.extend(promise, {

        abort: function () {
            request.abort();
        }

    });

    return promise;
};
