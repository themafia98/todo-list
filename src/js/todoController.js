class TodoControl extends Storage{

    constructor({controllerEnter,btn}){
    super();
    this.btnEnter = controllerEnter;
    this.btnAdd = btn;
    }

    setLsitener(todoView){

        let clickEvent = (e) =>{

            if ((e.target.classList[0] === 'setTodo') && (this.btnEnter.value)) {
                debugger;
                
            this.number = this.localeStorageUpdate();
            // (!(localStorage.newDate)) &&
            // (localStorage.setItem('newDate', JSON.stringify([e.target.previousSibling.value.slice(0,10).split('-').reverse().join().replace(/\,/g,'.')])));
            // localStorage.setItem('newTime', e.target.previousSibling.value.slice(11));
            // (localStorage.newDate) && (this.dateArray.push(localStorage.newDate));
            // (localStorage.newDate) && (localStorage.newDate = this.dateArray);
                debugger;
            todoView.showNewTodo(JSON.parse(localStorage.list));
                
            // todo.startTimer(todo.timer);
            this.btnEnter.value = '';
            }

            if (e.target.dataset.num) {
                
                let splits = JSON.parse(localStorage.list);

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

        window.addEventListener('DOMContentLoaded',() =>{

            
            (localStorage.list) && (todoView.showNewTodo(JSON.parse(localStorage.list)));

        },false);
    }
}