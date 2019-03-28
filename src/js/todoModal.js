
class ListModal{

    constructor(num,string){
        this.number = num;
        this.todo = string;
    }
}

class Storage extends ListModal{
    constructor(){
        super();
        this.arrayList = [];
    }

    store(stringTodo){
        this.arrayList.push(stringTodo);
        localStorage.list = this.arrayList.join();
        debugger;
        (localStorage.newTodo) && (localStorage.removeItem('newTodo'));
    }
}
console.log('list');