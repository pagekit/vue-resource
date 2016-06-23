import Vue from 'vue';

describe('Vue.http', function () {

    it('get("data/text.txt")', function (done) {

        Vue.http.get('data/text.txt').then(function (res) {

            expect(res.ok).toBe(true);
            expect(res.status).toBe(200);
            expect(res.data).toBe('text');
            expect(res.blob() instanceof Blob).toBe(true);
            expect(res.headers['Content-Type']).toBe('text/plain');
            expect(res.headers['Content-Length']).toBe('4');

            done();
        });

    });

    it('get("data/valid.json")', function (done) {

        Vue.http.get('data/valid.json').then(function (res) {

            expect(res.ok).toBe(true);
            expect(res.status).toBe(200);
            expect(res.data.foo).toBe('bar');

            done();
        });

    });

    it('get("data/invalid.json")', function (done) {

        Vue.http.get('data/invalid.json').then(function (res) {

            expect(res.ok).toBe(true);
            expect(res.status).toBe(200);
            expect(res.data).toBeNull();

            done();
        });

    });

    it('get("server.cors-api.appspot.com")', function (done) {

        Vue.http.get('http://server.cors-api.appspot.com/server?id=1&enable=true').then(function (res) {

            expect(res.ok).toBe(true);
            expect(res.status).toBe(200);
            expect(res.data.shift().requestType).toBe('cors');
            expect(res.headers['Content-Type']).toBe('application/json');

            done();
        });

    });

});

describe('this.$http', function () {

    it('get("data/valid.json")', function (done) {

        var vm = new Vue({

            created: function () {

                this.$http.get('data/valid.json').then(function (res) {

                    expect(this).toBe(vm);
                    expect(res.ok).toBe(true);
                    expect(res.status).toBe(200);
                    expect(res.data.foo).toBe('bar');

                    done();

                });

            }

        });

    });

    it('get("data/notfound.json") using catch()', function (done) {

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