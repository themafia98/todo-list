
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
        
            let weatherBox = document.querySelector('.weather-box');
            if (!weatherBox){
                weatherBox = document.createElement('div');
                weatherBox.classList.add('weather-box');
            };
            load.classList.add('center');
            modal.appendChild(weatherBox);
            weatherBox.appendChild(load);

            return weatherBox;
    }

    static checkEmpty(modal){
        
        let weatherLists = document.querySelector('.weatherList');
        let weatherBox = document.querySelector('.weather-box');
        let checkP = document.querySelectorAll('.weather');

        if (checkP.length === 0){

            let weatherView = document.createElement('p');
            weatherView.classList.add('weather');
            weatherView.classList.add('weatherNone');
            weatherView.innerHTML = `Weather not found`;
            weatherLists.remove();
            weatherBox.remove();
            modal.appendChild(weatherView);

        }
    }

    static spinnerHide(){

        let spinner = document.querySelector('.weather-box');
        (spinner) && (spinner.remove());
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


        footer.appendChild(titleName);

        todoControllers.appendChild(input);
        todoControllers.appendChild(datePick);
        todoControllers.appendChild(button);


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
    const NOW = Date.now();

    if (oldTodo.length){
        oldTodo.forEach( (element,i) => {
            element.remove();
        });;
    }

    for (let i = 0; i < value.length; i++){

        if(value[i].save){
            
            todoList = document.createElement('p');
            todoList.setAttribute('draggable','true');

        if (localStorage.date) {

            this.arrayJSON = JSON.parse(localStorage.date);

            todoList.dataset.date = this.arrayJSON[i];

            let dateNow = JSON.parse(localStorage.date)[i];
            let todoDay = new Date(dateNow.split('.').reverse().join().replace(/\./g,',')).getTime();
            let today = new Date(NOW).toLocaleDateString();

            (todoList.dataset.date === today) && (todoList.classList.add('today'));
            (todoDay < NOW) && (todoList.classList.add('unactive'));


        } else if ((localStorage.prewDate) && (localStorage.prewTime)){

            todoList.dataset.date =  JSON.parse(localStorage.prewDate)[i];
            todoList.dataset.time =  JSON.parse(localStorage.prewTime)[i];

            (todoList.dataset.date === today) && (todoList.classList.add('today'));
            (todoDay < today) && (todoList.classList.add('unactive'));
        }

        
        todoList.dataset.unique = value[i].uniqueId;
        todoList.innerHTML = value[i].value;

        here.appendChild(todoList);
        } 
    }

    localStorage.removeItem('newTime');
    localStorage.removeItem('newTodo');
    }

    showModal(){


        let getList = document.getElementById('todo');

        let modalBg = document.createElement('div');
        modalBg.classList.add('background-modal');

        let modal = document.createElement('div');
        modal.classList.add('modal-window');
        modal.dataset.modalNum = this.dataset.unique;

        let closeBtn = document.createElement('input');
        closeBtn.setAttribute('type','button');
        closeBtn.setAttribute('value','X');
        closeBtn.classList.add('close');

        let deleteBtn = document.createElement('input');
        deleteBtn.setAttribute('type','button');
        deleteBtn.setAttribute('value','Delete todo');
        deleteBtn.classList.add('delete');

        let noteZone = document.createElement('div');
        noteZone.classList.add('textArea');

        let currentTodo = document.createElement('p');
        currentTodo.classList.add('currentTodo');
        currentTodo.innerHTML = this.innerHTML;

        let additionalNotesTitle = document.createElement('p');
        additionalNotesTitle.classList.add('addNotes__title');
        additionalNotesTitle.innerHTML = 'additional notes';

        let edditableWrapper = document.createElement('div');
        edditableWrapper.classList.add('editWrapper');
        
        let additionalNotes = document.createElement('p');
        additionalNotes.classList.add('addNotes');
        additionalNotes.innerHTML = 'click for add note';

        let weatherList = document.createElement('ul');
        weatherList.classList.add('weatherList');
 
        let showTodoDate = document.createElement('p');
        showTodoDate.classList.add('modal-date');
        showTodoDate.innerHTML = this.dataset.date;

        

        modal.appendChild(closeBtn);
        modal.appendChild(showTodoDate);
        modal.appendChild(deleteBtn);

        noteZone.appendChild(currentTodo);
        edditableWrapper.appendChild(additionalNotesTitle);
        edditableWrapper.appendChild(additionalNotes);
        noteZone.appendChild(edditableWrapper);
        modal.appendChild(noteZone);

        modal.appendChild(weatherList);
        modalBg.appendChild(modal);
        getList.appendChild(modalBg);

    }

    createEditInput(target){

        let addNotes = document.querySelector('.addNotes');
        let textArea = document.querySelector('.textArea');

        let edditableWrapper = document.querySelector('.editWrapper');
        let inputEdit = document.createElement('textarea');
        let buttonEdit = document.createElement('input');


        
        addNotes.classList.add('visibility');
        inputEdit.setAttribute('maxLength' ,'100');
        inputEdit.classList.add('edditable');
        inputEdit.value = addNotes.innerHTML;
        buttonEdit.setAttribute('type','button');
        buttonEdit.classList.add('editButton');
        buttonEdit.setAttribute('value','Edit');


        edditableWrapper.appendChild(inputEdit);
        edditableWrapper.appendChild(buttonEdit);
        textArea.appendChild(edditableWrapper);
    }
}