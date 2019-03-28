
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
        this.arrayList.push(stringTodo);
        localStorage.list = this.arrayList.join();
        debugger;
        (localStorage.newTodo) && (localStorage.removeItem('newTodo'));
    }
}
console.log('list');

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

}
class todoControl extends Storage{

    constructor({btn,controllerEnter}){
    super();
    this.btnEnter = controllerEnter;
    this.btnAdd = btn;
    }

    setLsitener(){
        this.btnAdd.addEventListener('click',() =>{
            
            (this.btnAdd) &&
            localStorage.setItem('newTodo',this.btnEnter.value);
            this.store(localStorage.newTodo);
        })
    }
}

(function(){

    let settingsTodo = {
        appID: document.getElementById('todo'),
        title:'Todo-list'
    }

    let todoView = new Todo(settingsTodo);
    todoView.build();

    let settingsController = {
        controllerEnter: document.querySelector('.getTodo'),
        btn: document.querySelector('.setTodo')
    }

    let storageData = new Storage();
    let controller = new todoControl(settingsController);
    controller.setLsitener();

})();
//# sourceMappingURL=app.js.map
