import Events from './events.js';

export default class Collection extends Events {

    static instance = null;

    #collection = []; // property name replaced to be more specific

    constructor() {
        super();
        if (Collection.instance) {
            return Collection.instance;
        } 
        Collection.instance = this;
    }

    add(string) {
        this.#collection.push(string);
        this.trigger('change');
    }

    remove(index) {
        this.#collection.splice(index, 1);
        this.trigger('change');
    }

    edit(index, string) {
        this.#collection[index] = string;
        this.trigger('change');
    }

    get collection() {
        return this.#collection.slice();
    }
}