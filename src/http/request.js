/**
 * HTTP Request.
 */

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

    getBody(){
        return this.body;
    }

    respondWith(body, options) {
        return new Response(body, options);
    }

}
