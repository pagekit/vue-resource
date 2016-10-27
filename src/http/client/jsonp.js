/**
 * JSONP client.
 */

import Promise from '../../promise';

export default function (request) {
    return new Promise((resolve) => {

        var name = request.jsonp || 'callback',
            reParams = new RegExp('(\\?|\\&)' + name + '=([^\\&]+)'),
            reqUrl = request.getUrl(),
            jsonpCallback = reqUrl.match(reParams) ? reqUrl.match(reParams)[2] : null,
            callback = jsonpCallback ? jsonpCallback : '_jsonp' + Math.random().toString(36).substr(2),
            body = null,
            handler,
            script;

        handler = ({type}) => {

            var status = 0;

            if (type === 'load' && body !== null) {
                status = 200;
            } else if (type === 'error') {
                status = 500;
            }

            resolve(request.respondWith(body, {status}));

            delete window[callback];
            document.body.removeChild(script);
        };

        request.params[name] = callback;

        window[callback] = (result) => {
            body = JSON.stringify(result);
        };

        script = document.createElement('script');
        script.src = reqUrl;
        script.type = 'text/javascript';
        script.async = true;
        script.onload = handler;
        script.onerror = handler;

        document.body.appendChild(script);
    });
}
