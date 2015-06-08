module.exports = function (Vue) {

    var _ = require('./util')(Vue),
        cache = {};

    /**
     * Assets provides a promise based assets manager.
     */

    function Assets(assets, onSuccess, onError) {

        assets = _.isArray(assets) ? assets : [assets];

        var promises  = [], $url = (this.$url || Vue.url), url;

        for (var i=0, len=assets.length; i<len; i++) {

            if (!assets[i]) continue;

            if (!cache[assets[i]]) {

                url = $url(assets[i]);

                if (assets[i].match(/\.js$/i)) {
                    cache[assets[i]] = getScript(url);
                } else if (assets[i].match(/\.css$/i)) {
                    cache[assets[i]] = getCss(url);
                } else {
                    continue;
                }
            }

            promises.push(cache[assets[i]]);
        }

        return _.Promise.all(promises).then(onSuccess).catch(function(){
            onError ? onError() : console.error("Require failed: \n"+assets.join(",\n"));
        });
    }


    function getScript(url) {

        return new _.Promise(function(resolve, reject) {

            var script = document.createElement('script');

            script.async = true;

            script.onload = function() {
                resolve(url);
            };

            script.onerror = function() {
                reject(url);
            };

            script.src = url;

            document.getElementsByTagName('head')[0].appendChild(script);
        });
    }

    function getCss(url){

        return new _.Promise(function(resolve, reject) {

            var d         = $.Deferred(),
                link      = document.createElement('link');
                link.type = 'text/css';
                link.rel  = 'stylesheet';
                link.href = url;

            document.getElementsByTagName('head')[0].appendChild(link);

            var img = document.createElement('img');
                img.onerror = function(){
                    resolve();
                };

                img.src = link.href;
        });
    }

    return Assets;
};
