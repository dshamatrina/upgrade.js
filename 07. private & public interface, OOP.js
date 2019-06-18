/* Статьи:
http://learn.javascript.ru/about-oop
http://learn.javascript.ru/internal-external-interface
*/

/* 1) Что такое класс? 

- шаблон / программный код для создания новых объектов и методов (конструктор)

2) Дай определение внутреннему и внешнему интерфейсу и приведи простой пример.

- внутренний – приватные свойства и методы, доступ к которым можно получить только через другие методы объекта
- внешний – публичные свойства и методы, доступные снаружи объекта
*/

function washingMachine(turned) {

    this.turned = 'off'; // публичное св-во

    this.run = function() { // публичный метод
        return showStatus();
    };

    let self = this;

    function showStatus() { // приватная функция
        alert(`This washing machine is turned ${self.turned}`);
    };

}

var washingMachine = new washingMachine();

washingMachine.turned = 'on';
washingMachine.run();
washingMachine.turned = 'off';
washingMachine.run();

/* 3) Что такое инкапсуляция?

- один из принципов ООП отделения и защиты внутреннего интерфейса
*/

/* Добавить метод и свойство кофеварке */

function CoffeeMachine(power) {
  this.waterAmount = 0;
  ​
  const WATER_HEAT_CAPACITY = 4200;
  ​
  let self = this;
  let timerId;
  ​
  function getBoilTime() {
    return self.waterAmount * WATER_HEAT_CAPACITY * 80 / power;
}
​
function onReady() {
    alert( 'Кофе готово!' );
}
​
this.run = function() {
    timerId = setTimeout(onReady, getBoilTime());
}
​
this.stop = function() {
    clearTimeout(timerId);
};
​
}

var coffeeMachine = new CoffeeMachine(50000);
coffeeMachine.waterAmount = 200;

coffeeMachine.run();
coffeeMachine.stop();

/* 4. [practice] Опиши любой объект из реального мира в парадигме ООП. 
У него обязательно должен быть внутренний и внешний интерфейс, приватное свойство (или свойства). 
Прокомментриуй в формате jsDoc свой код.
*/

/**
 * Creating empty obj
 *
 * @constructor
 * @this {}
 */

function Watch() {

    let today = new Date();

/* @public method - shows current time
 * 
 * @this {}
 * @type {string} time - current time
 */

    this.showTime = function() {
        let time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
        alert(time);
    }

/* @public method - shows current date
 * 
 * @this {}
 * @type {string} date - current date
 */

    this.showDate = function() {
        let date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
        alert(date);
    }

/*  @private property - undefined
 */

    let timerID;

/* 
 * @constant {number} MS - conversion to milliseconds
 */

    const MS = 1000;

/* @private function - displays a message and cancels the timer if true / sets another timer if false
 */

    function setTimer() {
        if (!confirm(`Your ${this.timer} seconds are up!`)) { 
            this.setTimer(this.timer); 
        }
    }

/* @public method - triggers a message with a given time delay
 * 
 * @this {}
 * @param {number} timer - countdown in seconds set by user
 * @type {number} (timer * MS) - countdown in milliseconds
 */

    this.setTimer = function(timer) {
        this.timer = timer;
        timerID = setTimeout(setTimer.bind(this), (timer * MS));
    }

/* @public method - cancels the trigger
 * 
 * @this {}
 * @type {number} timerID - value returned by setTimeout to cancel the function
 */

    this.cancelTimer = function() {
        clearTimeout(timerID);
    }

}

var watch = new Watch();

watch.showTime();
watch.showDate();
watch.setTimer(2);
watch.cancelTimer();

/* 5. [practice] Нужно модифицировать уже знакомый тебе todolist. 
Сейчас он написан в процедурном стиле, а необходимо применить ООП.
Все требования и нюансы описаны в задании.
Пока что функционал ограничен, но мы будем его расширять.
*/

const TEMPLATE_TODO = document.querySelector('#tplToDoList').content;
const TEMPLATE_LI = document.querySelector('#tplItem').content;

function ToDoList(insertHere) {
    let container =  insertHere || document.body;

    let template = TEMPLATE_TODO.cloneNode(true);
    template.querySelector('#buttonAdd').addEventListener('click', addTask);
    container.appendChild(template);

    function removeTask() {
        this.closest('li').remove();
    }

    function addTask() {
        let template = TEMPLATE_LI.cloneNode(true);
        let currentList = this.closest('.container');
        template.querySelector('._text').innerText = currentList.querySelector('#taskValue').value;
        currentList.querySelector('#taskValue').value = '';
        template.querySelector('._delete').addEventListener('click', removeTask);
        currentList.appendChild(template);
    }

}

let toDo1 = new ToDoList();
// create div.here in html
let toDo2 = new ToDoList(document.querySelector('.here'));