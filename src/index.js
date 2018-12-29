/**
 * Install plugin.
 */

import Url from './url/index';
import Http from './http/index';
import Resource from './resource';
import Util, {options} from './util';

function plugin(Vue) {

    if (plugin.installed) {
        return;
    }

    Util(Vue);

    Vue.url = Url;
    Vue.http = Http;
    Vue.resource = Resource;

    Object.defineProperties(Vue.prototype, {

        $url: {
            get() {
                return options(Vue.url, this, this.$options.url);
            }
        },

        $http: {
            get() {
                return options(Vue.http, this, this.$options.http);
            }
        },

        $resource: {
            get() {
                return Vue.resource.bind(this);
            }
        }

    });
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

export default plugin;
