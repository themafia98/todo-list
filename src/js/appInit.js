
(function(){

    function building(){
        let settingsTodo = {
            appID: document.getElementById('todo'),
            title:'Todo-list'
        }

        let todoView = new Todo(settingsTodo);
        todoView.build();
    }

    function controllers() {
        let settingsController = {
            controllerEnter: document.querySelector('.getTodo'),
            btn: document.querySelector('.setTodo')
        }

        let controller = new TodoControl(settingsController);
        controller.setLsitener(todoView);
    }

    function main() {
        let storageData = new Storage();

        building();
        controllers();
    }

    return todo = { init: main }

})();

todo.init();