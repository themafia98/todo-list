
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
        this.arrayTodo = [];
        this.arrayJSON = [];
        this.saveP = [];
    }

    spinnerShow(modal,load){

            let weatherBox = document.createElement('div');
            weatherBox.classList.add('weather-box');
            load.classList.add('center');
            modal.appendChild(weatherBox);
            weatherBox.appendChild(load);
    }

    static checkEmpty(modal){
        debugger;
        let checkP = document.querySelectorAll('.weather');
        if (checkP.length === 0){
        let weatherView = document.createElement('p');
        weatherView.classList.add('weather');
        weatherView.innerHTML = `Weather not found`;
        modal.appendChild(weatherView);
    }

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

        // let titleTodoList = document.createElement('h3');
        // titleTodoList.classList.add('todoList__title');
        // titleTodoList.innerHTML = 'list'.toLocaleUpperCase();

        // let todoWrapperTitlte = document.createElement('div');
        // todoWrapperTitlte.classList.add('title');

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
        datePick.setAttribute('type','date');
        datePick.setAttribute('value',time);
        // + `T${new Date().toLocaleTimeString()}`

        footer.appendChild(titleName);

        todoControllers.appendChild(input);
        todoControllers.appendChild(datePick);
        todoControllers.appendChild(button);

        // todoWrapperTitlte.appendChild(titleTodoList);
        // todoList.appendChild(todoWrapperTitlte);
        section.appendChild(todoList);

        wrapper.appendChild(footer);
        wrapper.appendChild(todoControllers);
        wrapper.appendChild(section);
        this.ID.appendChild(wrapper);
    }

    showNewTodo(value){
        
    let here = document.querySelector('.todoList');
    let oldTodo = document.querySelectorAll('p');
    let todoList;
    let dateAdd;
    this.saveP = [];
        
    if (oldTodo.length){
        oldTodo.forEach( (element,i) => {
            
            if(element.classList[0] === 'unactive') { 
                value[i].save = true; this.saveP.push(oldTodo[i])}
            element.remove();
        });;
    }
    for (let i = 0; i < value.length; i++){




        if( (value[i].save) && ((this.saveP[i]) &&  (this.saveP[i].classList[0] === 'unactive'))){
            todoList = this.saveP[i];
        } else  {
            todoList = document.createElement('p');
            if(value[i].save) {
                
                todoList.classList.add('unactive');
            }
            
            if (todoList.dataset.date === Date.now()){
                
                todoList.classList = [];
                todoList.classList.add('today');
            }
        }

        todoList.setAttribute('draggable','true');
        
        if (localStorage.date) {
            
            this.arrayJSON = JSON.parse(localStorage.date);
            
            todoList.dataset.date = this.arrayJSON[i];

            let dateNow = JSON.parse(localStorage.date)[i];
            let todoDay = new Date(dateNow.split('.').reverse().join().replace(/\./g,',')).getTime();
            
            let today = new Date(Date.now()).toLocaleDateString();
            if (todoList.dataset.date === today) { todoList.classList.add('today');  } else
            if (todoDay < today) { todoList.classList.add('unactive');  }


        } else if ((localStorage.prewDate) && (localStorage.prewTime)){

            todoList.dataset.date =  JSON.parse(localStorage.prewDate)[i];
            todoList.dataset.time =  JSON.parse(localStorage.prewTime)[i];
        }

        todoList.dataset.num = i;
        todoList.innerHTML = value[i].value;

        here.appendChild(todoList);
    } 

    localStorage.removeItem('newTime');
    localStorage.removeItem('newTodo');
    
    (dateAdd) && (here.insertBefore(dateAdd,here.children[1]));

    }

    showModal(){

        let getList = document.getElementById('todo');

        let modalBg = document.createElement('div');
        modalBg.classList.add('background-modal');

        let modal = document.createElement('div');
        modal.classList.add('modal-window');
        modal.dataset.modalNum = this.dataset.num;

        let closeBtn = document.createElement('input');
        closeBtn.setAttribute('type','button');
        closeBtn.setAttribute('value','X');
        closeBtn.classList.add('close');

        let deleteBtn = document.createElement('input');
        deleteBtn.setAttribute('type','button');
        deleteBtn.setAttribute('value','Delete todo');
        deleteBtn.classList.add('delete');

 
        let showTodoDate = document.createElement('p');
        showTodoDate.classList.add('modal-date');
        showTodoDate.innerHTML = this.dataset.date;

        modal.appendChild(closeBtn);
        modal.appendChild(showTodoDate);
        modal.appendChild(deleteBtn);
        modalBg.appendChild(modal);
        getList.appendChild(modalBg);

    }
}