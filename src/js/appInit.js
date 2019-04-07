
let todoApp = (function(){

    function main() {

        let settingsTodo = {appID: document.getElementById('todo'),title:'Todo-list'};
        let load = new Loader();
        load.loading('image','../img/spinner.gif', 'smallSpinner');
        let todoState = new ListModal();
        todoState.getCoords();

        todoState.setState('main',true);

        let todoView = new Todo(settingsTodo);
        todoView.build();

        let datePicker = new Calendar();
        datePicker.parseCalendarData();
        todoView.buildCalendar(datePicker);

        let controllerSettings = {
            controllerEnter: document.querySelector('.getTodo'),
            btn: document.querySelector('.setTodo')
        }
        let controller = new TodoControl(controllerSettings);
        controller.setLsitener(todoView,todoState,load,datePicker);

    }

    return { init: main };
})();



todoApp.init();


