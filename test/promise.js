var Promise = require('../src/promise');
var isNative = window.Promise !== undefined;

describe('Vue.promise ' + (isNative ? '(native)' : '(polyfill)'), function () {

    it('then fulfill', function (done) {

        Promise.resolve(1).then(function (value) {
            expect(value).toBe(1);
            done();
        });

    });

    it('then reject', function (done) {

        Promise.reject(1).then(undefined, function (value) {
            expect(value).toBe(1);
            done();
        });

    });

    it('catch', function (done) {

        Promise.reject(1).catch(function (value) {
            expect(value).toBe(1);
            done();
        });

    });

    it('finally fulfill', function (done) {

        Promise.resolve(1).finally(function (arg) {
            expect(arg).toBe(undefined);
        }).then(function (arg) {
            expect(arg).toBe(1);
            done();
        });

    });

    it('finally reject', function (done) {

        Promise.reject(1).finally(function (arg) {
            expect(arg).toBe(undefined);
        }).catch(function (arg) {
            expect(arg).toBe(1);
            done();
        });

    });

    it('all', function (done) {

        Promise.all([

            Promise.resolve(1),
            Promise.resolve(2)

        ]).then(function (values) {
            expect(values[0]).toBe(1);
            expect(values[1]).toBe(2);
            done();
        });

    });

    it('duplicate', function (done) {

        Promise.all([

            Promise.resolve(1).then(function (value) {
                expect(value).toBe(1);
            }),

            Promise.resolve(2).then(function (value) {
                expect(value).toBe(2);
            })

        ]).then(done);

    });

    it('context', function (done) {

        var context = {foo: 'bar'};

        Promise.resolve().bind(context).then(function () {
            expect(this).toBe(context);
            done();
        });

    });

    it('context chain fulfill', function (done) {

        var context = {foo: 'bar'};

        Promise.resolve().bind(context).catch(undefined).finally(function () {
            expect(this).toBe(context);
        }).then(function () {
            expect(this).toBe(context);
            done();
        });

    });

    it('context chain reject', function (done) {

        var context = {foo: 'bar'};

        Promise.reject().bind(context).catch(function () {
            expect(this).toBe(context);
            return Promise.reject();
        }).finally(function () {
            expect(this).toBe(context);
        }).catch(function () {
            expect(this).toBe(context);
            done();
        });

    });

    it('no chain breaking', function (done) {

        var promise = Promise.reject();

        Promise.all([

            promise.catch(function () {
                expect(true).toBe(true);
            }),

            promise.catch(function () {
                fail('Chain break');
            })

        ]).then(done);

    });

});
