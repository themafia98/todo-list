
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

    static checkEmpty(modal = document.createElement('div')){
        
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

        let sortWrapper = document.createElement('div');
        sortWrapper.classList.add('sortWrapper');

        let sortBtnBefore = document.createElement('input');
        sortBtnBefore.setAttribute('type','button');
        sortBtnBefore.classList.add('sort');
        sortBtnBefore.classList.add('sortBefore');
        sortBtnBefore.value = 'past';

        let sortBtnCurrent = document.createElement('input');
        sortBtnCurrent.setAttribute('type','button');
        sortBtnCurrent.classList.add('sort');
        sortBtnCurrent.classList.add('sortCurrent');
        sortBtnCurrent.value = 'current';

        let sortBtnAfter = document.createElement('input');
        sortBtnAfter.setAttribute('type','button');
        sortBtnAfter.classList.add('sort');
        sortBtnAfter.classList.add('sortAfter');
        sortBtnAfter.value = 'future';

        let sortBtnAll = document.createElement('input');
        sortBtnAll.setAttribute('type','button');
        sortBtnAll.classList.add('sort');
        sortBtnAll.classList.add('sortAll');
        sortBtnAll.value = 'all';

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


        sortWrapper.appendChild(sortBtnBefore);
        sortWrapper.appendChild(sortBtnCurrent);
        sortWrapper.appendChild(sortBtnAfter);
        sortWrapper.appendChild(sortBtnAll);

        section.appendChild(sortWrapper);
        section.appendChild(todoList);

        wrapper.appendChild(footer);
        wrapper.appendChild(todoControllers);
        wrapper.appendChild(section);
        this.ID.appendChild(wrapper);
    }

    sortTodos(todo = [],type,currentTodos){

        

        if (type != 'sortAll'){
            
            todo.forEach(element =>  element.classList.add('hide'));
            currentTodos.forEach(element => element.classList.toggle('hide'));
            return;
        }

        if (type === 'sortAll'){
        todo.forEach( element => (element.classList[1] === 'hide') && (element.classList.toggle('hide')) );
        }
    }

    showNewTodo(value = false){

    let here = document.querySelector('.todoList');
    let oldTodo = document.querySelectorAll('p');
    let todoList;
    const NOW = Date.now();
        debugger;
    (oldTodo.length) && (oldTodo.forEach(element => element.remove()));

    for (let i = 0; i < value.length; i++){

        if(value[i].save){

            todoList = document.createElement('p');
            todoList.setAttribute('draggable','true');

            this.arrayJSON = JSON.parse(localStorage.date);

            todoList.dataset.date = this.arrayJSON[i];

            let dateNow = JSON.parse(localStorage.date)[i];
            let todoDay = new Date(dateNow.split('.').reverse().join().replace(/\./g,',')).getTime();
            let today = new Date(NOW).toLocaleDateString();

            if (todoList.dataset.date === today) {
                todoList.classList.add('today')
            } else if (todoDay < NOW){
                todoList.classList.add('unactive');
            } else if (todoDay > NOW){
                todoList.classList.add('future');
            }

            todoList.dataset.unique = value[i].uniqueId;
            todoList.innerHTML = value[i].value;

            here.appendChild(todoList);

        }
    }

    localStorage.removeItem('newTime');
    localStorage.removeItem('newTodo');
    }

    showModal(jsonObject = 'click for add note'){


        let num = jsonObject.findIndex(element => element.uniqueId === this.dataset.unique);

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
        additionalNotes.innerHTML = jsonObject[num].note;

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