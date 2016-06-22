import Vue from 'vue';

describe('Vue.http', function () {

    it('GET: text.txt', function (done) {

        Vue.http.get('data/text.txt').then(function (res) {

            expect(res.ok).toBe(true);
            expect(res.status).toBe(200);
            expect(res.data).toBe('text');

            done();
        });

    });

    it('GET: text.txt (blob)', function (done) {

        Vue.http.get('data/text.txt', {}, {responseType: 'blob'}).then(function (res) {

            expect(res.ok).toBe(true);
            expect(res.status).toBe(200);
            expect(res.data instanceof Blob).toBe(true);

            done();
        });

    });

    it('GET: valid.json', function (done) {

        Vue.http.get('data/valid.json').then(function (res) {

            expect(res.ok).toBe(true);
            expect(res.status).toBe(200);
            expect(res.data.foo).toBe('bar');

            done();
        });

    });

    it('GET: invalid.json', function (done) {

        Vue.http.get('data/invalid.json').then(function (res) {

            expect(res.ok).toBe(true);
            expect(res.status).toBe(200);
            expect(res.data).toBeNull();

            done();
        });

    });

    it('GET: cors-api.com', function (done) {

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

    it('GET: valid.json', function (done) {

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

    it('GET: notfound.json using catch()', function (done) {

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