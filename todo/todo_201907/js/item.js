export default class Item {
    static template = document.querySelector('#tplItem').content;
    static CLASS_NAME_EDIT = 'editMode';

    #id = null;
    #model = null;
    #events = null;
    root = null;

    /**
    props = { 
           id, // identifier item
           model // collection of items
    }
    */

    constructor(props) {
        this.#id = props.id;
        this.#model = props.model;

        const template = Item.template.cloneNode(true);
        this.root = template.querySelector('._li');

        this.#events = {
            'Escape': this.escape.bind(this)
        }

        this.root.querySelector('._delete').addEventListener('click', this.remove.bind(this.#id));
        this.root.querySelector('._edit').addEventListener('click', this.edit.bind(this));
        this.root.querySelector('._input').addEventListener('keydown', this.onKeyDown.bind(this));
        this.root.querySelector('._form').addEventListener('submit', this.onSubmit.bind(this));
    }

    render() {
        this.root.querySelector('._text').innerText = this.#model.getItem(this.#id);
        this.root.querySelector('._input').value = this.#model.getItem(this.#id);
        this.root.querySelector('._input').setAttribute('minlength', this.#model.minLength);
        return this.root;
    }

    remove() {
        this.#model.remove(this.#id);
    }

    edit() {
        this.root.classList.add(Item.CLASS_NAME_EDIT);
    }

    save() {
        this.#model.edit(this.#id, this.root.querySelector('._input').value);
    }

    escape() {
        this.root.classList.remove(Item.CLASS_NAME_EDIT);
        this.root.querySelector('._input').value = this.#model.getItem(this.#id);
    }

    onKeyDown(e) {
        this.#events[e.key] && this.#events[e.key]();
    }

    onSubmit(e) {
        e.preventDefault();
        this.save();
    }

}