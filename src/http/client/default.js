/**
 * Default client.
 */

var xhrClient = require('./xhr');

module.exports = function (request) {
    return (request.client || xhrClient)(request);
};
