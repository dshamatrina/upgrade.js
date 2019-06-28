export default class Events {
    #listeners = {};

    on(event, fn) { // subscribing to event
        if (!this.#listeners[event]) {
            this.#listeners[event] = [];
        }
        this.#listeners[event].push(fn);
    }

    trigger(event) {
        this.#listeners[event].forEach(fn => fn());
    }

    off(event, fn) { // unsubscribing from event
        let eventIndex = this.#listeners[event].indexOf(fn);
        this.#listeners[event].splice(eventIndex, 1);
    }
}