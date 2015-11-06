var Vue = require('vue');

describe('Http', function () {

    it('get: test.json', function (done) {

        Vue.http.get('data/test.json', function (data) {
            expect(data.foo).toBe('bar');
            done();
        });

    });

    it('get: cors-api.com', function (done) {

        Vue.http.get('http://server.cors-api.appspot.com/server?id=1&enable=true', function (data) {
            expect(data.shift().requestType).toBe('cors');
            done();
        });

    });

});
