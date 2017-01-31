/**
 * CORS Interceptor.
 */

import Url from '../../url/index';
import xdrClient from '../client/xdr';
import { inBrowser } from '../../util';

const SUPPORTS_CORS = inBrowser && 'withCredentials' in new XMLHttpRequest();

export default function (request, next) {

    Object.defineProperty(request, 'crossOrigin', {

        get() {

            if (inBrowser) {

                var orgUrl = Url.parse(location.href);
                var reqUrl = Url.parse(request.getUrl());

                if (reqUrl.protocol !== orgUrl.protocol || reqUrl.host !== orgUrl.host) {

                    if (!SUPPORTS_CORS) {
                        request.client = xdrClient;
                    }

                    delete request.emulateHTTP;

                    return true;
                }
            }

            return false;
        }

    });

    next();
}
