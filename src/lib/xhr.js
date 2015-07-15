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
