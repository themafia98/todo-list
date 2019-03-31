
class ListModal{

    constructor(num,string){
        this.number = num;
        this.todo = string;

        this.states = {
            main: true,
            modal: true
        };
    }
}

class Storage extends ListModal{
    constructor(){
        super();
        this.arrayList = [];
        this.lists = [];
        this.dateArray = [];
        this.buffer = {};
        this.timersN = -1;
        this.number = 0;
    }

    store(todo){

        (todo.value) && (this.arrayList.push(todo.value));
        localStorage.list = this.arrayList.join();
        (localStorage.newTodo) && (localStorage.removeItem('newTodo'));
    }

    updateStorage(list,num){
        
        let nums = parseInt(num);
        let newList = list.filter( (v) => { return v.timer != nums;});

        localStorage.list = JSON.stringify(newList);

        return true;
    }

    localeStorageUpdate(){

        
        (!(localStorage.timersN)) && (localStorage.timersN = -1);
        (localStorage.timersN) && (localStorage.timersN = ++localStorage.timersN);
        this.number  = (localStorage.timersN) ? parseInt(localStorage.timersN) : -1;

        localStorage.setItem('newTodo',this.btnEnter.value);
        
        let todo = new todoOne(this.number,localStorage.newTodo);

        (localStorage.list) && (this.lists = JSON.parse(localStorage.list));
        this.lists.push(todo);
        localStorage.list = JSON.stringify(this.lists);

        return this.number;
    }

    dataParser(target){
       
        (localStorage.date) && (this.buffer = JSON.parse(localStorage.date));
        let valueButton = target.previousSibling.value.slice(0,10).split('-').reverse()
                        .join().replace(/\,/g,'.');

        (!(localStorage.date)) && (localStorage.date = JSON.stringify([valueButton]));
        (localStorage.date) && (this.buffer.push(valueButton));
        (localStorage.date) && (localStorage.date = JSON.stringify(this.buffer));

    }


    
}

class todoOne extends ListModal {

    constructor(timerN,value){
        super();
        this.value = value;
        this.timer = timerN;
        this.save = false;
    }
}
