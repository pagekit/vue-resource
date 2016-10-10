/**
 * CORS Interceptor.
 */

import Url from '../../url/index';
import xdrClient from '../client/xdr';
import { isBoolean } from '../../util';

const inBrowser = typeof window !== 'undefined';
const ORIGIN_URL =  Url.parse(inBrowser ? location.href : '');
const SUPPORTS_CORS = inBrowser ? 'withCredentials' in new XMLHttpRequest() : true;

export default function (request, next) {

    if (!isBoolean(request.crossOrigin) && crossOrigin(request)) {
        request.crossOrigin = true;
    }

    if (request.crossOrigin) {

        if (!SUPPORTS_CORS) {
            request.client = xdrClient;
        }

        delete request.emulateHTTP;
    }

    next();
}

function crossOrigin(request) {

    var requestUrl = Url.parse(Url(request));

    return (requestUrl.protocol !== ORIGIN_URL.protocol || requestUrl.host !== ORIGIN_URL.host);
}
