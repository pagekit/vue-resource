/**
 * HTTP Headers.
 */

import { each, trim, toLower } from '../util';

export default class Headers {

    constructor(headers) {

        this.map = {};

        each(headers, (value, name) => this.append(name, value));
    }

    has(name) {
        return this.get(name) !== null;
    }

    get(name) {

        var list = this.getAll(name);

        return list.length ? list[0] : null;
    }

    getAll(name) {

        var list;

        each(this.map, (l, n) => {
            if (toLower(name) === toLower(n)) {
                list = l;
            }
        });

        return list || [];
    }

    set(name, value) {
        this.map[normalizeName(name)] = [trim(value)];
    }

    append(name, value){

        var list = this.map[normalizeName(name)];

        if (!list) {
            list = this.map[normalizeName(name)] = [];
        }

        list.push(trim(value));
    }

    delete(name){
        delete this.map[normalizeName(name)];
    }

    forEach(callback, thisArg) {
        each(this.map, (list, name) => {
            each(list, value => callback.call(thisArg, value, name, this));
        });
    }

}

function normalizeName(name) {

    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
        throw new TypeError('Invalid character in header field name');
    }

    return trim(name);
}
