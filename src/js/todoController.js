class TodoControl extends Storage{

    constructor({controllerEnter,btn}){
    super();
    this.btnEnter = controllerEnter;
    this.btnAdd = btn;
    }

    setLsitener(todoView,todoState,load,datePicker){

        let parentDnD = document.getElementsByClassName('todoList')[0];

        let clickEvent = (e) =>{

            let target = e.target;
            let modalWindow = target.parentNode.parentNode;
            let modal = null;
            

            if (todoState.getState('main')){

                let todos = document.querySelectorAll('[data-unique]');
                let currentTodos = null;

                if (target.dataset.move){

                   if (target.dataset.move === 'prew'){

                        datePicker.parseCalendarData(-1);
                        todoView.buildCalendar(datePicker);
                    }
                // } else
                //     {
                //     (target.dataset.move === 'next') && (console.log('next'));
                //     }

                }

                (target.classList[1] === 'sortAfter') &&
                (currentTodos =  document.querySelectorAll('.future'));

                (target.classList[1] === 'sortBefore') &&
                (currentTodos =  document.querySelectorAll('.unactive'));

                (target.classList[1] === 'sortCurrent') &&
                (currentTodos =  document.querySelectorAll('.today'));

                (target.classList[0] === 'sort') &&
                (todoView.sortTodos(todos,target.classList[1],currentTodos));

                if ((target.classList[0] === 'setTodo') && (this.btnEnter.value)) {
                    
                    this.buffer = [];
                    this.localeStorageUpdate();
                    this.dataParser(target);
                    todoView.showNewTodo(JSON.parse(localStorage.list));
                    this.btnEnter.value = '';
                }

                if(target.dataset.unique){

                    let jsonObject = null;
                    (localStorage.list) && (jsonObject = JSON.parse(localStorage.list));
                    todoView.showModal.call(target,jsonObject);
                    modal = document.querySelector('[data-modal-num]');
                    todoView.spinnerShow(modal,load.image[0]);
                    let weatherList = document.querySelector('.weatherList');

                    todoState.getWeather(target,weatherList,modal);

                    
                    todoState.setState('main',false);
                    todoState.setState('modal',true);

                }
            }

            if (todoState.getState('modal')){
                

                (target.classList[0] === 'addNotes') && (todoView.createEditInput(target));
                
                if(target.classList[0] === 'editButton'){
                    
                    let modal = document.querySelector('[data-modal-num]');
                    let notes = document.querySelector('.addNotes');
                    let item =  JSON.parse(localStorage.list);
                    let index = item.findIndex(item => modal.dataset.modalNum === item.uniqueId);
                    notes.innerHTML = target.previousSibling.value;
                    item[index].note = target.previousSibling.value;
                    localStorage.list = JSON.stringify(item);
                    notes.classList.toggle('visibility');
                    target.previousSibling.remove();
                    target.remove();

                }

                if (target.classList[0] === 'close' || target.classList[0] === 'background-modal'){
                    todoState.setState('main',true);
                    todoState.setState('modal',false);
                }

                if (target.classList[0] === 'close' || target.classList[0] === 'background-modal') {
                    

                    modal = document.querySelector('[data-modal-num]').parentNode;
                    modal.classList.toggle('animateOpen');

                    modal.classList.add('animateHide');
                    let timer = setTimeout(()=>{
                        modal.style.display = 'none';
                        modal.remove();
                    },400);
                }


                if(target.classList[0] === 'delete'){
                    
                    
                    let parent = target.parentNode;
                    let todoDelete = document.querySelector(`[data-unique="${parent.dataset.modalNum}"]`);
                    let numDelete =  todoDelete.dataset.unique;

                    let splits = JSON.parse(localStorage.list);
                    let date = JSON.parse(localStorage.date);

                    let counter =  splits.findIndex(element =>  element.uniqueId === numDelete);

                    date.splice(counter,1);
                    localStorage.date = JSON.stringify(date);

                        let filter = splits.filter(v => (v.uniqueId === numDelete));

                        this.updateStorage(JSON.parse(localStorage.list),filter[0].uniqueId);
                        todoDelete.remove();
                        todoState.setState('main',true);
                        todoState.setState('modal',false);
                        modalWindow.remove();
                }

                    let todos = document.querySelectorAll('[data-date]');
                    
                    todos.forEach( (element,i) => element.dataset.num = i);
                }

        };

        document.addEventListener('click',clickEvent,false);
        document.addEventListener('touchend',clickEvent,false);

        let drag = null;

        document.addEventListener('dragstart', (e) => {
            drag = e.target;
        });


        parentDnD.addEventListener('dragover', function(e) {

            e.preventDefault();
            let target = e.target;
            let bounding = target.getBoundingClientRect();
            let offset = bounding.y + (bounding.height/2);

            if (target.classList[0] != 'todoList'){

                if ( e.clientY - offset > 0 ) {
                    target.style['border-bottom'] = 'solid 4px red';
                    target.style['border-top'] = '';
                }
            }

        });

        parentDnD.addEventListener('dragleave', function(e) {
            e.preventDefault();
            e.target.style['border-bottom'] = '';
            e.target.style['border-top'] = '';
        });

        parentDnD.addEventListener('drop', function(e) {
            let target = e.target;

            let swapeDate = JSON.parse(localStorage.date);
            let swapeList = JSON.parse(localStorage.list);

            if ( target.style['border-bottom'] !== '' ) {
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

                } else {

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

        window.addEventListener('DOMContentLoaded',() =>{

            (localStorage.list) && (todoView.showNewTodo(JSON.parse(localStorage.list)));

        },false);
    }
}