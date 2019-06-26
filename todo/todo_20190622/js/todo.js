import Collection from './collection.js';

export default class TODO {

    static templateToDo = document.querySelector('#tplToDoList').content;
    static templateItem = document.querySelector('#tplItem').content;

    #model = new Collection();

    // root element of template
    #root = null;

    constructor() {

        const template = TODO.templateToDo.cloneNode('true');

        this.#root = template.querySelector('._root');
        this._eventsAssign()
            ._render(template);
    }

    _eventsAssign() {
        // TODO: rewrite events assign
        this.#root.querySelector('#buttonAdd').addEventListener('click', this.addTask.bind(this));
        this.#root.querySelector('#tasksIncompleted').addEventListener('click', function(e) {
            if (e.target.classList.contains('_delete')) {
                this.removeTask(e.target.closest('._li').dataset.index);
            }
        }.bind(this));
        this.#model.on('change', this._renderList.bind(this));
        return this;
    }

    _render(template) {
        document.body.appendChild(template);
    }

    _renderList() {
        this.#root.querySelector('#tasksIncompleted').innerHTML = '';

        this.#model.list.forEach((el, i) => {
            const template= TODO.templateItem.cloneNode(true);
            template.querySelector('._text').innerText = el;
            template.querySelector('._li').dataset.index = i;
            this.#root.querySelector('#tasksIncompleted').appendChild(template);
        });
    }

    addTask(){
        this.#model.add(this.#root.querySelector('#taskValue').value);
    };

    removeTask(index) {
        this.#model.remove(index);
    };
}

new TODO();
new TODO();