
class View {

    constructor(myApp){
        this.app = myApp;
    }
}

class Todo extends View {

    constructor(){
        super();
    }

    showList(){
        document.write('To-do list start');
    }
}