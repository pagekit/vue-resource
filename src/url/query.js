/**
 * Query Parameter Transform.
 */

import Url from './index';
import { each } from '../util';

export default function (options, next) {

    var urlParams = Object.keys(Url.options.params), query = {}, url = next(options);

    each(options.params, (value, key) => {
        if (urlParams.indexOf(key) === -1) {
            query[key] = value;
        }
    });

    query = Url.params(query);

    if (query) {
        url += (url.indexOf('?') == -1 ? '?' : '&') + query;
    }

    return url;
}
