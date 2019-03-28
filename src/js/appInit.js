
(function(){

    function main() {

        let settingsTodo = {appID: document.getElementById('todo'),title:'Todo-list'};

        let storageData = new Storage();
        let todoView = new Todo(settingsTodo);
        todoView.build();

        let controllerSettings = {
            controllerEnter: document.querySelector('.getTodo'),
            btn: document.querySelector('.setTodo')
        }
        let controller = new TodoControl(controllerSettings);
        controller.setLsitener(todoView);
    }

    return todo = { init: main }

})();

todo.init();