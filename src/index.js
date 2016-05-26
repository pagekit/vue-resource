/**
 * Install plugin.
 */

function plugin(Vue) {

    if (plugin.installed) {
        return;
    }

    var _ = require('./util');

    _.config = Vue.config;
    _.warning = Vue.util.warn;
    _.nextTick = Vue.util.nextTick;

    Vue.url = require('./url');
    Vue.http = require('./http');
    Vue.resource = require('./resource');
    Vue.Promise = require('./promise');

    Object.defineProperties(Vue.prototype, {

        $url: {
            get() {
                return _.options(Vue.url, this, this.$options.url);
            }
        },

        $http: {
            get() {
                return _.options(Vue.http, this, this.$options.http);
            }
        },

        $resource: {
            get() {
                return Vue.resource.bind(this);
            }
        },

        $promise: {
            get() {
                return (executor) => new Vue.Promise(executor, this);
            }
        }

    });
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

module.exports = plugin;
