/**
 * CORS Interceptor.
 */

module.exports = function (_) {

    var xhrCors = 'withCredentials' in new XMLHttpRequest();
    var originUrl = _.url.parse(location.href);

    return {

        request: function (request) {

            if (request.crossOrigin === null) {
                request.crossOrigin = crossOrigin(request.url);
            }

            if (request.crossOrigin && !xhrCors) {
                request.client = require('../client/xdr')(_);
            }

            return request;
        }

    };

    function crossOrigin(url) {

        var requestUrl = _.url.parse(url);

        return (requestUrl.protocol !== originUrl.protocol || requestUrl.host !== originUrl.host);
    }

};
