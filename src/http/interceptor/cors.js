/**
 * CORS Interceptor.
 */

import Url from '../../url/index';
import xdrClient from '../client/xdr';
import {inBrowser} from '../../util';

const SUPPORTS_CORS = inBrowser && 'withCredentials' in new XMLHttpRequest();

export default function (request) {

    if (inBrowser) {

        const orgUrl = Url.parse(location.href);
        const reqUrl = Url.parse(request.getUrl());

        if (reqUrl.protocol !== orgUrl.protocol || reqUrl.host !== orgUrl.host) {

            request.crossOrigin = true;
            request.emulateHTTP = false;

            if (!SUPPORTS_CORS) {
                request.client = xdrClient;
            }
        }
    }

}
