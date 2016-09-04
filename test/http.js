import Vue from 'vue';

describe('Vue.http', function () {

    it('get("data/text.txt")', (done) => {

        Vue.http.get('data/text.txt').then((res) => {

            expect(res.ok).toBe(true);
            expect(res.status).toBe(200);
            expect(res.body).toBe('text');
            expect(res.headers.get('Content-Type')).toBe('text/plain');
            expect(res.headers.get('Content-Length')).toBe('4');

            done();
        });

    });

    it('get("data/valid.json")', (done) => {

        Vue.http.get('data/valid.json').then((res) => {

            expect(res.ok).toBe(true);
            expect(res.status).toBe(200);
            expect(typeof res.body).toBe('object');
            expect(res.body.foo).toBe('bar');

            done();
        });

    });

    it('get("data/invalid.json")', (done) => {

        Vue.http.get('data/invalid.json').then((res) => {

            expect(res.ok).toBe(true);
            expect(res.status).toBe(200);
            expect(res.body).toBeNull();

            done();
        });

    });

    it('get("github.com/avatar")', (done) => {

        Vue.http.get('https://avatars1.githubusercontent.com/u/6128107').then((res) => {

            expect(res.ok).toBe(true);
            expect(res.status).toBe(200);
            expect(res.body instanceof Blob).toBe(true);
            expect(res.body.type).toBe('image/png');

            done();
        });

    });

    it('get("cors-api.appspot.com")', (done) => {

        Vue.http.get('http://server.cors-api.appspot.com/server?id=1&enable=true').then((res) => {

            expect(res.ok).toBe(true);
            expect(res.status).toBe(200);
            expect(typeof res.body).toBe('object');
            expect(res.body.shift().requestType).toBe('cors');
            expect(res.headers.get('Content-Type')).toBe('application/json');

            done();
        });

    });

    it('jsonp("jsfiddle.net/jsonp")', (done) => {

        Vue.http.jsonp('http://jsfiddle.net/echo/jsonp/', {params: {foo: 'bar'}}).then((res) => {

            expect(res.ok).toBe(true);
            expect(res.status).toBe(200);
            expect(typeof res.body).toBe('object');
            expect(res.body.foo).toBe('bar');

            done();
        });

    });

});

describe('this.$http', function () {

    it('get("data/valid.json")', (done) => {

        var vm = new Vue({

            created() {

                this.$http.get('data/valid.json').then((res) => {

                    expect(this).toBe(vm);
                    expect(res.ok).toBe(true);
                    expect(res.status).toBe(200);
                    expect(typeof res.body).toBe('object');
                    expect(res.body.foo).toBe('bar');

                    done();

                });

            }

        });

    });

    it('get("data/valid.json") with abort()', (done) => {

        var vm = new Vue({

            created() {

                var random = Math.random().toString(36).substr(2);

                this.$http.get('data/valid.json?' + random, {

                    before(req) {
                        setTimeout(() => {

                            expect(typeof req.abort).toBe('function');

                            req.abort();

                            done();

                        }, 0);
                    }

                }).then((res) => {
                    fail('Callback has been called');
                });
            }

        });

    });

    it('get("data/notfound.json") using catch()', (done) => {

        var vm = new Vue({

            created() {

                this.$http.get('data/notfound.json').catch((res) => {

                    expect(this).toBe(vm);
                    expect(res.ok).toBe(false);
                    expect(res.status).toBe(404);

                    done();
                });

            }

        });

    });

});