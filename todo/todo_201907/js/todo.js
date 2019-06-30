import Collection from './collection.js';
import Item from './item.js';

export default class TODO {

    static templateToDo = document.querySelector('#tplToDoList').content;

    #model = new Collection();

    // root element of template
    #root = null;

    constructor() {

        const template = TODO.templateToDo.cloneNode('true');

        this.#root = template.querySelector('._root');
        this._eventsAssign()
        ._render();
    }

    _eventsAssign() {
        // TODO: rewrite events assign
        this.#root.querySelector('.form').addEventListener('submit', this.onSubmit.bind(this));
        this.#model.on('change', this._renderList.bind(this));
        return this;
    }

    _render() {
        this.#root.querySelector('#taskValue').setAttribute('minlength', this.#model.minLength);
        document.body.appendChild(this.#root);
    }

    _renderList() {
        this.#root.querySelector('#tasksIncompleted').innerHTML = '';

        const list = document.createDocumentFragment();
        this.#model.list.forEach((el, i) => {
            const item = new Item({
                id: i,
                model: this.#model
            });
            list.appendChild(item.render());
        });
        this.#root.querySelector('#tasksIncompleted').appendChild(list);
    }

    onSubmit(e) {
        e.preventDefault();
        this.addTask();
    }

    addTask(){
        this.#model.add(this.#root.querySelector('#taskValue').value);
        this.#root.querySelector('#taskValue').value = '';
    };
}

new TODO();
new TODO();