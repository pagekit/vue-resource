/**
 * Client.
 */

var xhrClient = require('./xhr');
var Promise = require('../../promise');

module.exports = function (request) {

    var response = (request.client || xhrClient)(request);

    return Promise.resolve(response).then(function (response) {
        response.ok = response.status >= 200 && response.status < 300;
        return response;
    }, function (response) {
        response.ok = false;
        return Promise.reject(response);
    });

};
