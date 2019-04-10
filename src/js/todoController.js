class TodoControl{

    constructor({controllerEnter,btn}){

    this.btnEnter = controllerEnter;
    this.btnAdd = btn;
    }

    setLsitener(todoView,todoState,load,datePicker,store){

        let parentDnD = document.getElementsByClassName('todoList')[0];

        let clickEvent = (e) =>{

            let target = e.target;
            let modalWindow = target.parentNode.parentNode;
            let modal = null;

            if (todoState.getState('main')){

                const todos = document.querySelectorAll('[data-unique]');
                let currentTodos = null;

                (target.classList[0] === 'selectCalendar') && (todoView.buildCalendar(datePicker));

                if (target.dataset.move){

                    if (target.dataset.move === 'prew'){

                        datePicker.parseCalendarData(-1,null,target.dataset.move);
                        todoView.buildCalendar(datePicker);
                    }

                    if (target.dataset.move === 'next'){
                        datePicker.parseCalendarData(+1,null,target.dataset.move);
                        todoView.buildCalendar(datePicker);
                    }

                    if (target.dataset.move === 'prewMonth'){

                        datePicker.parseCalendarData(null, -1,target.dataset.move);
                        todoView.buildCalendar(datePicker);

                    }

                    if (target.dataset.move === 'nextMonth'){

                        datePicker.parseCalendarData(null, +1,target.dataset.move);
                        todoView.buildCalendar(datePicker);

                    }
                }

                if (target.dataset.day){

                    let timerDeleteCalendar = null;
                    const days = document.querySelectorAll('[data-day]');
                    const dateInput = document.querySelector('.date');

                    let date = modalWindow.dataset.current.split('.');

                    date[0] = target.dataset.day;

                    days.forEach((element)=>{
                        (element.classList[0] === 'selectDay') &&
                        (element.classList.toggle('selectDay'));
                    });

                    target.classList.add('selectDay');
                    let zeroDay = (date[0] < 10) ? '0' : '';

                    date[0] = (zeroDay + date[0]).trim();
                    dateInput.value = date.reverse().join().replace(/\,/g,'-');
                    timerDeleteCalendar = setTimeout( () => modalWindow.remove() ,300);
                }

                (target.classList[1] === 'sortAfter') &&
                (currentTodos =  document.querySelectorAll('.future'));

                (target.classList[1] === 'sortBefore') &&
                (currentTodos =  document.querySelectorAll('.unactive'));

                (target.classList[1] === 'sortCurrent') &&
                (currentTodos =  document.querySelectorAll('.today'));

                (target.classList[0] === 'sort') &&
                (todoView.sortTodos(todos,target.classList[1],currentTodos));

                if ((target.classList[0] === 'setTodo') && (this.btnEnter.value)){

                    store.localeStorageUpdate(this.btnEnter.value);
                    store.dataParser(target);
                    todoView.showNewTodo(JSON.parse(localStorage.list));

                    this.btnEnter.value = '';
                }

                if(target.dataset.unique){

                    let jsonObject = null;

                    (localStorage.list) && (jsonObject = JSON.parse(localStorage.list));

                    modal = todoView.showModal.call(target,jsonObject);

                    todoView.spinnerShow(modal,load.image[0]);
                    todoState.getWeather(target,document.querySelector('.weatherList'),modal);

                    todoState.setState('main',false);
                    todoState.setState('modal',true);

                }
            }

            if (todoState.getState('modal')){

                let modal = document.querySelector('[data-modal-num]');
                let notes = document.querySelector('.addNotes');
                let timer = null;
                const parent = target.parentNode;

                const item = JSON.parse(localStorage.list);
                const index = item.findIndex(item => modal.dataset.modalNum === item.uniqueId);

                if (target.classList[0] === 'addNotes'){

                    todoView.createEditInput();
                    item[index].changeNote = true;
                    localStorage.list = JSON.stringify(item);
                }

                if(target.classList[0] === 'editButton'){


                    notes.innerHTML = target.previousSibling.value;
                    item[index].note = target.previousSibling.value;

                    localStorage.list = JSON.stringify(item);
                    notes.classList.toggle('visibility');
                    target.previousSibling.remove();
                    target.remove();

                }

                if (target.classList[0] === 'close' || target.classList[0] === 'background-modal'){

                    modal = modal.parentNode;

                    if (item[index].changeNote){

                        todoView.showWarning(modal);

                    } else{

                        todoState.setState('main',true);
                        todoState.setState('modal',false);

                        modal.classList.toggle('animateOpen');
                        modal.classList.add('animateHide');

                        timer = setTimeout(()=>{
                        modal.style.display = 'none';
                        modal.remove();
                        },400);
                    }

                }

                if (target.classList[0] === 'save'){


                    todoState.setState('main',true);
                    todoState.setState('modal',false);

                    target.parentNode.remove();

                    modal.classList.toggle('animateOpen');
                    modal.classList.add('animateHide');

                    item.forEach( item => (item.changeNote) && (item.changeNote = false));
                    localStorage.list = JSON.stringify(item);

                    timer = setTimeout(()=>{

                    modal.style.display = 'none';
                    modal.parentNode.remove();
                    modal.remove();
                    },400);

                } else  if (target.classList[0] === 'cancel') target.parentNode.remove();


                if(target.classList[0] === 'delete'){

                    const todoDelete = document.querySelector(`[data-unique="${parent.dataset.modalNum}"]`);
                    const numDelete =  todoDelete.dataset.unique;

                    const splits = JSON.parse(localStorage.list);
                    const date = JSON.parse(localStorage.date);

                    const counter =  splits.findIndex(element =>  element.uniqueId === numDelete);

                    date.splice(counter,1);
                    localStorage.date = JSON.stringify(date);

                    const filter = splits.filter(v => (v.uniqueId === numDelete));

                    store.updateStorage(JSON.parse(localStorage.list),filter[0].uniqueId);
                    todoDelete.remove();

                    /* Switch state */
                    todoState.setState('main',true);
                    todoState.setState('modal',false);

                    modalWindow.remove();
                }

                    const todos = document.querySelectorAll('[data-date]');
                    todos.forEach( (element,i) => element.dataset.num = i);
                }

        };

        /* -----------Modernizr----------- */
        console.log('touchevents detected:' + Modernizr.touchevents);
        Modernizr.touchevents && document.addEventListener('touchend',clickEvent,false);
        !Modernizr.touchevents && document.addEventListener('click',clickEvent,false);

        document.addEventListener('keydown', (e) =>{(e.target.classList[0] === 'date') && 
                                                            (e.preventDefault())},false);


        /* -----------DnD----------- */
        let drag = null;

        document.addEventListener('dragstart', (e) =>{
            drag = e.target;
        });


        parentDnD.addEventListener('dragover', function(e){

            e.preventDefault();

            let target = e.target;
            let bounding = target.getBoundingClientRect();
            let offset = bounding.y + (bounding.height/2);

            if (target.classList[0] != 'todoList'){

                if ( e.clientY - offset > 0 ){
                    target.style['border-bottom'] = 'solid 4px red';
                    target.style['border-top'] = '';
                }
            }

        });

        parentDnD.addEventListener('dragleave', function(e){

            e.preventDefault();
            e.target.style['border-bottom'] = '';
            e.target.style['border-top'] = '';
        });

        parentDnD.addEventListener('drop', function(e){

            let target = e.target;

            let swapeDate = JSON.parse(localStorage.date);
            let swapeList = JSON.parse(localStorage.list);

            if ( target.style['border-bottom'] !== '' ){
                target.style['border-bottom'] = '';

                let dragID = drag.dataset.unique;
                let targetID = target.dataset.unique;

                let targetNum = swapeList.findIndex(element =>  element.uniqueId === targetID);
                let dragNum =  swapeList.findIndex(element =>  element.uniqueId === dragID);

                if (dragNum < targetNum){

                    swapeDate.splice(targetNum,0,swapeDate.splice(targetNum,1,swapeDate[dragNum])[0]);
                    swapeDate.splice(dragNum,1);
                    swapeList.splice(targetNum,0,swapeList.splice(targetNum,1,swapeList[dragNum])[0]);
                    swapeList.splice(dragNum,1);

                    this.insertBefore(drag, target.nextSibling);

                } else{

                    swapeDate.splice(targetNum,0,swapeDate.splice(targetNum,1,swapeDate[dragNum])[0]);
                    swapeDate.splice(dragNum+1,1);
                    swapeList.splice(targetNum,0,swapeList.splice(targetNum,1,swapeList[dragNum])[0]);
                    swapeList.splice(dragNum+1,1);
                    this.insertBefore(drag, target.nextSibling);
                }

                let todos = document.querySelectorAll('[data-date]');
                todos.forEach( (element,i) => element.dataset.num = i);

                localStorage.date = JSON.stringify(swapeDate);
                localStorage.list = JSON.stringify(swapeList);

            } else target.style['border-top'] = '';

        });

        /* ----on window load---- */
        window.addEventListener('DOMContentLoaded',() =>{

            if (!localStorage.list) return;

                let item = JSON.parse(localStorage.list);
                item.forEach( item => (item.changeNote) && (item.changeNote = false));
                localStorage.list = JSON.stringify(item);
                todoView.showNewTodo(item);

        },false);
    }
}