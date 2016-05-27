/**
 * Complete Interceptor.
 */

var _ = require('../util');

module.exports = {

    response: function (response) {

        if (_.isFunction(response.request.onComplete)) {
            response.request.onComplete.call(this, response);
        }

        return response;
    }

};
