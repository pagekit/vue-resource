import Vue from 'vue';

describe('this.$resource', function () {

    it('get({file: "valid.json"})', function (done) {

        var vm = new Vue({

            created: function () {

                var resource = this.$resource('data{/file}');

                resource.get({file: 'valid.json'}).then((res) => {

                    expect(res.ok).toBe(true);
                    expect(res.status).toBe(200);
                    expect(res.data.foo).toBe('bar');

                    done();
                });

            }

        });

    });

    it('save({file: "valid.json"}, {foo: "bar"})', function (done) {

        var vm = new Vue({

            created: function () {

                var resource = this.$resource('data{/file}');

                resource.save({file: 'valid.json'}, {foo: 'bar'}).then((res) => {

                    expect(res.ok).toBe(true);
                    expect(res.status).toBe(200);
                    expect(res.data.foo).toBe('bar');

                    done();
                });

            }

        });

    });

});
