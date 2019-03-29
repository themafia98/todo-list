class TodoControl extends Storage{

    constructor({controllerEnter,btn}){
    super();
    this.btnEnter = controllerEnter;
    this.btnAdd = btn;
    this.ar = [];
    }

    setLsitener(todoView){

        let clickEvent = (e) =>{
            
            if ((e.target.classList[0] === 'setTodo') && (this.btnEnter.value)) {
                
            let number;
            (!(localStorage.timersN)) && (localStorage.timersN = -1);
            (localStorage.timersN) && (localStorage.timersN = ++localStorage.timersN);
            number = (localStorage.timersN) ? parseInt(localStorage.timersN) : 0;

            localStorage.setItem('newTodo',this.btnEnter.value);
            let todo = new todoOne(number,localStorage.newTodo);
            (localStorage.ar) && (this.ar = JSON.parse(localStorage.ar));
            this.ar.push(todo);
            localStorage.ar = JSON.stringify(this.ar);
            
            !((localStorage.ar)) && (localStorage.list = JSON.stringify(this.ar));
            (localStorage.ar) && (localStorage.list = JSON.stringify(JSON.parse(localStorage.ar)));
            // this.store(todo);
            localStorage.setItem('timeAdd', new Date().toLocaleString());
                
            // (!(localStorage.newDate)) &&
            // (localStorage.setItem('newDate', JSON.stringify([e.target.previousSibling.value.slice(0,10).split('-').reverse().join().replace(/\,/g,'.')])));
            // localStorage.setItem('newTime', e.target.previousSibling.value.slice(11));
            // (localStorage.newDate) && (this.dateArray.push(localStorage.newDate));
            // (localStorage.newDate) && (localStorage.newDate = this.dateArray);
            todoView.showNewTodo(undefined,JSON.parse(localStorage.list),number);
                
            // todo.startTimer(todo.timer);
            this.btnEnter.value = '';
            }

            if (e.target.dataset.num) {
               let splits = JSON.parse(localStorage.list);
               let currentTodo = null;
                
               if (splits.some((item) => item.value === e.target.innerHTML)) {
                   
                let filter = splits.filter((v,i,a) => v.value === e.target.innerHTML);
                currentTodo = document.querySelectorAll('[data-num]');
                this.updateStorage(JSON.parse(localStorage.list),JSON.parse(localStorage.ar),filter[0].timer);
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