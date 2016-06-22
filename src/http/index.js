/**
 * Service for sending network requests.
 */

const CUSTOM_HEADERS = {'X-Requested-With': 'XMLHttpRequest'};
const COMMON_HEADERS = {'Accept': 'application/json, text/plain, */*'};
const JSON_CONTENT_TYPE = {'Content-Type': 'application/json;charset=utf-8'};

import cors from './cors';
import mime from './mime';
import jsonp from './jsonp';
import before from './before';
import method from './method';
import header from './header';
import timeout from './timeout';
import Client from './client/index';
import Promise from '../promise';
import { assign, defaults, error } from '../util';

export default function Http(options) {

    var self = this || {}, client = Client(self.$vm), request, promise;

    Http.interceptors.forEach((handler) => {
        client.use(handler);
    });

    request = defaults(options || {}, self.$options, Http.options);
    promise = client(request).then((response) => {

        return response.ok ? response : Promise.reject(response);

    }, (response) => {

        if (response instanceof Error) {
            error(response);
        }

        return Promise.reject(response);
    });

    if (request.success) {
        promise.success(request.success);
    }

    if (request.error) {
        promise.error(request.error);
    }

    return promise;
}

Http.options = {
    method: 'GET',
    params: {},
    headers: {}
};

Http.headers = {
    put: JSON_CONTENT_TYPE,
    post: JSON_CONTENT_TYPE,
    patch: JSON_CONTENT_TYPE,
    delete: JSON_CONTENT_TYPE,
    custom: CUSTOM_HEADERS,
    common: COMMON_HEADERS
};

Http.interceptors = [before, timeout, jsonp, method, mime, header, cors];

['get', 'delete', 'head', 'jsonp'].forEach((method) => {

    Http[method] = function (url, options) {
        return this(assign(options || {}, {url, method}));
    };

});

['post', 'put', 'patch'].forEach((method) => {

    Http[method] = function (url, data, options) {
        return this(assign(options || {}, {url, method, data}));
    };

});
