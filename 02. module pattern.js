/*1) Зачем нужны модули?

 чтобы скрыть внутренние детали реализации скрипта ( переменные, функции, константы )

2) Какие вариации паттерна модуль в js могут быть? Запиши.

 1. экспорт через window

  window.trash = trash;

 2. и return

  return {
      getItem: index => items[index];
    }

*/

// Option 1

(function() {

    let trash = function() {
    //
    }
    
    let items = [];
    let N = 2;
    
    trash.addItem = arg => {
        if (items.length == N) {
            return 'Please clear the trash first';
        }
        items.push(arg);
        return items;
    }
    
    trash.clear = () => {
        items.length = 0;
        return items;
    }
    
    trash.getItem = index => items[index];
    
    window.trash = trash;
}());

trash.addItem('фантик');
trash.getItem(0);
trash.clear();

// Option 2

let trash = (function() {

    let items = [];
    let N = 2;

    return {
        addItem: arg => {
            if (items.length == N) {
                return 'Please clear the trash first';
            }
            items.push(arg);
            return items;
        },
        clear: () => {
            items.length = 0;
            return items;
        },
        getItem: index => items[index];
    }
}());

/*2. Напиши модуль coloredConsole который будет выводить переданное методу log сообщение определенным цветом или черным если цвет не определен. Работать это должно так.

coloredConsole.log(‘show me’); // выводит в консоль сообщение чёрным цветом
coloredConsole.colorize(‘red’); // указали каким цветом выводить сообщения
coloredConsole.log(‘this message is red’); // а это сообщение уже красное

*/

let ColoredConsole = function() {

function log(msg) {
    console.log(`%c${msg}`, `color: ${fontColor}`);
}

let fontColor='black';

function colorize(color) {
    fontColor = color;
}

return {
    log: log,
    colorize: colorize,
}

}

let coloredConsole = ColoredConsole();

coloredConsole.log('show me');
coloredConsole.colorize('red');
coloredConsole.log('this message is red');
