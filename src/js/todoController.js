class TodoControl extends Storage{

    constructor({controllerEnter,btn}){
    super();
    this.btnEnter = controllerEnter;
    this.btnAdd = btn;
    }

    setLsitener(todoView,todoState,load){

        let parentDnD = document.getElementsByClassName('todoList')[0];

        let clickEvent = (e) =>{

            let target = e.target;
            let modalWindow = target.parentNode.parentNode;
            let modal = null;


            if (todoState.getState('main')){

                if ((target.classList[0] === 'setTodo') && (this.btnEnter.value)) {

                    this.number = this.localeStorageUpdate();
                    this.dataParser(target);
                    todoView.showNewTodo(JSON.parse(localStorage.list));
                    this.btnEnter.value = '';
                }

                if(target.dataset.num){

                    todoView.showModal.call(target);
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

                    let notes = document.querySelector('.addNotes');
                    notes.innerHTML = target.previousSibling.value;
                    notes.classList.toggle('visibility');
                    target.previousSibling.remove();
                    target.remove();

                }

                if (target.classList[0] === 'close' || target.classList[0] === 'background-modal'){
                    todoState.setState('main',true);
                    todoState.setState('modal',false);
                }
                ((target.classList[0] === 'close')  && (modalWindow.remove()));
                (target.classList[0] === 'background-modal') && (target.remove());

                if(target.classList[0] === 'delete'){

                    let parent = target.parentNode;
                    let todoDelete = document.querySelector(`[data-num="${parent.dataset.modalNum}"]`);
                    let numDelete =  parseInt(todoDelete.dataset.num);

                    let splits = JSON.parse(localStorage.list);
                    let date = JSON.parse(localStorage.date);

                    let counter =  splits.find(element =>  element.timer === numDelete );

                    date.splice(counter.timer,1);
                    localStorage.date = JSON.stringify(date);

                    if (splits.some(item => item.timer === numDelete)) {

                        let filter = splits.filter(v => (v.timer === numDelete) && (v.value === todoDelete.innerHTML));


                        this.updateStorage(JSON.parse(localStorage.list),filter[0].timer);
                        todoDelete.remove();
                        todoState.setState('main',true);
                        todoState.setState('modal',false);
                        modalWindow.remove();
                        localStorage.timersN = --localStorage.timersN;
                }

                    let todos = document.querySelectorAll('[data-date]');

                    todos.forEach(element => element.dataset.num = i);
                }

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

                let dragNum = parseInt(drag.dataset.num);
                let targetNum = parseInt(target.dataset.num);


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
                todos.forEach(element => element.dataset.num = i);

                localStorage.date = JSON.stringify(swapeDate);
                localStorage.list = JSON.stringify(swapeList);

            } else target.style['border-top'] = '';

        });

        window.addEventListener('DOMContentLoaded',() =>{

            (localStorage.list) && (todoView.showNewTodo(JSON.parse(localStorage.list)));

        },false);
    }
}