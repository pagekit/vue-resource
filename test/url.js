import Vue from 'vue';

describe('Vue.url', function () {

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

    it('url with params', function () {

        expect(Vue.url('url', {})).toBe('url');
        expect(Vue.url('url', {foo: 'bar'})).toBe('url?foo=bar');
        expect(Vue.url('url', {foo: 'bar', b: 10})).toBe('url?foo=bar&b=10');

        // Bug #347: Would be 'url?0=undefined&1=undefined'
        expect(Vue.url('url', {length:2})).toBe('url?length=2');

    });

});
