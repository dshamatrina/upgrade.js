/* Статья: 
https://learn.javascript.ru/static-properties-and-methods
*/

/* 1) Что такое статическое свойство?

- это свойство, не привязанное к конкретному экземпляру объекта. Хранят данные всех созданных экземпляров объекта.

2) Дай определение статическому методу

- методы, не привязанные к конкретному объекту; могут быть вспомогательными и требовать наличия объекта

3) Что такое фабричный метод и чем отличается от статического метода?

- это статический метод, который создаёт новый объект

*/

/* Счетчик объектов */

function Article() {
  this.created = new Date();
  Article.count++;
  Article.date = this.created;
}

Article.count = 0;
Article.date;

Article.showStats = function() {
    alert(`Всего: ${this.count}, Последняя: ${this.date}`);
}

new Article();
new Article();

Article.showStats(); // Всего: 2, Последняя: (дата)

new Article();

Article.showStats(); // Всего: 3, Последняя: (дата)

////////////////////////////////////

/* 1. [practice] Можно ли как-то вызвать метод logName у экземпляра объекта user ? Объясни. */

function User(name) {
    this.name = name || 'noname';
}

User.logName = function (name) { console.log(name || 'noname'); }

let user = new User('Вася');

/* Нет. Метод User.logName - статический, он не может относиться к какому-либо экземпляру объекта User. 
Работает даже без создания Userа.*/
