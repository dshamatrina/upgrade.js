class Events {
    #LISTENERS = {};

    on(event, fn) {
        if (!this.#LISTENERS[event]) {
            this.#LISTENERS[event] = [];
        }
        this.#LISTENERS[event].push(fn);
    }

    trigger(event) {
        this.#LISTENERS[event].forEach(fn => fn());
    }
}

class Collection extends Events {
    #INSTANCE = this;
    #LIST = [];

    static get Collection() {
        return this.#INSTANCE;
    }

    add(string) {
        this.#LIST.push(string);
        this.trigger('change');
    }

    remove(index) {
        this.#LIST.splice(index, 1);
        this.trigger('change');
    }

    getList() {
        return this.#LIST.slice();
    }
}

class TODO extends Events {
    #MODEL = new Collection();
    #TEMPLATE_TODO = document.querySelector('#tplToDoList').content;
    #TEMPLATE_LI = document.querySelector('#tplItem').content;

    #TEMPLATE_CURRENT = this.#TEMPLATE_TODO.cloneNode('true');

    #TASK_VALUE = this.#TEMPLATE_CURRENT.querySelector('#taskValue');
    #TASKS = this.#TEMPLATE_CURRENT.querySelector('#tasksIncompleted')

    #render = function() {
        this.#TASKS.innerHTML = '';
        this.#MODEL.getList().forEach((el, i) => {
            const TEMPLATE_CURRENT = this.#TEMPLATE_LI.cloneNode(true);
            TEMPLATE_CURRENT.querySelector('._text').innerText = el;
            TEMPLATE_CURRENT.querySelector('._li').dataset.index = i;
            this.#TASKS.appendChild(TEMPLATE_CURRENT);
        });
    }

    addTask(){
        this.#MODEL.add(this.#TASK_VALUE.value);
    };

    removeTask(index) {
        this.#MODEL.remove(index);
    };

    constructor() {
        super();
        this.#TEMPLATE_CURRENT.querySelector('#buttonAdd').addEventListener('click', this.addTask.bind(this));
        this.#TASKS.addEventListener('click', function(e) {
            if (e.target.classList.contains('_delete')) {
                this.removeTask(e.target.closest('._li').dataset.index);
            }
        }.bind(this));

        document.body.appendChild(this.#TEMPLATE_CURRENT);
        this.#MODEL.on('change', this.#render.bind(this));
    }
}

new TODO();