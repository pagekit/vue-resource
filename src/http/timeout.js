/**
 * Timeout Interceptor.
 */

export default function (request, next) {

    var timeout;

    if (request.timeout) {
        timeout = setTimeout(() => {
            request.cancel();
        }, request.timeout);
    }

    next((response) => {

        clearTimeout(timeout);

    });
}
