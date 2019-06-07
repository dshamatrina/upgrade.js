/* Статья: 
https://learn.javascript.ru/call-apply
*/

/* Перепишите суммирование аргументов*/

1.
function sumArgs() {
  arguments.reduce = [].reduce;

  return arguments.reduce(function(a, b) {
    return a + b;
  });

}

alert( sumArgs(1, 2, 3) ); 

2.
function sumArgs() {
  var reduce = [].reduce;

  return reduce.call(arguments, function(a, b) {
    return a + b;
  });

}

alert( sumArgs(1, 2, 3) ); 

3. 
function sumArgs() {
  var reduce = [].reduce;
  
  return reduce.apply(arguments, [function(a, b) {
    return a + b;
  }]);

}

alert( sumArgs(1, 2, 3) );

/* Примените функцию к аргументам */

function applyAll(func, ...rest) {
    return func.call(null, ...rest);
}

// Применить Math.max к аргументам 2, -2, 3
alert( applyAll(Math.max, 2, -2, 3) ); // 3

// Применить Math.min к аргументам 2, -2, 3
alert( applyAll(Math.min, 2, -2, 3) ); // -2

function sum() { // суммирует аргументы: sum(1,2,3) = 6
  return [].reduce.call(arguments, function(a, b) {
    return a + b;
  });
}

function mul() { // перемножает аргументы: mul(2,3,4) = 24
  return [].reduce.call(arguments, function(a, b) {
    return a * b;
  });
}

alert( applyAll(sum, 1, 2, 3) ); // -> sum(1, 2, 3) = 6
alert( applyAll(mul, 2, 3, 4) ); // -> mul(2, 3, 4) = 24

////////////////////////////////////

/* Статья: 
https://learn.javascript.ru/bind
*/

/* Использование функции вопросов*/

"use strict";

function ask(question, answer, ok, fail) {
  var result = prompt(question, '');
  if (result.toLowerCase() == answer.toLowerCase()) ok();
  else fail();
}

var user = {
  login: 'Василий',
  password: '12345',

  loginOk: function() {
    alert( this.login + ' вошёл в сайт' );
  },

  loginFail: function() {
    alert( this.login + ': ошибка входа' );
  },

  checkPassword: function() {
    ask("Ваш пароль?", this.password, this.loginOk.bind(this), this.loginFail.bind(this));
  }
};

user.checkPassword();

/* Использование функции вопросов с каррингом */

"use strict";

function ask(question, answer, ok, fail) {
  var result = prompt(question, '');
  if (result.toLowerCase() == answer.toLowerCase()) ok();
  else fail();
}

var user = {
  login: 'Василий',
  password: '12345',

  // метод для вызова из ask
  loginDone: function(result) {
    alert( this.login + (result ? ' вошёл в сайт' : ' ошибка входа') );
  },

  checkPassword: function() {
    var doneYes = this.loginDone.bind(this, true); 
    var doneNo = this.loginDone.bind(this, false);
    ask("Ваш пароль?", this.password, doneYes, doneNo);
  }
};

var vasya = user;
user = null;
vasya.checkPassword();

////////////////////////////////////

/*
1) Что принимает метод call (apply, bind), и что возвращает?

- call(сontext, arg1, arg2)
- apply(context, [arg1, arg2])
оба метода вызывают функцию с навязанным контекстом и аргументами

- bind(func, context) or func.bind(context)
возвращает функцию-обёртку, которая при вызове вызовет исходную функцию с навязанным контекстом

2) Опиши пример “одалживания метода”

function joinArgs() {
    arguments.join = [].join;
    alert(arguments.join(':'));
}

joinArgs(1, 2, 3); // 1:2:3

3) Что будет записано в this при вызове функции как метода объекта?
obj.foo(); // obj
А с помощью apply, call?
foo.call(o); // o
foo.apply(o); // o
А при вызове с оператором new?
new foo(); // {}
А при обычном вызове? 
foo(); // window object или undefined при "use strict"

Что такое каррирование?

- создание новой функции путём фиксирования переменных текущей
*/

////////////////////////////////////

/* Решение задач из статьи (https://learn.javascript.ru/call-apply) 
с использованием spread оператора (но без использования call или apply) */

function sumArgs(...args) {
  return args.reduce(function(a, b) {
    return a + b;
  });
}

alert( sumArgs(1, 2, 3) );

////////////////////////////////////

Math.min.apply(Math, [1,-5,4]) == Math.min.apply(window, [1,-5,4]) // true

/*
Метод apply в качестве аргументов принимает контекcт и аргументы метода Math.min) 
Контекстом может быть любое значение, т.к. в методе Math.max не используется this*/

////////////////////////////////////

/* Перепиши вызов setTimeout так чтобы в консоль выводилось правильное сообщение. 
Используй привязку контекста. */

let human = {
    name: 'Harry',
    say: function() {
        console.log(`Hello. My name is ${this.name}`);
    }
}

setTimeout(human.say.bind(human), 1000);

////////////////////////////////////

/* Что вернут вызовы? Объясни почему. */

const Snow = {surname: 'Snow'}
const char = {
  surname: 'Stark',
  knows: function(arg, name) {
    console.log(`You know ${arg}, ${name} ${this.surname}`);
  }
}

char.knows('something', 'Bran'); // You know something, Bran Stark
char.knows.call(Snow, 'nothing', 'Jon'); // You know nothing, Jon Snow
char.knows.apply(Snow, ['nothing', 'Jon']); // You know nothing, Jon Snow

////////////////////////////////////

/* Что вернет последнее выражение? Объясни что происходит с аргументами. */

function foo(a, b) {
    console.log(a, b);
}

foo.bind(null, 1, 2)(3, 4);

/*Последнюю строку можно было расписать как:*/

var f = foo.bind(null, 1, 2);
f(3, 4);

/* Каррирование создаёт новую функцию f, в которой 
a = 1, b = 2 - это фиксированные переменные,  а 3 и 4 - доп. переменные, которые 
никуда не записываются и никак не применяются в функции.
Если вместо a и b указать spread оператор или выводить в консоль arguments,
выведутся все значения.*/
