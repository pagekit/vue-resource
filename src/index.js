/**
 * Install plugin.
 */

function install (Vue) {

    var _ = require('./util');
    var Url = require('./url');
    var Http = require('./http');
    var Resource = require('./resource');

    Vue.url = Url;
    Vue.http = Http;
    Vue.resource = Resource;

    Object.defineProperties(Vue.prototype, {

        $url: {
            get: function () {
                return _.extend(Url.bind(this), Url);
            }
        },

        $http: {
            get: function () {
                return _.extend(Http.bind(this), Http);
            }
        },

        $resource: {
            get: function () {
                return Resource.bind(this);
            }
        }

    });

}

if (window.Vue) {
    Vue.use(install);
}

module.exports = install;
