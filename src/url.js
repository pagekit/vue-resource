/**
 * Service for URL templating.
 */

var el = document.createElement('a');

module.exports = function (_) {

    function Url(url, params) {

        var urlParams = {}, queryParams = {}, options = url, query;

        if (!_.isPlainObject(options)) {
            options = {url: url, params: params};
        }

        options = _.extend(true, {},
            Url.options, this.options, options
        );

        url = options.url.replace(/(\/?):([a-z]\w*)/gi, function (match, slash, name) {

            if (options.params[name]) {
                urlParams[name] = true;
                return slash + encodeUriSegment(options.params[name]);
            }

            return '';
        });

        if (_.isString(options.root) && !url.match(/^(https?:)?\//)) {
            url = options.root + '/' + url;
        }

        _.each(options.params, function (value, key) {
            if (!urlParams[key]) {
                queryParams[key] = value;
            }
        });

        query = Url.params(queryParams);

        if (query) {
            url += (url.indexOf('?') == -1 ? '?' : '&') + query;
        }

        return url;
    }

    /**
     * Url options.
     */

    Url.options = {
        url: '',
        root: null,
        params: {}
    };

    /**
     * Encodes a Url parameter string.
     *
     * @param {Object} obj
     */

    Url.params = function (obj) {

        var params = [];

        params.add = function (key, value) {

            if (_.isFunction (value)) {
                value = value();
            }

            if (value === null) {
                value = '';
            }

            this.push(encodeUriSegment(key) + '=' + encodeUriSegment(value));
        };

        serialize(params, obj);

        return params.join('&');
    };

    /**
     * Parse a URL and return its components.
     *
     * @param {String} url
     */

    Url.parse = function (url) {

        el.href = url;

        return {
            href: el.href,
            protocol: el.protocol ? el.protocol.replace(/:$/, '') : '',
            port: el.port,
            host: el.host,
            hostname: el.hostname,
            pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,
            search: el.search ? el.search.replace(/^\?/, '') : '',
            hash: el.hash ? el.hash.replace(/^#/, '') : ''
        };
    };

    function serialize(params, obj, scope) {

        var array = _.isArray(obj), plain = _.isPlainObject(obj), hash;

        _.each(obj, function (value, key) {

            hash = _.isObject(value) || _.isArray(value);

            if (scope) {
                key = scope + '[' + (plain || hash ? key : '') + ']';
            }

            if (!scope && array) {
                params.add(value.name, value.value);
            } else if (hash) {
                serialize(params, value, key);
            } else {
                params.add(key, value);
            }
        });
    }

    function encodeUriSegment(value) {

        return encodeUriQuery(value, true).
            replace(/%26/gi, '&').
            replace(/%3D/gi, '=').
            replace(/%2B/gi, '+');
    }

    function encodeUriQuery(value, spaces) {

        return encodeURIComponent(value).
            replace(/%40/gi, '@').
            replace(/%3A/gi, ':').
            replace(/%24/g, '$').
            replace(/%2C/gi, ',').
            replace(/%20/g, (spaces ? '%20' : '+'));
    }

    return _.url = Url;
};
