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
        return this.map.hasOwnProperty(normalizeName(name));
    }

    get(name) {

        var list = this.map[normalizeName(name)];

        return list ? list[0] : null;
    }

    getAll(name) {
        return this.map[normalizeName(name)] || [];
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

    return toLower(trim(name));
}
