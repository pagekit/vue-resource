/**
 * HTTP Response.
 */

import Headers from './headers';
import { isBlob, isString } from '../util';

export default class Response {

    constructor(body, {url, headers, status, statusText}) {

        this.url = url;
        this.ok = status >= 200 && status < 300;
        this.status = status || 0;
        this.statusText = statusText || '';
        this.headers = new Headers(headers);
        this.bodyBlob = null;
        this.bodyText = '';
        this.initBody(body);

    }

    blob() {
        return this.bodyBlob;
    }

    text() {
        return this.bodyText;
    }

    json() {
        return JSON.parse(this.text());
    }

    initBody(body) {

        if (isBlob(body)) {
            this.bodyBlob = body;
        }

        if (isString(body)) {
            this.bodyText = body;
        }
    }

}
