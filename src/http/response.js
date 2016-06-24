/**
 * HTTP Response.
 */

export default class Response {

    constructor(body, {url, headers, status, statusText}) {

        this.url = url;
        this.body = body;
        this.headers = headers || {};
        this.status = status || 0;
        this.statusText = statusText || '';
        this.ok = status >= 200 && status < 300;

    }

    text() {
        return this.body;
    }

    blob() {
        return new Blob([this.body]);
    }

    json() {
        return JSON.parse(this.body);
    }

}
