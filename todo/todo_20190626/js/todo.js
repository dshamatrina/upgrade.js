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

        this.#root.querySelector('#taskValue').addEventListener('keydown', function(e){
            if (e.key == "Enter") {
                this.addTask();
            }
        }.bind(this));

        this.#root.querySelector('#tasksIncompleted').addEventListener('click', function(e) {
            if (e.target.classList.contains('_delete')) {
                this.removeTask(e.target.closest('._li').dataset.index);
            } else if (e.target.classList.contains('_edit')) {
                this._renderListItem(e.target.closest('._li'));
            } else if (e.target.classList.contains('_save')) {
                this.editTask(e.target);
            }
        }.bind(this));

        this.#root.querySelector('#tasksIncompleted').addEventListener('keydown', function(e){
            if (e.key == "Enter") {
                this.editTask(e.target);
            } else if (e.key == "Escape") this._renderList();
        }.bind(this));

        this.#model.on('change', this._renderList.bind(this));

        return this;
    }

    _render(template) {
        document.body.appendChild(template);
    }

    _renderList() {
        this.#root.querySelector('#tasksIncompleted').innerHTML = '';

        this.#model.collection.forEach((el, i) => {
            const template= TODO.templateItem.cloneNode(true);
            template.querySelector('._text').innerText = el;
            template.querySelector('._li').dataset.index = i;
            this.#root.querySelector('#tasksIncompleted').appendChild(template);
        });
    }

// TODO: rewrite
    _renderListItem(item) {
        item.querySelector('._input').style.display = 'block';
        item.querySelector('._input').value = item.querySelector('._text').innerText;
        item.querySelector('._text').style.display = 'none';
        item.querySelector('._edit').classList.replace('_edit', '_save');
        item.querySelector('._save').innerText = 'Save';
    }

    addTask(){
        if (!this.#root.querySelector('.form').checkValidity()) return;
        this.#model.add(this.#root.querySelector('#taskValue').value);
    }

    removeTask(index) {
        this.#model.remove(index);
    }

    editTask(event) {
        let item = event.closest('._li');
        this.#model.edit(item.dataset.index, item.querySelector('._input').value);
    }
}