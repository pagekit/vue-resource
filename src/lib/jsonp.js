/**
 * JSONP request.
 */

var Promise = require('./promise');

module.exports = function (_, options) {

    var callback = '_jsonp' + Math.random().toString(36).substr(2), response = {}, script, body;

    options.params[options.jsonp] = callback;

    if (_.isFunction(options.beforeSend)) {
        options.beforeSend.call(this, {}, options);
    }

    return new Promise(function (resolve) {

        script = document.createElement('script');
        script.src = _.url(options);
        script.type = 'text/javascript';
        script.async = true;

        window[callback] = function (data) {
            body = data;
        };

        var handler = function (event) {

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
            response.header = function () {return null};

            resolve(response);
        };

        if (options.timeout) {
            setTimeout(function () {
                handler({type: 'timeout'});
            }, options.timeout);
        }

        script.onload = handler;
        script.onerror = handler;

        document.body.appendChild(script);
    });

};
