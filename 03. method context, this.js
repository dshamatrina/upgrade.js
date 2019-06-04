/*
1) Чем является this ?
- ссылкой на текущий объект, в контексте которого вызван метод

2) Объясни чем именно полезен this ? Можно на примере

- функция работает именно с тем объектом, в контексте которого вызвана,
 т.е. можно вызвать одну и ту же функцию для разных объектов.
Значение this будет определяться только в момент вызова функции и принимать разный контекст
*/

function sayHi() {
  alert( this.firstName );
}
var user = { firstName: "Вася" };
var admin = { firstName: "Админ" };

user.hi = sayHi;
admin.hi = sayHi;

user.hi(); // Вася
admin.hi(); // Админ

/*
3) В каком случае в функцию передается this ? Ответь одним предложением.

- когда функция вызывается через точку или квадратные скобки.

*/

/* Создайте калькулятор

Создайте объект calculator с тремя методами:

read() запрашивает prompt два значения и сохраняет их как свойства объекта
sum() возвращает сумму этих двух значений
mul() возвращает произведение этих двух значений
*/

var calculator = {
    read: function() {
        this.valueA = +prompt('a?'),
        this.valueB = +prompt('b?')
    },
    sum: function() {
        return (this.valueA + this.valueB);
    },
    mul: function() {
        return (this.valueA * this.valueB);
    }
}

calculator.read();
alert( calculator.sum() );
alert( calculator.mul() );

/* Цепочка вызовов

Есть объект «лестница» ladder:*/

var ladder = {
    step: 0,
    up: function() { // вверх по лестнице
        this.step++;
    },
    down: function() { // вниз по лестнице
        this.step--;
    },
    showStep: function() { // вывести текущую ступеньку
      alert( this.step );
    }
};
/*Сейчас, если нужно последовательно вызвать несколько методов объекта, это можно сделать так:*/

ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
/*Модифицируйте код методов объекта, чтобы вызовы можно было делать цепочкой, вот так:*/

ladder.up().up().down().up().down().showStep(); // 1
/*Как видно, такая запись содержит «меньше букв» и может быть более наглядной.

Такой подход называется «чейнинг» (chaining) и используется, например, во фреймворке jQuery.*/

var ladder = {
    step: 0,
    up: function() { // вверх по лестнице
        this.step++;
        return this;
    },
    down: function() { // вниз по лестнице
        this.step--;
        return this;
    },
    showStep: function() { // вывести текущую ступеньку
        alert( this.step );
    }
};

ladder.up().up().down().up().down().showStep();

1. /* [practice] Посмотри на пример.
*/

let human = {
    name: 'Harry',
    say: function() {
        console.log(`Hello. My name is ${this.name}`);
    }
}

setTimeout(human.say, 1000);

/*
Как думаешь, что выведет консоль?
Как думаешь, почему?

Это распространенная ошибка на этапе когда еще нет понимания контекста.
Представь себе описание функции setTimeout, как вызывается переданная функция? 
И если внимательно читал статью, станет понятно почему консоль выводит такое сообщение.

Опиши ответ словами. Задача со звёздочкой :) но ты справишься.
*/


let human = {
    name: 'Harry',
    say: function() {
        console.log(`Hello. My name is ${this.name}`);
    }
}

setTimeout(human.say, 1000);

/*
Функция setTimeout принимает 2 аргумента - функцию, записанную в метод объекта human - human.say 
и время отсрочки выполнения 1 сек;
Функция setTimeout в развёрнутом виде:
*/

function setTimeout(func, time) {
    // LE = { func: human.say, time: 1000 }

    function func() {
        console.log(`Hello. My name is ${this.name}`);
    }
    
    //time delay
    
    func();
}

/*
Объявление функции вырывает значение метода say из его контекста, 
т.е. берётся только значение из свойства say объекта human, а остальные его свойства игнорируются. 
Функция сама по себе не запоминает контекст, поэтому this становится глобальный объект window. 
window.name - это встроенное свойство, значением которого является пустая строка "". 
Поэтому на первый взгляд кажется, что в консоли строка `Hello. My name is ` обрывается.
*/

2. /* [practice] Перепиши пример из предыдущего задания так 
чтобы консоль вывела ожидаемое сообщение.*/

let human = {
    name: 'Harry',
    say: function() {
        console.log(`Hello. My name is ${this.name}`);
    }
}

setTimeout(function() {
    human.say() 
}, 1000);