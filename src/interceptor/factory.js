/**
 * Interceptor factory.
 */

var Promise = require('../lib/promise');

module.exports = function (_) {

    return function (list) {

        var stack = {

            run: function (request, vm) {

                var chain = [].concat(this.request, [function (request) {

                    return request.client.send(request);

                }], this.response);

                return chain.reduce(function (sequence, segment) {

                    return sequence.then(function (carry) {
                        return segment.call(vm, carry);
                    })

                }, Promise.resolve(request));

            },

            request: [],

            response: []

        };

        list.forEach(function (interceptor) {

            if (_.isFunction(interceptor)) {
                interceptor = interceptor.call(this, Promise);
            }

            if (_.isPlainObject(interceptor) && interceptor.request) {
                stack.request.push(interceptor.request);
            }

            if (_.isPlainObject(interceptor) && interceptor.response) {
                stack.response.push(interceptor.response);
            }

        });

        return stack;

    };
};