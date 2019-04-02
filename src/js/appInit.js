
let todoApp = (function(){

    function main() {

        let settingsTodo = {appID: document.getElementById('todo'),title:'Todo-list'};

        let todoState = new ListModal();

        todoState.setState('main',true);

        let storageData = new Storage();
        let todoView = new Todo(settingsTodo);
        todoView.build();

        let controllerSettings = {
            controllerEnter: document.querySelector('.getTodo'),
            btn: document.querySelector('.setTodo')
        }
        let controller = new TodoControl(controllerSettings);
        controller.setLsitener(todoView,todoState);

    }



    return { init: main };
})();

todoApp.init();
