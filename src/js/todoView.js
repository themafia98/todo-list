
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
        console.log('list');
    }
}