var Vue = require('vue');
var VueResource = require('../dist/vue-resource.common.js');

Vue.use(VueResource);

describe('Vue.http', function () {

    it('post("jsfiddle.net/html")', () => {

        return Vue.http.post('http://jsfiddle.net/echo/html/', {html: 'text'}, {emulateJSON: true}).then(res => {

            expect(res.ok).toBe(true);
            expect(res.status).toBe(200);
            expect(typeof res.body).toBe('string');
            expect(res.body).toBe('text');

        });

    });

    it('post("jsfiddle.net/json")', () => {

        return Vue.http.post('http://jsfiddle.net/echo/json/', {json: JSON.stringify({foo: 'bar'})}, {emulateJSON: true}).then(res => {

            expect(res.ok).toBe(true);
            expect(res.status).toBe(200);
            expect(typeof res.body).toBe('object');
            expect(res.body.foo).toBe('bar');

        });

    });

});
