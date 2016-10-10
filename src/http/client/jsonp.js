/**
 * JSONP client.
 */

import Promise from '../../promise';

const inBrowser = typeof window !== 'undefined';

export default function (request) {
    return new Promise((resolve) => {

        var name = request.jsonp || 'callback', callback = '_jsonp' + Math.random().toString(36).substr(2), body = null, handler, script;

        handler = ({type}) => {

            var status = 0;

            if (type === 'load' && body !== null) {
                status = 200;
            } else if (type === 'error') {
                status = 500;
            }

            resolve(request.respondWith(body, {status}));

            if (inBrowser) {
                delete window[callback];
                document.body.removeChild(script);
            }
        };

        request.params[name] = callback;

        if (inBrowser) {
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
        }
    });
}
