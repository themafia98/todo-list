class TodoControl extends Storage{

    constructor({btn,controllerEnter}){
    super();
    this.btnEnter = controllerEnter;
    this.btnAdd = btn;
    }

    setLsitener(todoView){
        document.addEventListener('click',(e) =>{
            if (e.target.classList[0] === 'setTodo') {
            localStorage.setItem('newTodo',this.btnEnter.value);
            this.store(localStorage.newTodo);
            todoView.showNewTodo(localStorage.list);
            }

            if (e.target.dataset.num) {
               let splits = localStorage.list.split(',');
               let currentTodo = null;

               if (splits.some((item) => item === e.target.innerHTML)) {
                   debugger;
                e.target.remove();
                currentTodo = document.querySelectorAll('[data-num]');
                this.updateStorage('list',currentTodo);
               }
            }

        },false);
        window.addEventListener('storage',(v) => {
            debugger;
            (v.key === 'list') && (showNewTodo(todoView.newValue));
        },false);

        window.addEventListener('DOMContentLoaded',() =>{
            (localStorage.list) && (this.store(localStorage.list));
            (localStorage.list) && (todoView.showNewTodo(localStorage.list));
        },false);
    }
}