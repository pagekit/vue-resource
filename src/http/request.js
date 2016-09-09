/**
 * HTTP Request.
 */

import Url from '../url/index';
import Headers from './headers';
import Response from './response';
import { assign, toUpper } from '../util';

export default class Request {

    constructor(options) {

        this.body = null;
        this.params = {};

        const headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);

        assign(this, options, {
            method: toUpper(options.method || 'GET'),
            headers
        });
    }

    getUrl(){
        return Url(this);
    }

    getBody(){
        return this.body;
    }

    respondWith(body, options) {
        return new Response(body, assign(options || {}, {url: this.getUrl()}));
    }

}
