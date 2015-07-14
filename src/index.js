/**
 * Install plugin.
 */

function install(Vue) {
    Vue.url = require('./url')(Vue);
    Vue.http = require('./http')(Vue);
    Vue.resource = require('./resource')(Vue);
}

if (window.Vue) {
    Vue.use(install);
}

module.exports = install;
