/**
 * Interceptor.
 */

var Promise = require('./promise');

module.exports = function (_) {

    return {

        parse: function (interceptorList) {

            var interceptorStack = {
                request: [],
                response: []
            };

            interceptorList.forEach(function (interceptor) {

                if (_.isFunction(interceptor)) {
                    interceptor = interceptor.call(this, Promise);
                }

                if (_.isPlainObject(interceptor) && interceptor.request) {
                    interceptorStack.request.push(interceptor.request);
                }

                if (_.isPlainObject(interceptor) && interceptor.response) {
                    interceptorStack.response.push(interceptor.response);
                }

            });

            return interceptorStack;

        },

        chain: function (interceptorStack, request) {
            return [].concat(interceptorStack.request, [request], interceptorStack.response);
        },

        run: function (chain, options, vm) {

            return chain.reduce(function (sequence, segment) {

                return sequence.then(function (carry) {
                    return segment.call(vm, carry);
                })

            }, Promise.resolve(options));

        }

    };

};