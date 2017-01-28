/**
 * JSONP client.
 */

import Promise from '../../promise';

export default function (request) {
    return new Promise(resolve => {

        var name = request.jsonp || 'callback', callback = '_jsonp' + Math.random().toString(36).substr(2), body = null, status = 0, handler, script;

        handler = ({type}) => {

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
        request.abort = () => {
            resolve(request.respondWith(body, {status}));
        };

        window[callback] = (result) => {
            body = JSON.stringify(result);
        };

        script = document.createElement('script');
        script.src = request.getUrl();
        script.type = 'text/javascript';
        script.async = true;
        script.onload = handler;
        script.onerror = handler;

        document.body.appendChild(script);
    });
}
