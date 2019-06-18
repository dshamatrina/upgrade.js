function Events() {
    const LISTENERS = {};

    return {
        on(event, fn) {
            LISTENERS.event = fn;
        },
        trigger(event) {
            LISTENERS.event();
        }
    }
}

function Collection() {
    const INSTANCE = this; // link to Collection
    const LIST = [];

    Collection = function() {
        return INSTANCE;
    }

    this.add = function(string) {
        LIST.push(string);
        this.trigger('added');
    }

    this.remove = function(index) {
        LIST.splice(index, 1);
        this.trigger('removed');
    };

    this.getList = function() {
        return LIST.slice();
    }
}

Collection.prototype = new Events();

function TODO () {
    const MODEL = new Collection();
    const TEMPLATE_TODO = document.querySelector('#tplToDoList').content;
    const TEMPLATE_LI = document.querySelector('#tplItem').content;

    const TEMPLATE_CURRENT = TEMPLATE_TODO.cloneNode(true);

    const TASK_VALUE = TEMPLATE_CURRENT.querySelector('#taskValue');
    const TASKS = TEMPLATE_CURRENT.querySelector('#tasksIncompleted')

    function render() {
        TASKS.innerHTML = '';
        MODEL.getList().forEach((el, i) => {
            const TEMPLATE_CURRENT = TEMPLATE_LI.cloneNode(true);
            TEMPLATE_CURRENT.querySelector('._text').innerText = el;
            TEMPLATE_CURRENT.querySelector('._li').dataset.index = i;
            TASKS.appendChild(TEMPLATE_CURRENT);
        });
    }

    this.addTask = function (){
        MODEL.add(TASK_VALUE.value);
    }

    this.removeTask = function(index) {
        MODEL.remove(index);
    }

    TEMPLATE_CURRENT.querySelector('#buttonAdd').addEventListener('click', this.addTask);
    TASKS.addEventListener('click', function(e) {
        if (e.target.classList.contains('_delete')) {
            this.removeTask(e.target.closest('._li').dataset.index);
        }
    }.bind(this));

    document.body.appendChild(TEMPLATE_CURRENT);
    MODEL.on('added', render);
    MODEL.on('removed', render);
}

TODO.prototype = new Events();

new TODO();