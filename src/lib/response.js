/**
 * Response object.
 */

module.exports = function (body, status) {

    return {
        ok: status >= 200 && status < 300,
        status: status || 0,
        responseText: body || ''
    };

};
