
class ListModal{

    constructor(num,string){
        this.number = num;
        this.todo = string;
    }
}

class Storage extends ListModal{
    constructor(){
        super();
        this.arrayList = [];
    }

    store(stringTodo){
        (stringTodo) && (this.arrayList.push(stringTodo));
        localStorage.list = this.arrayList.join();
        (localStorage.newTodo) && (localStorage.removeItem('newTodo'));
    }

    resetStore(){
        localStorage.clear();
    }

    updateStorage(key, current){
        this.arrayList = [];
        current.forEach(element => {
            this.arrayList.push(element.innerHTML);
        });
        localStorage[key] = this.arrayList.join();
    }
}

class View {

    constructor({appID,title}){
        this.ID = appID;
        this.title = title;
    }
}

class Todo extends View {

    constructor(settingsTodo){
        super(settingsTodo);
    }

    build(){
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
        input.setAttribute('placeholder','What should you do today?');

        let button = document.createElement('input');
        button.setAttribute('type','button');
        button.classList.add('setTodo');
        button.setAttribute('value','ADD');

        footer.appendChild(titleName);

        todoControllers.appendChild(input);
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

    if (oldTodo.length){

        oldTodo.forEach(element => {
            element.remove();
        });;
    }

    for (let i = 0; i < arrayTodo.length; i++){

    let todoList = document.createElement('p');
    todoList.setAttribute('draggable','true');
    todoList.dataset.num = i;
    todoList.innerHTML = arrayTodo[i];
    here.appendChild(todoList);
    }

    }

}
class TodoControl extends Storage{

    constructor({controllerEnter,btn}){
    super();
    this.btnEnter = controllerEnter;
    this.btnAdd = btn;
    }

    setLsitener(todoView){

        document.addEventListener('click',(e) =>{
            
            if ((e.target.classList[0] === 'setTodo') && (this.btnEnter.value)) {
            localStorage.setItem('newTodo',this.btnEnter.value);
            this.store(localStorage.newTodo);
            console.log(this.btnEnter.value.length);
            todoView.showNewTodo(localStorage.list);
            this.btnEnter.value = '';
            }

            if (e.target.dataset.num) {
               let splits = localStorage.list.split(',');
               let currentTodo = null;

               if (splits.some((item) => item === e.target.innerHTML)) {
                   
                e.target.remove();
                currentTodo = document.querySelectorAll('[data-num]');
                this.updateStorage('list',currentTodo);
               }
            }

        },false);
        window.addEventListener('storage',(v) => {
            
            (v.key === 'list') && (showNewTodo(todoView.newValue));
        },false);

        window.addEventListener('DOMContentLoaded',() =>{
            (localStorage.list) && (this.store(localStorage.list));
            (localStorage.list) && (todoView.showNewTodo(localStorage.list));
        },false);
    }
}

(function(){

    function main() {

        let settingsTodo = {appID: document.getElementById('todo'),title:'Todo-list'};

        let storageData = new Storage();
        let todoView = new Todo(settingsTodo);
        todoView.build();

        let controllerSettings = {
            controllerEnter: document.querySelector('.getTodo'),
            btn: document.querySelector('.setTodo')
        }
        let controller = new TodoControl(controllerSettings);
        controller.setLsitener(todoView);
    }

    return todo = { init: main }

})();

todo.init();
//# sourceMappingURL=app.js.map
