/**
 * Root Prefix Transform.
 */

import { isString } from '../util';

export default function (options, next) {

    var url = next(options);

    if (isString(options.root) && !url.match(/^(https?:)?\//)) {
        url = options.root + '/' + url;
    }

    return url;
}
