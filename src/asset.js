module.exports = function (Vue) {

    var _ = require('./util')(Vue);
    var Promise = require('./promise');
    var fn = function(){};
    var cache = {};

    /**
     * Asset provides a promise based assets manager.
     */

    function Asset(assets, onSuccess, onError) {

        onSuccess = onSuccess || fn;
        onError = onError || fn;

        var self = this, promises = [], $url = (this.$url || Vue.url), _assets = [], url, i, len, promise;

        Object.keys(assets).forEach(function(type) {

            if (!Asset[type]) return;

            _assets = _.isArray(assets[type]) ? assets[type] : [assets[type]];

            for (i=0, len=_assets.length; i<len; i++) {

                if (!_assets[i]) continue;

                url = $url(_assets[i]);

                cache[_assets[i]] = Assets[type](url);
                promises.push(cache[assets[i]]);
            }

        });

        promise = Promise.all(promises);

        _.extend(promise, {

            success: function (onSuccess) {

                this.then(function (data) {
                    onSuccess.apply(self, [data]);
                }, function () {});

                return this;
            },

            error: function (onError) {

                this.catch(function (err) {
                    onError.apply(self, [err]);
                });

                return this;
            },

            always: function (onAlways) {

                var cb = function (data) {
                    onAlways.apply(self, [data]);
                };

                this.then(cb, cb);

                return this;
            }
        });

        promise.then(function(){
            onSuccess.apply(self, []);
        }).catch(function(e){
            onError.apply(self, [e]);
        });

        return promise;
    }

    _.extend(Asset, {

        css: function(url) {

            return new Promise(function(resolve, reject) {

                var img       = document.createElement('img'),
                    link      = document.createElement('link');
                    link.type = 'text/css';
                    link.rel  = 'stylesheet';
                    link.href = url;

                document.getElementsByTagName('head')[0].appendChild(link);
                img.onerror = function(){ resolve(url); };
                img.src = link.href;
            });
        },

        js: function(url) {

            return new Promise(function(resolve, reject) {

                var script = document.createElement('script');

                script.async = true;
                script.onload = function() { resolve(url); };
                script.onerror = function() { reject(url); };
                script.src = url;

                document.getElementsByTagName('head')[0].appendChild(script);
            });
        },

        image: function(url) {

            return new Promise(function(resolve, reject) {

                var img = document.createElement('img');

                img.onload  = function(){ resolve(url); };
                img.onerror = function(){ reject(url); };

                img.src = url;
            });
        }
    });

    Object.defineProperty(Vue.prototype, '$asset', {

        get: function () {
            return _.extend(Asset.bind(this), Asset);
        }
    });

    return Asset;
};
