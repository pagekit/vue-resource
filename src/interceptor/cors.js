/**
 * CORS Interceptor.
 */

module.exports = function (_) {

    var originUrl = _.url.parse(location.href);
    var xdrClient = require('../client/jsonp')(_);
    var xhrCors = 'withCredentials' in new XMLHttpRequest();

    return {

        request: function (request) {

            if (request.crossOrigin === null) {
                request.crossOrigin = crossOrigin(request);
            }

            if (request.crossOrigin) {

                if (!xhrCors) {
                    request.client = xdrClient;
                }

                request.emulateHTTP = false;
            }

            return request;
        }

    };

    function crossOrigin(request) {

        var requestUrl = _.url.parse(_.url(request));

        return (requestUrl.protocol !== originUrl.protocol || requestUrl.host !== originUrl.host);
    }

};
