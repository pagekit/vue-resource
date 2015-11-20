/**
 * Interceptor factory.
 */

var Promise = require('../lib/promise');

module.exports = function (_) {

    return function (handler, vm) {
        return function (client) {
            return function (request) {

                if (_.isFunction(handler.request)) {
                    request = handler.request.call(vm, request);
                }

                return when(request, function (request) {
                    return when(client(request), function (response) {

                        if (_.isFunction(handler.response)) {
                            response = handler.response.call(vm, response);
                        }

                        return response;
                    });
                });
            };
        };
    };

    function when(value, fulfilled, rejected) {

        var promise = Promise.resolve(value);

        if (arguments.length < 2) {
            return promise;
        }

        return promise.then(fulfilled, rejected);
    }

};
