class TodoControl extends Storage{

    constructor({controllerEnter,btn}){
    super();
    this.btnEnter = controllerEnter;
    this.btnAdd = btn;
    }

    setLsitener(todoView){

        let parentDnD = document.getElementsByClassName('todoList')[0];

        let clickEvent = (e) =>{


            if ((e.target.classList[0] === 'setTodo') && (this.btnEnter.value)) {

                this.buffer = [];
                this.number = this.localeStorageUpdate();
                this.dataParser(e.target);
                todoView.showNewTodo(JSON.parse(localStorage.list));
                this.btnEnter.value = '';
            }

            if (e.target.dataset.num) {

                let splits = JSON.parse(localStorage.list);
                let date = JSON.parse(localStorage.date);
                let count = () => {
                    splits.forEach((element,i) => {
                    if (element.timer === parseInt(e.target.dataset.num)) return i;
                });
                }

                date.splice(count(),1);
                localStorage.date = JSON.stringify(date);
    
                if (splits.some((item) => item.value === e.target.innerHTML)) {

                    let filter = splits.filter((v) => v.value === e.target.innerHTML);
                    this.updateStorage(JSON.parse(localStorage.list),filter[0].timer);
                    e.target.remove();
                    localStorage.timersN = --localStorage.timersN;
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
                } else {
                    // target.style['border-top'] = 'solid 4px red';
                    // target.style['border-bottom'] = '';
                }
        }

        });

        parentDnD.addEventListener('dragleave', function(e) {
            e.preventDefault();
            console.log('dragleave...');
        });

        parentDnD.addEventListener('dragleave', function(e) {
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

                let swapDate1 = swapeDate.splice(targetNum,1,swapeDate[dragNum])[0];
                let swapDate2 = swapeDate[dragNum];
                swapeDate.splice(targetNum,0,swapDate1);
                swapeDate.splice(dragNum,1);
                let swapList1 = swapeList.splice(targetNum,1,swapeList[dragNum])[0];
                let swapList2 = swapeList[dragNum];
                swapeList.splice(targetNum,0,swapList1);
                swapeList.splice(dragNum,1);

                this.insertBefore(drag, target.nextSibling);
                } else {

                let swapDate1 = swapeDate.splice(targetNum,1,swapeDate[dragNum])[0];
                let swapDate2 = swapeDate[dragNum];
                swapeDate.splice(targetNum,0,swapDate1);
                swapeDate.splice(dragNum+1,1);
                let swapList1 = swapeList.splice(targetNum,1,swapeList[dragNum])[0];
                let swapList2 = swapeList[dragNum];
                swapeList.splice(targetNum,0,swapList1);
                swapeList.splice(dragNum+1,1);
                this.insertBefore(drag, target.nextSibling);
                }



                let todos = document.querySelectorAll('[data-date]');
                for (let i = 0; i < todos.length; i++){

                     (todos[i].dataset.num) && (todos[i].dataset.num = i);
                 }

                localStorage.date = JSON.stringify(swapeDate);
                localStorage.list = JSON.stringify(swapeList);

            } else {
                target.style['border-top'] = '';

                debugger;

                // let dragNum = parseInt(drag.dataset.num);
                // let targetNum = parseInt(target.dataset.num);

                // let swapDate1 = swapeDate.splice(dragNum,1,swapeDate[targetNum-1])[0];
                // swapeDate.splice(targetNum-1,1,swapDate1);
 
                // let swapList1 = swapeList.splice(dragNum,1,swapeList[targetNum-1])[0];
                // swapeList.splice(targetNum-1,1,swapList1)[0];


                // this.insertBefore(drag, target);

                // let todos = document.querySelectorAll('[data-num]');
                // // for (let i = 0; i < todos.length; i++){

                // //     (todos[i].dataset.num) && (todos[i].dataset.num = i);
                // // }

                // localStorage.date = JSON.stringify(swapeDate);
                // localStorage.list = JSON.stringify(swapeList);


            }
    
            // this.insertBefore(target,target.previousSibling);
        });

        window.addEventListener('DOMContentLoaded',() =>{

            (localStorage.list) && (todoView.showNewTodo(JSON.parse(localStorage.list)));
        },false);
    }
}