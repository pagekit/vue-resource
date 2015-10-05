var Promise = require('./promise');

module.exports = function (_) {
    return {

        request: [

            function (options) {

                if (_.isObject(options.data) && /FormData/i.test(options.data.toString())) {
                    delete options.headers['Content-Type'];
                }

                if (_.isPlainObject(options.data)) {
                    options.data = JSON.stringify(options.data);
                }

                return options;
            }

        ],

        response: [

            function (response) {
                try {
                    response.data = JSON.parse(response.responseText);
                } catch (e) {
                    response.data = response.responseText;
                }

                return response.ok ? response : Promise.reject(response);
            }

        ]

    }
};