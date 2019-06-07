/*
1) Что такое конструктор в JS ?

- любая функция, вызванная через специальный оператор new. Предназначен для создания множества однотипных объектов.

2) Что происходит в общем случае при вызове функции через оператор new ? Опиши пошагово.

- создаёт пустой объект
- в this содержится ссылка на данный объект
- функция выполняется и добавляет методы и свойства
- возвращает этот this
*/

/* Статья: 
https://learn.javascript.ru/constructor-new
*/

/* Создать Calculator при помощи конструктора */

function Calculator() {
    return {
        read = function() {
            this.a = +prompt('a?');
            this.b = +prompt('b?');
        },
        sum = function() {
            return this.a + this.b;
        },
        mul = function() {
            return this.a * this.b;
        } 
    } 
}

var calculator = new Calculator();
calculator.read();

alert( "Сумма=" + calculator.sum() );
alert( "Произведение=" + calculator.mul() );

/* Создать Accumulator при помощи конструктора */

function Accumulator(startingValue) {
    this.value = startingValue;

    this.read = function() {
        this.value += +prompt('enter number to add:', 0);
    }
}

var accumulator = new Accumulator(1);
accumulator.read();
accumulator.read();
alert( accumulator.value );

/* Создайте калькулятор */

function Calculator() {

    this.calculate = function(str) {
        let [a, o, b] = str.split(' ');
        if ((math[o]) && !isNaN(+a) && !isNaN(+b)) {
            return math[o](+a, +b);
        };
        return 'Please enter a valid statement: "number + number"';
    };
    
    this.addMethod = function(name, func) {
        math[name] = func;
    }

    var math = {
        '+': (x, y) => x + y,
        '-': (x, y) => x - y
    };

}

var calc = new Calculator;
alert( calc.calculate("3 + 7") );

var powerCalc = new Calculator;
powerCalc.addMethod("*", function(a, b) {
  return a * b;
});
powerCalc.addMethod("/", function(a, b) {
  return a / b;
});
powerCalc.addMethod("**", function(a, b) {
  return Math.pow(a, b);
});

var result = powerCalc.calculate("2 ** 3");
alert( result );