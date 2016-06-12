import Vue from 'vue';

describe('Vue.url', function () {

    it('data/:id', function () {

        expect(Vue.url('data/:id')).toBe('data');
        expect(Vue.url('data/:id', {id: 1})).toBe('data/1');

    });

    it('data{/id}', function () {

        expect(Vue.url('data{/id}')).toBe('data');
        expect(Vue.url('data{/id}', {id: 1})).toBe('data/1');

    });

    it('data{/array}', function () {

        expect(Vue.url('data{?array}')).toBe('data');
        expect(Vue.url('data{?array}', {array: [1,2,3]})).toBe('data?array=1,2,3');

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
