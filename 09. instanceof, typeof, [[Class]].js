/* Статья:
http://learn.javascript.ru/instanceof
*/

/*
1) С какими операндами используется оператор instanceof? 

- с объектом и классом

2) Что возвращает? 

- true, если объект принадлежит классу, с учётом прототипного наследования / false

3) Какие проблемы могут с ним возникнуть? 

- выдаёт неправильный результат, если прототип впоследствии был изменён. 
Ещё методу instanceof не важна функция-конструктор. Он смотрит на её prototype и сверяет его с цепочкой __proto__ объекта. 
*/

////////////////////////////////////

/* app.js
[project] Опиши ещё один класс Events в котором будут описаны методы подписки и триггера на события - интерфейс общения с другими классами. 
У него должно быть всего 2 метода - on и trigger которые подписывает на событие и тригерит событие соответственно.
*/

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
    const LIST = [];

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

////////////////////////////////////

/*
1) Что такое полиморфная функция?

- функция, обрабатывающая аргументы в зависимости от их типа

2) А утиная типизация?

- проверка типа входящих данных на наличие нужных свойств  или методов

3) Как различить массивы и объекты если это необходимо в коде? Есть несколько способов.

1. через скрытое свойство [[Class]] при помощи {}.toString.call(obj).slice(8, -1) 
2. duck typing (проверка на наличие свойства - if (Array.isArray(who)) или if (arr.forEach))

4) Какие типы данных typeof определяет ошибочно или не корректно?

- null и function
*/

////////////////////////////////////

/* Статья:
http://learn.javascript.ru/class-instanceof
*/

/* Полиморфная функция formatDate */

function formatDate(date) {
    let type = {}.toString.call(date).slice(8, -1);
    if (type == 'Array') {
        let [y, m, d] = date;
        date = new Date(y, m, d);
    } else if (type == 'Number') {
        let t = new Date(0); // Epoch
        t.setUTCSeconds(date);
        date = t;
    } else if (type == 'String') {
        date = new Date(date.slice(2).split('-').reverse());
    }
    return ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth()+1)).slice(-2) + '.' + (date.getFullYear().toString().substr(2, 2));
}
console.log( formatDate('2011-10-02') ); // 02.10.11
console.log( formatDate(1234567890) ); // 14.02.09
console.log( formatDate([2014, 0, 1]) ); // 01.01.14
console.log( formatDate(new Date(2014, 0, 1)) ); // 01.01.14