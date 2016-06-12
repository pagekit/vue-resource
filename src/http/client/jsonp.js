/**
 * JSONP client.
 */

import Url from '../../url/index';
import Promise from '../../promise';

export default function (request) {
    return new Promise((resolve) => {

        var callback = '_jsonp' + Math.random().toString(36).substr(2), response = {request: request, data: null}, handler, script;

        request.params[request.jsonp] = callback;
        request.cancel = () => {
            handler({type: 'cancel'});
        };

        script = document.createElement('script');
        script.src = Url(request);
        script.type = 'text/javascript';
        script.async = true;

        window[callback] = (data) => {
            response.data = data;
        };

        handler = (event) => {

            if (event.type === 'load' && response.data !== null) {
                response.status = 200;
            } else if (event.type === 'error') {
                response.status = 404;
            } else {
                response.status = 0;
            }

            resolve(response);

            delete window[callback];
            document.body.removeChild(script);
        };

        script.onload = handler;
        script.onerror = handler;

        document.body.appendChild(script);
    });
}
