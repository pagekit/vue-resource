/**
 * vue-resource v0.1.16
 * https://github.com/vuejs/vue-resource
 * Released under the MIT License.
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["VueResource"] = factory();
	else
		root["VueResource"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Install plugin.
	 */

	function install(Vue) {

	    var _ = __webpack_require__(1)(Vue);

	    Vue.url = __webpack_require__(2)(_);
	    Vue.http = __webpack_require__(3)(_);
	    Vue.resource = __webpack_require__(16)(_);

	    Object.defineProperties(Vue.prototype, {

	        $url: {
	            get: function () {
	                return _.options(Vue.url, this, this.$options.url);
	            }
	        },

	        $http: {
	            get: function () {
	                return _.options(Vue.http, this, this.$options.http);
	            }
	        },

	        $resource: {
	            get: function () {
	                return Vue.resource.bind(this);
	            }
	        }

	    });
	}

	if (window.Vue) {
	    Vue.use(install);
	}

	module.exports = install;


/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * Utility functions.
	 */

	module.exports = function (Vue) {

	    var _ = Vue.util.extend({}, Vue.util), config = Vue.config;

	    _.warn = function (msg) {
	        if (window.console && (!config.silent || config.debug)) {
	            console.warn('[VueResource warn]: ' + msg);
	        }
	    };

	    _.trim = function (str) {
	        return str.replace(/^\s*|\s*$/g, '');
	    };

	    _.toLower = function (str) {
	        return str ? str.toLowerCase() : '';
	    };

	    _.isString = function (value) {
	        return typeof value === 'string';
	    };

	    _.isFunction = function (value) {
	        return typeof value === 'function';
	    };

	    _.options = function (fn, obj, options) {

	        options = options || {};

	        if (_.isFunction(options)) {
	            options = options.call(obj);
	        }

	        return _.extend(fn.bind({vm: obj, options: options}), fn, {options: options});
	    };

	    _.each = function (obj, iterator) {

	        var i, key;

	        if (typeof obj.length == 'number') {
	            for (i = 0; i < obj.length; i++) {
	                iterator.call(obj[i], obj[i], i);
	            }
	        } else if (_.isObject(obj)) {
	            for (key in obj) {
	                if (obj.hasOwnProperty(key)) {
	                    iterator.call(obj[key], obj[key], key);
	                }
	            }
	        }

	        return obj;
	    };

	    _.extend = function (target) {

	        var array = [], args = array.slice.call(arguments, 1), deep;

	        if (typeof target == 'boolean') {
	            deep = target;
	            target = args.shift();
	        }

	        args.forEach(function (arg) {
	            extend(target, arg, deep);
	        });

	        return target;
	    };

	    function extend(target, source, deep) {
	        for (var key in source) {
	            if (deep && (_.isPlainObject(source[key]) || _.isArray(source[key]))) {
	                if (_.isPlainObject(source[key]) && !_.isPlainObject(target[key])) {
	                    target[key] = {};
	                }
	                if (_.isArray(source[key]) && !_.isArray(target[key])) {
	                    target[key] = [];
	                }
	                extend(target[key], source[key], deep);
	            } else if (source[key] !== undefined) {
	                target[key] = source[key];
	            }
	        }
	    }

	    return _;
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * Service for URL templating.
	 */

	var ie = document.documentMode;
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

	        if (ie) {
	            el.href = url;
	            url = el.href;
	        }

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Service for sending network requests.
	 */

	var Promise = __webpack_require__(4);
	var jsonType = {'Content-Type': 'application/json'};

	module.exports = function (_) {

	    var interceptor = __webpack_require__(5)(_);
	    var defaultClient = __webpack_require__(6)(_);

	    function Http(url, options) {

	        var client = defaultClient, request, promise;

	        if (_.isPlainObject(url)) {
	            options = url;
	            url = '';
	        }

	        request = _.extend({url: url}, options);
	        request = _.extend(true, {},
	            Http.options, this.options, request
	        );

	        Http.interceptors.forEach(function (i) {
	            client = interceptor(i, this.vm)(client);
	        }, this);

	        promise = extendPromise(client(request).then(function (response) {

	            response.ok = response.status >= 200 && response.status < 300;
	            return response.ok ? response : Promise.reject(response);

	        }), this.vm);

	        if (request.success) {
	            promise = promise.success(request.success);
	        }

	        if (request.error) {
	            promise = promise.error(request.error);
	        }

	        return promise;
	    }

	    function extendPromise(promise, vm) {

	        promise.success = function (fn) {

	            return extendPromise(promise.then(function (response) {
	                return fn.call(vm, response.data, response.status, response) || response;
	            }), vm);

	        };

	        promise.error = function (fn) {

	            return extendPromise(promise.then(undefined, function (response) {
	                return fn.call(vm, response.data, response.status, response) || response;
	            }), vm);

	        };

	        promise.always = function (fn) {

	            var cb = function (response) {
	                return fn.call(vm, response.data, response.status, response) || response;
	            };

	            return extendPromise(promise.then(cb, cb), vm);
	        };

	        return promise;
	    }

	    Http.options = {
	        method: 'get',
	        params: {},
	        data: '',
	        xhr: null,
	        jsonp: 'callback',
	        beforeSend: null,
	        crossOrigin: null,
	        emulateHTTP: false,
	        emulateJSON: false,
	        timeout: 0
	    };

	    Http.interceptors = [
	        __webpack_require__(8)(_),
	        __webpack_require__(9)(_),
	        __webpack_require__(11)(_),
	        __webpack_require__(12)(_),
	        __webpack_require__(13)(_),
	        __webpack_require__(14)(_),
	        __webpack_require__(15)(_)
	    ];

	    Http.headers = {
	        put: jsonType,
	        post: jsonType,
	        patch: jsonType,
	        delete: jsonType,
	        common: {'Accept': 'application/json, text/plain, */*'},
	        custom: {'X-Requested-With': 'XMLHttpRequest'}
	    };

	    ['get', 'put', 'post', 'patch', 'delete', 'jsonp'].forEach(function (method) {

	        Http[method] = function (url, data, success, options) {

	            if (_.isFunction(data)) {
	                options = success;
	                success = data;
	                data = undefined;
	            }

	            return this(url, _.extend({method: method, data: data, success: success}, options));
	        };
	    });

	    return _.http = Http;
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * Promises/A+ polyfill v1.1.0 (https://github.com/bramstein/promis)
	 */

	var RESOLVED = 0;
	var REJECTED = 1;
	var PENDING  = 2;

	function Promise(executor) {

	    this.state = PENDING;
	    this.value = undefined;
	    this.deferred = [];

	    var promise = this;

	    try {
	        executor(function (x) {
	            promise.resolve(x);
	        }, function (r) {
	            promise.reject(r);
	        });
	    } catch (e) {
	        promise.reject(e);
	    }
	}

	Promise.reject = function (r) {
	    return new Promise(function (resolve, reject) {
	        reject(r);
	    });
	};

	Promise.resolve = function (x) {
	    return new Promise(function (resolve, reject) {
	        resolve(x);
	    });
	};

	Promise.all = function all(iterable) {
	    return new Promise(function (resolve, reject) {
	        var count = 0,
	            result = [];

	        if (iterable.length === 0) {
	            resolve(result);
	        }

	        function resolver(i) {
	            return function (x) {
	                result[i] = x;
	                count += 1;

	                if (count === iterable.length) {
	                    resolve(result);
	                }
	            };
	        }

	        for (var i = 0; i < iterable.length; i += 1) {
	            iterable[i].then(resolver(i), reject);
	        }
	    });
	};

	Promise.race = function race(iterable) {
	    return new Promise(function (resolve, reject) {
	        for (var i = 0; i < iterable.length; i += 1) {
	            iterable[i].then(resolve, reject);
	        }
	    });
	};

	var p = Promise.prototype;

	p.resolve = function resolve(x) {
	    var promise = this;

	    if (promise.state === PENDING) {
	        if (x === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }

	        var called = false;

	        try {
	            var then = x && x['then'];

	            if (x !== null && typeof x === 'object' && typeof then === 'function') {
	                then.call(x, function (x) {
	                    if (!called) {
	                        promise.resolve(x);
	                    }
	                    called = true;

	                }, function (r) {
	                    if (!called) {
	                        promise.reject(r);
	                    }
	                    called = true;
	                });
	                return;
	            }
	        } catch (e) {
	            if (!called) {
	                promise.reject(e);
	            }
	            return;
	        }
	        promise.state = RESOLVED;
	        promise.value = x;
	        promise.notify();
	    }
	};

	p.reject = function reject(reason) {
	    var promise = this;

	    if (promise.state === PENDING) {
	        if (reason === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }

	        promise.state = REJECTED;
	        promise.value = reason;
	        promise.notify();
	    }
	};

	p.notify = function notify() {
	    var promise = this;

	    async(function () {
	        if (promise.state !== PENDING) {
	            while (promise.deferred.length) {
	                var deferred = promise.deferred.shift(),
	                    onResolved = deferred[0],
	                    onRejected = deferred[1],
	                    resolve = deferred[2],
	                    reject = deferred[3];

	                try {
	                    if (promise.state === RESOLVED) {
	                        if (typeof onResolved === 'function') {
	                            resolve(onResolved.call(undefined, promise.value));
	                        } else {
	                            resolve(promise.value);
	                        }
	                    } else if (promise.state === REJECTED) {
	                        if (typeof onRejected === 'function') {
	                            resolve(onRejected.call(undefined, promise.value));
	                        } else {
	                            reject(promise.value);
	                        }
	                    }
	                } catch (e) {
	                    reject(e);
	                }
	            }
	        }
	    });
	};

	p.catch = function (onRejected) {
	    return this.then(undefined, onRejected);
	};

	p.then = function then(onResolved, onRejected) {
	    var promise = this;

	    return new Promise(function (resolve, reject) {
	        promise.deferred.push([onResolved, onRejected, resolve, reject]);
	        promise.notify();
	    });
	};

	var queue = [];
	var async = function (callback) {
	    queue.push(callback);

	    if (queue.length === 1) {
	        async.async();
	    }
	};

	async.run = function () {
	    while (queue.length) {
	        queue[0]();
	        queue.shift();
	    }
	};

	if (window.MutationObserver) {
	    var el = document.createElement('div');
	    var mo = new MutationObserver(async.run);

	    mo.observe(el, {
	        attributes: true
	    });

	    async.async = function () {
	        el.setAttribute("x", 0);
	    };
	} else {
	    async.async = function () {
	        setTimeout(async.run);
	    };
	}

	module.exports = window.Promise || Promise;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Interceptor factory.
	 */

	var Promise = __webpack_require__(4);

	module.exports = function (_) {

	    return function (handler, vm) {
	        return function (client) {
	            return function (request) {

	                if (_.isFunction(handler.request)) {
	                    request = handler.request.call(vm, request);
	                }

	                return when(request, function (request) {
	                    return when(client(request), function (response) {

	                        if (_.isFunction(handler.response)) {
	                            response = handler.response.call(vm, response);
	                        }

	                        return response;
	                    });
	                });
	            };
	        };
	    };

	    function when(value, fulfilled, rejected) {

	        var promise = Promise.resolve(value);

	        if (arguments.length < 2) {
	            return promise;
	        }

	        return promise.then(fulfilled, rejected);
	    }

	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Default client.
	 */

	module.exports = function (_) {

	    var xhrClient = __webpack_require__(7)(_);

	    return function (request) {
	        return (request.client || xhrClient)(request);
	    };

	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * XMLHttp client.
	 */

	var Promise = __webpack_require__(4);

	module.exports = function (_) {

	    return function (request) {
	        return new Promise(function (resolve) {

	            var xhr = new XMLHttpRequest(), response = {request: request}, handler;

	            request.cancel = function () {
	                xhr.abort();
	            };

	            xhr.open(request.method, _.url(request), true);

	            if (_.isPlainObject(request.xhr)) {
	                _.extend(xhr, request.xhr);
	            }

	            _.each(request.headers || {}, function (value, header) {
	                xhr.setRequestHeader(header, value);
	            });

	            handler = function (event) {

	                response.data = xhr.responseText;
	                response.status = xhr.status;
	                response.statusText = xhr.statusText;
	                response.headers = getHeaders(xhr);

	                resolve(response);
	            };

	            xhr.onload = handler;
	            xhr.onabort = handler;
	            xhr.onerror = handler;

	            xhr.send(request.data);
	        });
	    };

	    function getHeaders(xhr) {

	        var headers;

	        if (!headers) {
	            headers = parseHeaders(xhr.getAllResponseHeaders());
	        }

	        return function (name) {

	            if (name) {
	                return headers[_.toLower(name)];
	            }

	            return headers;
	        };
	    }

	    function parseHeaders(str) {

	        var headers = {}, value, name, i;

	        if (_.isString(str)) {
	            _.each(str.split('\n'), function (row) {

	                i = row.indexOf(':');
	                name = _.trim(_.toLower(row.slice(0, i)));
	                value = _.trim(row.slice(i + 1));

	                if (headers[name]) {

	                    if (_.isArray(headers[name])) {
	                        headers[name].push(value);
	                    } else {
	                        headers[name] = [headers[name], value];
	                    }

	                } else {

	                    headers[name] = value;
	                }

	            });
	        }

	        return headers;
	    }

	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Before Interceptor.
	 */

	module.exports = function (_) {

	    return {

	        request: function (request) {

	            if (_.isFunction(request.beforeSend)) {
	                request.beforeSend.call(this, request);
	            }

	            return request;
	        }

	    };

	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * JSONP Interceptor.
	 */

	module.exports = function (_) {

	    var jsonpClient = __webpack_require__(10)(_);

	    return {

	        request: function (request) {

	            if (request.method == 'JSONP') {
	                request.client = jsonpClient;
	            }

	            return request;
	        }

	    };

	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * JSONP client.
	 */

	var Promise = __webpack_require__(4);

	module.exports = function (_) {

	    return function (request) {
	        return new Promise(function (resolve) {

	            var callback = '_jsonp' + Math.random().toString(36).substr(2), response = {request: request}, handler, script;

	            request.params[request.jsonp] = callback;
	            request.cancel = function () {
	                handler({type: 'cancel'});
	            };

	            script = document.createElement('script');
	            script.src = _.url(request);
	            script.type = 'text/javascript';
	            script.async = true;

	            window[callback] = function (data) {
	                response.data = data;
	            };

	            handler = function (event) {

	                if (event.type === 'load') {
	                    delete window[callback];
	                    document.body.removeChild(script);
	                }

	                if (event.type === 'load' && !response.data) {
	                    event.type = 'error';
	                }

	                switch (event.type) {
	                    case 'load':
	                        response.status = 200;
	                        break;
	                    case 'error':
	                        response.status = 404;
	                        break;
	                    default:
	                        response.status = 0;
	                }

	                resolve(response);
	            };

	            script.onload = handler;
	            script.onerror = handler;

	            document.body.appendChild(script);
	        });
	    };

	};


/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * HTTP method override Interceptor.
	 */

	module.exports = function (_) {

	    return {

	        request: function (request) {

	            if (request.emulateHTTP && !request.crossOrigin && /^(PUT|PATCH|DELETE)$/i.test(request.method)) {
	                request.headers['X-HTTP-Method-Override'] = request.method;
	                request.method = 'POST';
	            }

	            return request;
	        }

	    };

	};


/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Mime Interceptor.
	 */

	module.exports = function (_) {

	    return {

	        request: function (request) {

	            if (request.emulateJSON && _.isPlainObject(request.data)) {
	                request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	                request.data = _.url.params(request.data);
	            }

	            if (_.isObject(request.data) && /FormData/i.test(request.data.toString())) {
	                delete request.headers['Content-Type'];
	            }

	            if (_.isPlainObject(request.data)) {
	                request.data = JSON.stringify(request.data);
	            }

	            return request;
	        },

	        response: function (response) {

	            try {
	                response.data = JSON.parse(response.data);
	            } catch (e) {}

	            return response;
	        }

	    };

	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	/**
	 * Header Interceptor.
	 */

	module.exports = function (_) {

	    return {

	        request: function (request) {

	            request.method = request.method.toUpperCase();
	            request.headers = _.extend({}, _.http.headers.common,
	                !request.crossOrigin ? _.http.headers.custom : {},
	                _.http.headers[request.method.toLowerCase()],
	                request.headers
	            );

	            if (_.isPlainObject(request.data) && /^(GET|JSONP)$/i.test(request.method)) {
	                _.extend(request.params, request.data);
	                delete request.data;
	            }

	            return request;
	        }

	    };

	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * CORS Interceptor.
	 */

	module.exports = function (_) {

	    var originUrl = _.url.parse(location.href);
	    var xdrClient = __webpack_require__(10)(_);
	    var xhrCors = 'withCredentials' in new XMLHttpRequest();

	    return {

	        request: function (request) {

	            if (request.crossOrigin === null) {
	                request.crossOrigin = crossOrigin(request.url);
	            }

	            if (request.crossOrigin && !xhrCors) {
	                request.client = xdrClient;
	            }

	            return request;
	        }

	    };

	    function crossOrigin(url) {

	        var requestUrl = _.url.parse(url);

	        return (requestUrl.protocol !== originUrl.protocol || requestUrl.host !== originUrl.host);
	    }

	};


/***/ },
/* 15 */
/***/ function(module, exports) {

	/**
	 * Timeout Interceptor.
	 */

	module.exports = function (_) {

	    var timeout;

	    return {

	        request: function (request) {

	            if (request.timeout) {
	                timeout = setTimeout(function () {
	                    request.cancel();
	                }, request.timeout);
	            }

	            return request;
	        },

	        response: function (response) {

	            clearTimeout(timeout);

	            return response;
	        }

	    };

	};


/***/ },
/* 16 */
/***/ function(module, exports) {

	/**
	 * Service for interacting with RESTful services.
	 */

	module.exports = function (_) {

	    function Resource(url, params, actions, options) {

	        var self = this, resource = {};

	        actions = _.extend({},
	            Resource.actions,
	            actions
	        );

	        _.each(actions, function (action, name) {

	            action = _.extend(true, {url: url, params: params || {}}, options, action);

	            resource[name] = function () {
	                return (self.$http || _.http)(opts(action, arguments));
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

	                if (_.isFunction(args[1])) {

	                    if (_.isFunction(args[0])) {

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

	                if (_.isFunction(args[0])) {
	                    success = args[0];
	                } else if (/^(POST|PUT|PATCH)$/i.test(options.method)) {
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

	        options.data = data;
	        options.params = _.extend({}, options.params, params);

	        if (success) {
	            options.success = success;
	        }

	        if (error) {
	            options.error = error;
	        }

	        return options;
	    }

	    Resource.actions = {

	        get: {method: 'GET'},
	        save: {method: 'POST'},
	        query: {method: 'GET'},
	        update: {method: 'PUT'},
	        remove: {method: 'DELETE'},
	        delete: {method: 'DELETE'}

	    };

	    return _.resource = Resource;
	};


/***/ }
/******/ ])
});
;