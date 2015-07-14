/**
 * JSONP request.
 */

var _ = require('./util');
var Promise = require('./promise');

module.exports = function (url, options) {

    var callback = '_jsonp' + Math.random().toString(36).substr(2), script, body;

    options.params[options.jsonp] = callback;

    if (_.isFunction(options.beforeSend)) {
        options.beforeSend.call(this, {}, options);
    }

    return new Promise(function (resolve, reject) {

        script = document.createElement('script');
        script.src = url(options.url, options.params);
        script.type = 'text/javascript';
        script.async = true;

        window[callback] = function (data) {
            body = data;
        };

        var handler = function (event) {

            delete window[callback];
            document.body.removeChild(script);

            if (event.type === 'load' && !body) {
                event.type = 'error';
            }

            var text = body ? body : event.type, status = event.type === 'error' ? 404 : 200;

            (status === 200 ? resolve : reject)({responseText: text, status: status});
        };

        script.onload = handler;
        script.onerror = handler;

        document.body.appendChild(script);
    });

};
