
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
        this.TIMES = [];
    }

    store(stringTodo,...spread){

        let date = null;
        let times = null;

        (stringTodo) && (this.arrayList.push(stringTodo));
        localStorage.list = this.arrayList.join();
        (localStorage.newTodo) && (localStorage.removeItem('newTodo'));
    }

    resetStore(){
        localStorage.clear();
    }

    updateStorage(key, current){
        this.arrayList = [];
        current.forEach(element => {
            this.arrayList.push(element.innerHTML);
        });
        localStorage[key] = this.arrayList.join();
    }
}