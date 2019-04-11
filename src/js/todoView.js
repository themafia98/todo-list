class View{

    constructor({appID,title}){
        this.ID = appID;
        this.title = title;
    }
}

class Todo extends View{

    constructor(settingsTodo){
        super(settingsTodo);
        this.arrayJSON = [];
    }

    spinnerShow(modal = document.createElement('div'),load = document.createElement('image')){

        let weatherBox = document.querySelector('.weather-box');

        if (!weatherBox){

            weatherBox = document.createElement('div');
            weatherBox.classList.add('weather-box');

        };

        load.classList.add('center');

        modal.appendChild(weatherBox);
        weatherBox.appendChild(load);
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

    build(time){

        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');

        const footer = document.createElement('div');
        footer.classList.add('footer');

        const section = document.createElement('div');
        section.classList.add('section');

        const sortWrapper = document.createElement('div');
        sortWrapper.classList.add('sortWrapper');


        const selectCalendar = document.createElement('input');
        selectCalendar.setAttribute('type','button');
        selectCalendar.classList.add('selectCalendar');
        selectCalendar.value = 'select date';

        const sortBtnBefore = document.createElement('input');
        sortBtnBefore.setAttribute('type','button');
        sortBtnBefore.classList.add('sort');
        sortBtnBefore.classList.add('sortBefore');
        sortBtnBefore.value = 'past';

        const sortBtnCurrent = document.createElement('input');
        sortBtnCurrent.setAttribute('type','button');
        sortBtnCurrent.classList.add('sort');
        sortBtnCurrent.classList.add('sortCurrent');
        sortBtnCurrent.value = 'current';

        let sortBtnAfter = document.createElement('input');
        sortBtnAfter.setAttribute('type','button');
        sortBtnAfter.classList.add('sort');
        sortBtnAfter.classList.add('sortAfter');
        sortBtnAfter.value = 'future';

        const sortBtnAll = document.createElement('input');
        sortBtnAll.setAttribute('type','button');
        sortBtnAll.classList.add('sort');
        sortBtnAll.classList.add('sortAll');
        sortBtnAll.value = 'all';

        const todoList = document.createElement('div');
        todoList.classList.add('todoList');

        const titleName = document.createElement('h1');
        titleName.classList.add('title');
        titleName.innerHTML = this.title;


        const todoControllers = document.createElement('div');
        todoControllers.classList.add('controllers');

        const input = document.createElement('input');
        input.setAttribute('type','text');
        input.setAttribute('maxlength', '110');
        input.classList.add('getTodo');
        input.setAttribute('placeholder','What should you do?');

        const button = document.createElement('input');
        button.setAttribute('type','button');
        button.classList.add('setTodo');
        button.setAttribute('value','ADD');

        const datePick = document.createElement('input');
        datePick.classList.add('date');
        datePick.setAttribute('disabled','');
        datePick.setAttribute('type','text');
        datePick.setAttribute('value',time);


        footer.appendChild(titleName);

        todoControllers.appendChild(input);
        todoControllers.appendChild(selectCalendar);
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

            console.log(currentTodos);
            todo.forEach(element =>  element.classList.add('hide'));
            currentTodos.forEach(element => element.classList.toggle('hide'));

            return;
       }

        if (type === 'sortAll'){

            todo.forEach( element => (element.classList[1] === 'hide') &&
                                     (element.classList.toggle('hide')));
        }
    }

    showNewTodo(value = false){

    const mainList = document.querySelector('.todoList');
    const oldTodo = document.querySelectorAll('p');
    const NOW = Date.now();

    let todoList = null;

    (oldTodo.length) && (oldTodo.forEach(element => element.remove()));

    for (let i = 0; i < value.length; i++){

        if(value[i].save){

            todoList = document.createElement('p');
            todoList.setAttribute('draggable','true');

            this.arrayJSON = JSON.parse(localStorage.date);

            todoList.dataset.date = this.arrayJSON[i];

            let dateNow = JSON.parse(localStorage.date)[i].split('.').reverse();
            dateNow[1] = dateNow[1]-1;

            let todoDay = new Date(dateNow[0],dateNow[1],dateNow[2]).getTime();
            let today = new Date(NOW).toLocaleDateString();

            if (todoList.dataset.date === today){

                todoList.classList.add('todayDay');

           } else if (todoDay < NOW){

                todoList.classList.add('unactive');

           } else if (todoDay > NOW){

                todoList.classList.add('future');

           }

            todoList.dataset.unique = value[i].uniqueId;
            todoList.innerHTML = value[i].value;

            mainList.appendChild(todoList);

       }
   }

    localStorage.removeItem('newTime');
    localStorage.removeItem('newTodo');
   }

