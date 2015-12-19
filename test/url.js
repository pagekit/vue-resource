var Vue = require('vue');
var Url = require('url-template');

describe('Vue.url', function () {

    it('data{/id}', function () {

        expect(Vue.url('data{/id}')).toBe('data');
        expect(Vue.url('data{/id}', {id: 1})).toBe('data/1');

    });

    it('data/:id (deprecated)', function () {

        expect(Vue.url('data/:id')).toBe('data');
        expect(Vue.url('data/:id', {id: 1})).toBe('data/1');

    });

});
