module.exports = function (Vue) {

    var _ = require('./util')(Vue);
    var types = ['css', 'js', 'image'];
    var fn = function(){};
    var cache = {};

    /**
     * Asset provides a promise based assets manager.
     */

    function Asset(assets, onSuccess, onError) {

        assets = _normalize(assets);
        onSuccess = onSuccess || fn;
        onError = onError || fn;

        var self = this, promises = [], $url = (this.$url || Vue.url), _assets = [], url, i, len, promise;

        types.forEach(function(type) {

            if (!assets[type]) return;

            _assets = _.isArray(assets[type]) ? assets[type] : [assets[type]];

            for (i=0, len=_assets.length; i<len; i++) {

                if (!_assets[i]) continue;

                url = $url(_assets[i]);

                if (type === 'js') {
                    cache[_assets[i]] = getScript(url);
                } else if (type === 'css') {
                    cache[_assets[i]] = getCss(url);
                } else if (type === 'image') {
                    cache[_assets[i]] = getImage(url);
                } else {
                    continue;
                }

                promises.push(cache[assets[i]]);
            }

        });

        promise = _.Promise.all(promises);

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

    function _normalize(assets) {

        assets = assets || {};

        if (typeof(assets) === 'string' ) {
            assets = [assets];
        }

        if (_.isArray(assets)) {

            var _assets = {'js':[],'css':[], 'image': []};

            for (var i=0, len=assets.length; i<len; i++) {

                if (!assets[i]) continue;

                if (assets[i].match(/\.js$/i)) {
                    _assets.js.push(assets[i]);
                } else if (assets[i].match(/\.css$/i)) {
                    _assets.css.push(assets[i]);
                } else if (assets[i].match(/\.(jpg|jpeg|png|gif|svg)$/i)) {
                    _assets.image.push(assets[i]);
                }
            }

            assets = _assets;
        }

        return assets;
    }


    function getScript(url) {

        return new _.Promise(function(resolve, reject) {

            var script = document.createElement('script');

            script.async = true;
            script.onload = function() { resolve(url); };
            script.onerror = function() { reject(url); };
            script.src = url;

            document.getElementsByTagName('head')[0].appendChild(script);
        });
    }

    function getCss(url){

        return new _.Promise(function(resolve, reject) {

            var img       = document.createElement('img'),
                link      = document.createElement('link');
                link.type = 'text/css';
                link.rel  = 'stylesheet';
                link.href = url;

            document.getElementsByTagName('head')[0].appendChild(link);
            img.onerror = function(){ resolve(); };
            img.src = link.href;
        });
    }

    function getImage(url){

        return new _.Promise(function(resolve, reject) {

            var img = document.createElement('img');

            img.onload  = function(){ resolve(url); };
            img.onerror = function(){ reject(url); };

            img.src = url;
        });
    }

    Object.defineProperty(Vue.prototype, '$asset', {

        get: function () {
            return _.extend(Asset.bind(this), Asset);
        }
    });

    return Asset;
};
