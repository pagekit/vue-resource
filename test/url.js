var Vue = require('vue');

describe('Vue.url', function () {

    it('data/:id', function () {

        expect(Vue.url('data/:id')).toBe('data');
        expect(Vue.url('data/:id', {id: 1})).toBe('data/1');
        expect(Vue.url('data/:id', {id: function() { return 'hello'; }})).toBe('data/hello');
        expect(Vue.url('data/:id', {id: function() { return 'hello world'; }})).toBe('data/hello%20world');

    });

    it('data{/id}', function () {

        expect(Vue.url('data{/id}')).toBe('data');
        expect(Vue.url('data{/id}', {id: 1})).toBe('data/1');
        expect(Vue.url('data{/id}', {id: function() { return 'hello'; }})).toBe('data/hello');
        expect(Vue.url('data{/id}', {id: function() { return 'hello world'; }})).toBe('data/hello%20world');

    });

    it('{+path}data', function () {

        expect(Vue.url('{+path}data')).toBe('data');
        expect(Vue.url('{+path}data', {path: 'path1/path2/'})).toBe('path1/path2/data');

    });

    it('{+base}data', function () {

        Vue.url.options.params.base = 'base/path/';
        expect(Vue.url('{+base}data')).toBe('base/path/data');

    });

});
