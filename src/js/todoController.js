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
            this.buffer = [];
            this.number = this.localeStorageUpdate();
            let len = this.lists.length-1;

            this.dataParser(e.target);
            todoView.showNewTodo(JSON.parse(localStorage.list));
            debugger;
            this.lists[len].startTimer(this.lists[len].timers);
            this.btnEnter.value = '';
            }

            if (e.target.dataset.num) {
                    
                let splits = JSON.parse(localStorage.list);
                let date = JSON.parse(localStorage.date);

                let count = () => {
                    splits.forEach( (element,i) => {
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

        window.addEventListener('DOMContentLoaded',() =>{

            
            (localStorage.list) && (todoView.showNewTodo(JSON.parse(localStorage.list)));

        },false);
    }
}