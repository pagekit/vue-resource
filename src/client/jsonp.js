/**
 * JSONP request.
 */

var Promise = require('../lib/promise');

module.exports = function (_) {

    var handler;

    return {

        send: function (request) {

            var callback = '_jsonp' + Math.random().toString(36).substr(2), response = {}, script, body;

            request.params[request.jsonp] = callback;

            if (_.isFunction(request.beforeSend)) {
                request.beforeSend.call(this, {}, request);
            }

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
                            response.status = 200;
                            break;
                        case 'error':
                            response.status = 404;
                            break;
                        default:
                            response.status = 0;
                    }

                    response.ok = event.type === 'load';
                    response.reject = !response.ok;
                    response.responseText = body ? body : '';
                    response.header = function () {
                        return null
                    };

                    resolve(response);
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