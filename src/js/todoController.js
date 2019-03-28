class todoControl extends Storage{

    constructor({btn,controllerEnter}){
    super();
    this.btnEnter = controllerEnter;
    this.btnAdd = btn;
    }

    setLsitener(){
        this.btnAdd.addEventListener('click',() =>{
            
            (this.btnAdd) &&
            localStorage.setItem('newTodo',this.btnEnter.value);
            this.store(localStorage.newTodo);
        })
    }
}