/**
 * Default client.
 */

module.exports = function (_) {

    var xhrClient = require('./xhr')(_);

    return function (request) {
        return (request.client || xhrClient)(request);
    };

};
