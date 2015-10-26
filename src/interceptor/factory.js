/**
 * Interceptor factory.
 */

var Promise = require('../lib/promise');

module.exports = function (_) {

    var skeleton = {

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

    return function (list) {

        list.forEach(function (interceptor) {

            if (_.isFunction(interceptor)) {
                interceptor = interceptor.call(this, Promise);
            }

            if (_.isPlainObject(interceptor) && interceptor.request) {
                skeleton.request.push(interceptor.request);
            }

            if (_.isPlainObject(interceptor) && interceptor.response) {
                skeleton.response.push(interceptor.response);
            }

        });

        return skeleton;

    };
};