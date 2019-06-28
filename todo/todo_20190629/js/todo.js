import Collection from './collection.js';
import { EVENT_CHANGE } from './dictionary.js';

export default class TODO {

    static templateToDo = document.querySelector('#tplToDoList').content;
    static templateItem = document.querySelector('#tplItem').content;

    #model = new Collection();

    #root = null;

    constructor(props = {}) {

        const template = TODO.templateToDo.cloneNode('true');

        this.#root = template.querySelector('._root');
        let {container = document.body} = props;
        this._eventsAssign()
        ._render(container, template)
        ._renderList();
    }

    $(selector) {
        return this.#root.querySelector(selector);
    }

    _eventsAssign() {
        // TODO: rewrite events assign
        this.$('#buttonAdd').addEventListener('click', function(e) {
            _validateForm(e, this.$('.formAdd'));
            this.addTask();
            this.$('#taskValue').value = '';
        }.bind(this));

        this.$('#taskValue').addEventListener('keydown', function(e){
            if (e.key == "Enter") {
                _validateForm(e, this.$('.formAdd'));
                this.addTask();
                this.$('#taskValue').value = '';
            }
        }.bind(this));

        this.$('#tasksIncompleted').addEventListener('click', function(e) {
            if (e.target.classList.contains('_delete')) {
                this.removeTask(e.target.closest('._li').dataset.index);
            } else if (e.target.classList.contains('_edit')) {
                e.preventDefault();
                this._renderListItem(e.target.closest('._li'));
            } else if (e.target.classList.contains('_save')) {
                _validateForm(e, this.$('.formEdit'));
                this.editTask(e.target.closest('._li'));
            }
        }.bind(this));

        this.$('#tasksIncompleted').addEventListener('keydown', function(e){
            if (e.key == "Enter") {
                _validateForm(e, this.$('.formEdit'));
                this.editTask(e.target.closest('._li'));
            } else if (e.key == "Escape") this._renderList();
        }.bind(this));

        function _validateForm(e, form) {
            if (!form.checkValidity()) return;
            e.preventDefault();
        };

        this.#model.on(EVENT_CHANGE, this._renderList.bind(this));

        return this;
    }

    _render(container, template) {
        container.appendChild(template);
        return this;
    }

    _renderList() {
        this.$('#tasksIncompleted').innerHTML = '';
        let fragment = document.createDocumentFragment();

        this.#model.collection.forEach((el, i) => {
            const template= TODO.templateItem.cloneNode(true);
            template.querySelector('._text').innerText = el;
            template.querySelector('._li').dataset.index = i;
            fragment.appendChild(template);
        });
        this.$('#tasksIncompleted').appendChild(fragment);
    }

// TODO: rewrite to class
    _renderListItem(item) {
        item.classList.add('editMode');
        item.querySelector('._input').value = item.querySelector('._text').innerText;
        item.querySelector('._edit').classList.replace('_edit', '_save');
        item.querySelector('._save').innerText = 'Save';
    }

    addTask(){
        this.#model.add(this.$('#taskValue').value);
    }

    removeTask(index) {
        this.#model.remove(index);
    }

    editTask(item) {
        this.#model.edit(item.dataset.index, item.querySelector('._input').value);
    }
}