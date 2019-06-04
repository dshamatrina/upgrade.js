/*
1) Что такое конструктор в JS ?

- любая функция, вызванная через специальный оператор new. Предназначен для создания множества однотипных объектов.

2) Что происходит в общем случае при вызове функции через оператор new ? Опиши пошагово.

- создаёт пустой объект
- в this содержится ссылка на данный объект
- функция выполняется и добавляет методы и свойства
- возвращает этот this
*/

/* Создать Calculator при помощи конструктора

Напишите функцию-конструктор Calculator, которая создает объект с тремя методами:

Метод read() запрашивает два значения при помощи prompt и запоминает их в свойствах объекта.
Метод sum() возвращает сумму запомненных свойств.
Метод mul() возвращает произведение запомненных свойств.
Пример использования:
*/

var calculator = new Calculator();
calculator.read();

alert( "Сумма=" + calculator.sum() );
alert( "Произведение=" + calculator.mul() );
//

function Calculator() {
    this.read = function() {
        this.a = +prompt('a?');
        this.b = +prompt('b?');
    };
    this.sum = function() {
        return this.a + this.b;
    };
    this.mul = function() {
        return this.a * this.b;
    };  
}

var calculator = new Calculator();
calculator.read();

alert( "Сумма=" + calculator.sum() );
alert( "Произведение=" + calculator.mul() );

/* Создать Accumulator при помощи конструктора

Напишите функцию-конструктор Accumulator(startingValue). Объекты, которые она создает, должны хранить текущую сумму и прибавлять к ней то, что вводит посетитель.

Более формально, объект должен:

Хранить текущее значение в своём свойстве value. Начальное значение свойства value ставится конструктором равным startingValue.
Метод read() вызывает prompt, принимает число и прибавляет его к свойству value.
Таким образом, свойство value является текущей суммой всего, что ввел посетитель при вызовах метода read(), с учетом начального значения startingValue.

Ниже вы можете посмотреть работу кода:
*/

var accumulator = new Accumulator(1); // начальное значение 1
accumulator.read(); // прибавит ввод prompt к текущему значению
accumulator.read(); // прибавит ввод prompt к текущему значению
alert( accumulator.value ); // выведет текущее значение

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

/* Создайте калькулятор

Напишите конструктор Calculator, который создаёт расширяемые объекты-калькуляторы.

Эта задача состоит из двух частей, которые можно решать одна за другой.

1. Первый шаг задачи: вызов calculate(str) принимает строку, например «1 + 2», 
с жёстко заданным форматом «ЧИСЛО операция ЧИСЛО» (по одному пробелу вокруг операции), 
и возвращает результат. Понимает плюс + и минус -.

2. Второй шаг – добавить калькулятору метод addMethod(name, func), который учит калькулятор новой операции. 
Он получает имя операции name и функцию от двух аргументов func(a,b), которая должна её реализовывать.
Например, добавим операции умножить *, поделить / и возвести в степень **:

Поддержка скобок и сложных математических выражений в этой задаче не требуется.
Числа и операции могут состоять из нескольких символов. Между ними ровно один пробел.
Предусмотрите обработку ошибок. Какая она должна быть – решите сами.
*/

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