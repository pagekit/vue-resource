/**
 * Service for interacting with RESTful services.
 */

var _ = require('./lib/util');

module.exports = function (Vue) {

    function Resource(url, params, actions) {

        var self = this, resource = {};

        actions = _.extend({},
            Resource.actions,
            actions
        );

        _.each(actions, function (action, name) {

            action = _.extend(true, {url: url, params: params || {}}, action);

            resource[name] = function () {
                return (self.$http || Vue.http)(opts(action, arguments));
            };
        });

        return resource;
    }

    function opts(action, args) {

        var options = _.extend({}, action), params = {}, data, success, error;

        switch (args.length) {

            case 4:

                error = args[3];
                success = args[2];

            case 3:
            case 2:

                if (_.isFunction (args[1])) {

                    if (_.isFunction (args[0])) {

                        success = args[0];
                        error = args[1];

                        break;
                    }

                    success = args[1];
                    error = args[2];

                } else {

                    params = args[0];
                    data = args[1];
                    success = args[2];

                    break;
                }

            case 1:

                if (_.isFunction (args[0])) {
                    success = args[0];
                } else if (/^(post|put|patch)$/i.test(options.method)) {
                    data = args[0];
                } else {
                    params = args[0];
                }

                break;

            case 0:

                break;

            default:

                throw 'Expected up to 4 arguments [params, data, success, error], got ' + args.length + ' arguments';
        }

        options.url = action.url;
        options.data = data;
        options.params = _.extend({}, action.params, params);

        if (success) {
            options.success = success;
        }

        if (error) {
            options.error = error;
        }

        return options;
    }

    Resource.actions = {

        get: {method: 'get'},
        save: {method: 'post'},
        query: {method: 'get'},
        update: {method: 'put'},
        remove: {method: 'delete'},
        delete: {method: 'delete'}

    };

    Object.defineProperty(Vue.prototype, '$resource', {

        get: function () {
            return Resource.bind(this);
        }

    });

    return Resource;
};
