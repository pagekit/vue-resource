/**
 * Request.
 */

var xhr = require('./xhr');
var jsonp = require('./jsonp');

module.exports = function (_) {

    var originUrl = _.url.parse(location.href);

    return function (options) {

        if (options.crossOrigin === null) {
            options.crossOrigin = crossOrigin(options.url);
        }

        options.method = options.method.toUpperCase();
        options.headers = _.extend({}, _.http.headers.common,
            !options.crossOrigin ? _.http.headers.custom : {},
            _.http.headers[options.method.toLowerCase()],
            options.headers
        );

        if (_.isPlainObject(options.data) && /^(GET|JSONP)$/i.test(options.method)) {
            _.extend(options.params, options.data);
            delete options.data;
        }

        if (options.emulateHTTP && !options.crossOrigin && /^(PUT|PATCH|DELETE)$/i.test(options.method)) {
            options.headers['X-HTTP-Method-Override'] = options.method;
            options.method = 'POST';
        }

        return (options.method == 'JSONP' ? jsonp : xhr).call(this.vm, _, options);

    };

    function crossOrigin(url) {

        var requestUrl = _.url.parse(url);

        return (requestUrl.protocol !== originUrl.protocol || requestUrl.host !== originUrl.host);
    }

};