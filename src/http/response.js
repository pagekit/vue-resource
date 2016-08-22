/**
 * HTTP Response.
 */

import Headers from './headers';
import Promise from '../promise';
import { when, isBlob, isString } from '../util';

export default class Response {

    constructor(body, {url, headers, status, statusText}) {

        this.url = url;
        this.ok = status >= 200 && status < 300;
        this.status = status || 0;
        this.statusText = statusText || '';
        this.headers = new Headers(headers);
        this.body = body;

        if (isString(body)) {

            this.bodyText = body;

        } else if (isBlob(body)) {

            this.bodyBlob = body;

            if (isBlobText(body)) {
                this.bodyText = blobText(body);
            }
        }
    }

    blob() {
        return when(this.bodyBlob);
    }

    text() {
        return when(this.bodyText);
    }

    json() {
        return when(this.text(), text => JSON.parse(text));
    }

}

function blobText(body) {
    return new Promise((resolve) => {

        var reader = new FileReader();

        reader.readAsText(body);
        reader.onload = () => {
            resolve(reader.result);
        };

    });
}

function isBlobText(body) {
    return body.type.indexOf('text') === 0 || body.type.indexOf('json') !== -1;
}
