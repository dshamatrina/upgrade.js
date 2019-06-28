import Events from './events.js';
import { EVENT_CHANGE } from './dictionary.js';

export default class Collection extends Events {

    static instance = null;

    #collection = []; // property name replaced to be more specific

    constructor() {
        super();
        if (Collection.instance) {
            return Collection.instance;
        }
        Collection.instance = this;

        if (localStorage["myCollection"]) {
            this.#collection = JSON.parse(localStorage.getItem("myCollection"));
        } else {
            localStorage.setItem("myCollection", JSON.stringify(this.#collection));
        }
    }

    add(string) {
        this.#collection.push(string);
        localStorage["myCollection"] = JSON.stringify(this.#collection);
        this.trigger(EVENT_CHANGE);
    }

    remove(index) {
        this.#collection.splice(index, 1);
        localStorage["myCollection"] = JSON.stringify(this.#collection);
        this.trigger(EVENT_CHANGE);
    }

    edit(index, string) {
        this.#collection[index] = string;
        localStorage["myCollection"] = JSON.stringify(this.#collection);
        this.trigger(EVENT_CHANGE);
    }

    get collection() {
        return this.#collection.slice();
    }
}