var Vue = require('vue');

describe('Vue.http', function () {

    it('get: test.json', function (done) {

        Vue.http.get('data/test.json').then(function (res) {

            expect(res.ok).toBe(true);
            expect(res.status).toBe(200);
            expect(res.data.foo).toBe('bar');

            done();
        });

    });

    it('get: cors-api.com', function (done) {

        Vue.http.get('http://server.cors-api.appspot.com/server?id=1&enable=true').then(function (res) {

            expect(res.ok).toBe(true);
            expect(res.status).toBe(200);
            expect(res.data.shift().requestType).toBe('cors');
            expect(res.headers('content-type')).toBe('application/json');

            done();
        });

    });

});

describe('this.$http', function () {

    it('get: test.json', function (done) {

        var vm = new Vue({

            created: function () {

                this.$http.get('data/test.json').then(function (res) {

                    expect(this).toBe(vm);
                    expect(res.ok).toBe(true);
                    expect(res.status).toBe(200);
                    expect(res.data.foo).toBe('bar');

                    done();

                });

            }

        });

    });

    it('get: notfound.json using catch()', function (done) {

        var vm = new Vue({

            created: function () {

                this.$http.get('data/notfound.json').catch(function (res) {

                    expect(this).toBe(vm);
                    expect(res.ok).toBe(false);
                    expect(res.status).toBe(404);

                    done();
                });

            }

        });

    });

});