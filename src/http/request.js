/**
 * HTTP Request.
 */

import Url from '../url/index';
import Response from './response';
import { assign } from '../util';

export default class Request {

    constructor(options) {

        this.method = 'GET';
        this.body = null;
        this.params = {};
        this.headers = {};

        assign(this, options);
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