    showModal(jsonObject = 'click for add note'){


        const num = jsonObject.findIndex(element => element.uniqueId === this.dataset.unique);

        const getList = document.getElementById('todo');

        const modalBg = document.createElement('div');
        modalBg.classList.add('background-modal');
        modalBg.classList.add('animateOpen');

        const modal = document.createElement('div');
        modal.classList.add('modal-window');
        modal.classList.add('animateOpen');
        modal.dataset.modalNum = this.dataset.unique;


        const closeBtn = document.createElement('input');
        closeBtn.setAttribute('type','button');
        closeBtn.setAttribute('value','X');
        closeBtn.classList.add('close');

        const deleteBtn = document.createElement('input');
        deleteBtn.setAttribute('type','button');
        deleteBtn.setAttribute('value','Delete todo');
        deleteBtn.classList.add('delete');

        const noteZone = document.createElement('div');
        noteZone.classList.add('textArea');

        const currentTodo = document.createElement('p');
        currentTodo.classList.add('currentTodo');
        currentTodo.innerHTML = this.innerHTML;

        const additionalNotesTitle = document.createElement('p');
        additionalNotesTitle.classList.add('addNotes__title');
        additionalNotesTitle.innerHTML = 'additional notes';

        const edditableWrapper = document.createElement('div');
        edditableWrapper.classList.add('editWrapper');

        const additionalNotes = document.createElement('p');
        additionalNotes.classList.add('addNotes');
        additionalNotes.innerHTML = jsonObject[num].note;

        const weatherList = document.createElement('ul');
        weatherList.classList.add('weatherList');

        const showTodoDate = document.createElement('p');
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

        

        return document.querySelector('[data-modal-num]');

   }

    showWarning(ctx){

        const modal = document.createElement('div');
        modal.classList.add('warning');

        const question = document.createElement('p');
        question.classList.add('question');
        question.innerHTML = 'Save changes?';

        const save = document.createElement('input');
        save.setAttribute('type','button');
        save.classList.add('save');
        save.value = 'save';

        const cancel = document.createElement('input');
        cancel.setAttribute('type','button');
        cancel.classList.add('cancel');
        cancel.value = 'cancel';

        modal.appendChild(question);
        modal.appendChild(save);
        modal.appendChild(cancel);

        ctx.appendChild(modal);
   }

    buildCalendar(...date){

        let dateObject = date[0];
        let EmptyCount = 0;

        const monthName = dateObject.monthName[dateObject.currentMonth-1];

        const clearCalendar = document.querySelector('.calendar');

        if (clearCalendar) clearCalendar.remove();

        let calendarWrapper = document.querySelector('calendar') ?
        document.querySelector('calendar') : document.createElement('div');

        calendarWrapper.classList.add('calendar');

        const zeroMonth = (dateObject.currentMonth < 10) ? '0' : '';
        const zeroDay = (dateObject.currentDay < 10) ? '0' : '';

        calendarWrapper.dataset.current = `${zeroDay + dateObject.currentDay}.${zeroMonth + dateObject.currentMonth}.${dateObject.currentYear}`;


        const wrapperSpan = document.createElement('div');
        wrapperSpan.classList.add('calendarControlBtns');

        const spanPrew = document.createElement('input');
        spanPrew.setAttribute('type','button');
        spanPrew.dataset.move = 'prew';
        spanPrew.value = '<==';

        const spanNext = document.createElement('input');
        spanNext.setAttribute('type','button');
        spanNext.dataset.move = 'next';
        spanNext.value = '==>';

        const spanMonthPrew = document.createElement('input');
        spanMonthPrew.setAttribute('type','button');
        spanMonthPrew.dataset.move = 'prewMonth';
        spanMonthPrew.value = '<=';

        const spanMonthNext = document.createElement('input');
        spanMonthNext.setAttribute('type','button');
        spanMonthNext.dataset.move = 'nextMonth';
        spanMonthNext.value = '=>';

        const calendarName = document.createElement('h3');
        calendarName.classList.add('calendarDate');
        calendarName.innerHTML =  monthName  + ' ' + dateObject.currentYear;
    
        const ulCalendar = document.createElement('ul');
        ulCalendar.classList.add('calendarList');

        const calendarController = document.createElement('div');


        calendarController.classList.add('calendarController');

        const controllers = document.querySelector('.controllers');

        for(let i = 0; i < dateObject.dateWeek.length; i++){

            const dayWeek = document.createElement('li');
            dayWeek.dataset.week = dateObject.dateWeek[i];
            dayWeek.innerHTML = dateObject.dateWeek[i];
            ulCalendar.appendChild(dayWeek);
       }

        for(let i = 1, j = 1; j <= dateObject.totalDay; i++){
            

            if (!dateObject.weekDay && !EmptyCount){

                for (let i = 0; i < dateObject.dateWeek.length-1; i++){

                    const dempty = document.createElement('li');
                    dempty.classList.add('empty');
                    ulCalendar.appendChild(dempty);
               }

                EmptyCount++;
           }

            if (dateObject.weekDay <= i){

            const day = document.createElement('li');

            ((dateObject.currentDay === j) && (dateObject.todayYear === dateObject.currentYear) &&
                                           (dateObject.currentMonth === dateObject.todayMonth+1)) &&
                                                                    (day.classList.add('today'));

            day.dataset.day = j;
            day.innerHTML = j;

            ulCalendar.appendChild(day);
            j++;

           } else{

                const dempty = document.createElement('li');
                dempty.classList.add('empty');
                ulCalendar.appendChild(dempty);
           }
       }
    
        wrapperSpan.appendChild(spanPrew);
        wrapperSpan.appendChild(spanMonthPrew);
        wrapperSpan.appendChild(spanMonthNext);
        wrapperSpan.appendChild(spanNext);
        calendarController.appendChild(calendarName);
        calendarController.appendChild(wrapperSpan);
        calendarWrapper.appendChild(calendarController);
        calendarWrapper.appendChild(ulCalendar);
        controllers.appendChild(calendarWrapper);
    }

    createEditInput(){

        const addNotes = document.querySelector('.addNotes');
        const textArea = document.querySelector('.textArea');
        const edditableWrapper = document.querySelector('.editWrapper');

        const inputEdit = document.createElement('textarea');
        const buttonEdit = document.createElement('input');

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