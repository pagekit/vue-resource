/**
 * Service for sending network requests.
 */

const jsonType = {'Content-Type': 'application/json'};

import cors from './cors';
import mime from './mime';
import jsonp from './jsonp';
import before from './before';
import method from './method';
import header from './header';
import timeout from './timeout';
import interceptor from './interceptor';
import Client from './client/index';
import Promise from '../promise';
import { error, extend, merge, isFunction, isObject } from '../util';

export default function Http(url, options) {

    var self = this || {}, client = Client, request, promise;

    Http.interceptors.forEach((handler) => {
        client = interceptor(handler, self.$vm)(client);
    });

    options = isObject(url) ? url : extend({url: url}, options);
    request = merge({}, Http.options, self.$options, options);
    promise = client(request).bind(self.$vm).then((response) => {

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
    method: 'get',
    data: '',
    params: {},
    headers: {},
    xhr: null,
    upload: null,
    jsonp: 'callback',
    beforeSend: null,
    crossOrigin: null,
    emulateHTTP: false,
    emulateJSON: false,
    timeout: 0
};

Http.headers = {
    put: jsonType,
    post: jsonType,
    patch: jsonType,
    delete: jsonType,
    common: {'Accept': 'application/json, text/plain, */*'},
    custom: {'X-Requested-With': 'XMLHttpRequest'}
};

Http.interceptors = [before, timeout, jsonp, method, mime, header, cors];

['get', 'put', 'post', 'patch', 'delete', 'jsonp'].forEach(function (method) {

    Http[method] = function (url, data, success, options) {

        if (isFunction(data)) {
            options = success;
            success = data;
            data = undefined;
        }

        if (isObject(success)) {
            options = success;
            success = undefined;
        }

        return this(url, extend({method: method, data: data, success: success}, options));
    };
});
