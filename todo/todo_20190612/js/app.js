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
let toDo2 = new ToDoList(document.querySelector('.here'));