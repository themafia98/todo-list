class TodoControl extends Storage{

    constructor({controllerEnter,btn}){
    super();
    this.btnEnter = controllerEnter;
    this.btnAdd = btn;
    }

    setLsitener(todoView){

        document.addEventListener('click',(e) =>{
            
            if ((e.target.classList[0] === 'setTodo') && (this.btnEnter.value)) {
            localStorage.setItem('newTodo',this.btnEnter.value);
            this.store(localStorage.newTodo);
            console.log(this.btnEnter.value.length);
            todoView.showNewTodo(localStorage.list);
            this.btnEnter.value = '';
            }

            if (e.target.dataset.num) {
               let splits = localStorage.list.split(',');
               let currentTodo = null;

               if (splits.some((item) => item === e.target.innerHTML)) {
                   
                e.target.remove();
                currentTodo = document.querySelectorAll('[data-num]');
                this.updateStorage('list',currentTodo);
               }
            }

        },false);
        window.addEventListener('storage',(v) => {
            
            (v.key === 'list') && (showNewTodo(todoView.newValue));
        },false);

        window.addEventListener('DOMContentLoaded',() =>{
            (localStorage.list) && (this.store(localStorage.list));
            (localStorage.list) && (todoView.showNewTodo(localStorage.list));
        },false);
    }
}