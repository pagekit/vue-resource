/**
 * JSONP request.
 */

var Promise = require('./promise');
var Response = require('./response');

module.exports = function (_) {

    var handler;

    return {

        send: function (request) {

            var callback = '_jsonp' + Math.random().toString(36).substr(2), script, status, body;

            request.params[request.jsonp] = callback;

            return new Promise(function (resolve) {

                script = document.createElement('script');
                script.src = _.url(request);
                script.type = 'text/javascript';
                script.async = true;

                window[callback] = function (data) {
                    body = data;
                };

                handler = function (event) {

                    if (event.type === 'load') {
                        delete window[callback];
                        document.body.removeChild(script);
                    }

                    if (event.type === 'load' && !body) {
                        event.type = 'error';
                    }

                    switch (event.type) {
                        case 'load':
                            status = 200;
                            break;
                        case 'error':
                            status = 404;
                            break;
                        default:
                            status = 0;
                    }

                    resolve(Response(body, status));
                };

                script.onload = handler;
                script.onerror = handler;

                document.body.appendChild(script);
            });

        },

        cancel: function () {
            handler({type: 'cancel'});
        }

    };
};
