
class View {

    constructor({appID,title}){
        this.ID = appID;
        this.title = title;
    }
}

class Todo extends View {

    constructor(settingsTodo){
        super(settingsTodo);
        this.prewDate = [];
        this.prewTime = [];
    }

    build(){
        
        let time = new Date().toLocaleDateString().split('.').reverse().join().replace(/\,/g,'-');

        let wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');

        let footer = document.createElement('div');
        footer.classList.add('footer');

        let section = document.createElement('div');
        section.classList.add('section');

        let todoList = document.createElement('div');
        todoList.classList.add('todoList');

        let titleName = document.createElement('h1');
        titleName.classList.add('title');
        titleName.innerHTML = this.title;

        let titleTodoList = document.createElement('h3');
        titleTodoList.classList.add('todoList__title');
        titleTodoList.innerHTML = 'list'.toLocaleUpperCase();

        let todoControllers = document.createElement('div');
        todoControllers.classList.add('controllers');

        let input = document.createElement('input');
        input.setAttribute('type','text');
        input.setAttribute('maxlength', '110');
        input.classList.add('getTodo');
        input.setAttribute('placeholder','What should you do?');

        let button = document.createElement('input');
        button.setAttribute('type','button');
        button.classList.add('setTodo');
        button.setAttribute('value','ADD');

        let datePick = document.createElement('input');
        datePick.classList.add('date');
        datePick.setAttribute('type','datetime-local');
        datePick.setAttribute('value',time  + `T${new Date().toLocaleTimeString()}`);

        footer.appendChild(titleName);

        todoControllers.appendChild(input);
        todoControllers.appendChild(datePick);
        todoControllers.appendChild(button);

        todoList.appendChild(titleTodoList);
        section.appendChild(todoList);

        wrapper.appendChild(footer);
        wrapper.appendChild(todoControllers);
        wrapper.appendChild(section);
        this.ID.appendChild(wrapper);
    }

    showNewTodo(value){
    let arrayTodo = value.split(',');
    let here = document.querySelector('.todoList');
    let oldTodo = document.querySelectorAll('p');

    let todoList;
    let dateAdd;
    if (oldTodo.length){
        oldTodo.forEach(element => {
            element.remove();
        });;
    }
    for (let i = 0; i < arrayTodo.length; i++){

        todoList = document.createElement('p');
        dateAdd = document.createElement('p');
        dateAdd.classList.add('dateAdd');
        dateAdd.innerHTML = 'Last add: ' + localStorage.timeAdd;
        todoList.setAttribute('draggable','true');

        if (arrayTodo.length-1 === i) {

            this.prewDate.push(localStorage.newDate);
            this.prewTime.push(localStorage.newTime);
        } 

        todoList.dataset.date = this.prewDate[i];
        todoList.dataset.time = this.prewTime[i];
        todoList.dataset.num = i;
        todoList.innerHTML = arrayTodo[i];
        here.appendChild(todoList);
    } 
    debugger;

    if (localStorage.newDate) {
    let ab = Date.now();
    let ac = new Date(localStorage.newDate.split('.').reverse().join().replace(/\./g,',')).getTime();
    let seconds = ((ac - ab)/1000.0);
    let hours = mins/60;
    let days = hours/24;
    }
    localStorage.removeItem('newDate');
    localStorage.removeItem('newTime');
    here.insertBefore(dateAdd,here.children[1]);

    }

}