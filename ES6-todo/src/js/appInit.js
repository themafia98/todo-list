let todoApp = (function(){

    function main(){

        let settingsTodo ={appID: document.getElementById('todo'),title:'Todo-list'};
        let load = new Loader();
        let time = new Date().toLocaleDateString().split('.').reverse().join().replace(/\,/g,'-');
        load.loading('image','../img/spinner.gif', 'smallSpinner');
        let todoState = new ListModal();
        let store = new Storage();
        todoState.getCoords();

        todoState.setState('main',true);

        let todoView = new Todo(settingsTodo);
        todoView.build(time);
        let datePicker = new Calendar();
        datePicker.parseCalendarData();

        let controllerSettings = {
            controllerEnter: document.querySelector('.getTodo'),
            btn: document.querySelector('.setTodo')
       }
        let controller = new TodoControl(controllerSettings);
        controller.setLsitener(todoView,todoState,load,datePicker,store);

   }

    return{ init: main };
})();



todoApp.init();


