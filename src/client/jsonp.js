/**
 * JSONP client.
 */

var Promise = require('../lib/promise');

module.exports = function (_) {

    return function (request) {
        return new Promise(function (resolve) {

            var callback = '_jsonp' + Math.random().toString(36).substr(2), response = {request: request}, handler, script;

            request.params[request.jsonp] = callback;
            request.cancel = function () {
                handler({type: 'cancel'});
            };

            script = document.createElement('script');
            script.src = _.url(request);
            script.type = 'text/javascript';
            script.async = true;

            window[callback] = function (data) {
                response.data = data;
            };

            handler = function (event) {

                if (event.type === 'load') {
                    delete window[callback];
                    document.body.removeChild(script);
                }

                if (event.type === 'load' && !response.data) {
                    event.type = 'error';
                }

                switch (event.type) {
                    case 'load':
                        response.status = 200;
                        break;
                    case 'error':
                        response.status = 404;
                        break;
                    default:
                        response.status = 0;
                }

                resolve(response);
            };

            script.onload = handler;
            script.onerror = handler;

            document.body.appendChild(script);
        });
    };

};
