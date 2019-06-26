import Events from './events.js';

export default class Collection extends Events {

    static instance = null;

    #list = [];

    constructor() {
        super();
        if (Collection.instance) {
            return Collection.instance;
        } 
        Collection.instance = this;
    }

    add(string) {
        this.#list.push(string);
        this.trigger('change');
    }

    remove(index) {
        this.#list.splice(index, 1);
        this.trigger('change');
    }

    get list() {
        return this.#list.slice();
    }
}