class TodoControl extends Storage{

    constructor({controllerEnter,btn}){
    super();
    this.btnEnter = controllerEnter;
    this.btnAdd = btn;
    }

    setLsitener(todoView){

        let clickEvent = (e) =>{
            
            if ((e.target.classList[0] === 'setTodo') && (this.btnEnter.value)) {
            localStorage.setItem('newTodo',this.btnEnter.value);
            
            this.store(localStorage.newTodo,e.target.previousSibling);
            localStorage.setItem('newTIME', new Date().toLocaleString());
            console.log(this.btnEnter.value.length);
            todoView.showNewTodo(localStorage.list,localStorage.newTIME);
            this.btnEnter.value = '';
            }

            if (e.target.dataset.num) {
               let splits = localStorage.list.split(',');
               let currentTodo = null;
                debugger;
               if (splits.some((item) => item === e.target.innerHTML)) {
                   
                e.target.remove();
                currentTodo = document.querySelectorAll('[data-num]');
                this.updateStorage('list',currentTodo);
               }
            }
        };

        document.addEventListener('click',clickEvent,false);
        document.addEventListener('touchend',clickEvent,false);

        window.addEventListener('DOMContentLoaded',() =>{
            (localStorage.list) && (this.store(localStorage.list));
            (localStorage.list) && (todoView.showNewTodo(localStorage.list));
        },false);
    }
}