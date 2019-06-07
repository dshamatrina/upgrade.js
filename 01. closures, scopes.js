/*
 1) Что такое LexicalEnvironment лексическое окружение и как оно работает?

 - внутренний объект переменных, который создаётся при запуске функции и скрыт от прямого доступа

 2) Что такое Scope область видимости, где это есть и как работает?

 - скрытое внутреннее свойство внутри любой функции, содержащее ссылку на внешний объект переменных (или лексическое окружение объекта, в котором она была создана)

 3) Что такое статические переменные (свойства и методы) и как их объявлять?

 - переменные, которые не меняются при перезапуске функции.

 объявляются в замыкании или через свойство функции*/

 function incr(){
    var count = 0;
    count++;
    console.log(count);
}
incr();

function incr(){
    return incr.count++;
}
incr.count = 0;
incr();

 /* 4) Что называется замыканием и приведи пример.

 - все внешние переменные (из внешнего окружения) (исходя из learn.javascript)
 - функции, ссылающиеся на независимые (свободные) переменные. Другими словами, функция, определённая в замыкании, «запоминает» окружение, в котором она была создана (из MDN)
*/

function outerF(numA) {
  var numB = 5;
  function innerF(numC) {
    return numA + numB + numC;
  }
  return innerF;
}

var result = outerF(3);
console.log(result(7));

/* 3. [practice] Написать функцию add которая используется так:

 add(3)(4) // 7;

*/

function add(a) {
    function adding(b) {
        return a + b
    }
    return adding
}

add(3)(4);

/* 4. [practice] Усовершенствуй функцию-счётчик из статьи http://learn.javascript.ru/closures так чтобы она могла увеличивать счётчик, 
сбрасывать и выставлять конкретное значение, при этом саму переменную всё еще нельзя было изменить напрямую. 
Использование должно выглядеть так:

let counter = makeCounter();
counter() // 1;
counter.reset() // 0;
counter.set(4); // 4;
*/

function makeCounter() {
    counter.currentCount = 1;

    function counter() {
    return counter.currentCount++;
    }
    counter.reset = function() {
        return counter.currentCount = 0;
    }
    counter.set = function(start) {
        return counter.currentCount = start;
    }

    return counter;
}

let counter = makeCounter();
counter();
counter.reset();
counter.set(4);