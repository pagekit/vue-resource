import Vue from 'vue';

describe('this.$resource', function () {

    it('get({file: "valid.json"})', (done) => {

        var vm = new Vue({

            created() {

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

    it('save({file: "valid.json"}, {foo: "bar"})', (done) => {

        var vm = new Vue({

            created() {

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
