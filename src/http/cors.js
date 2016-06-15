/**
 * CORS Interceptor.
 */

import Url from '../url/index';
import xdrClient from './client/xdr';

const originUrl = Url.parse(location.href);
const supportCors = 'withCredentials' in new XMLHttpRequest();

export default function (request, next) {

    if (request.crossOrigin === null) {
        request.crossOrigin = crossOrigin(request);
    }

    if (request.crossOrigin) {

        if (!supportCors) {
            request.client = xdrClient;
        }

        request.emulateHTTP = false;
    }

    next();
}

function crossOrigin(request) {

    var requestUrl = Url.parse(Url(request));

    return (requestUrl.protocol !== originUrl.protocol || requestUrl.host !== originUrl.host);
}
