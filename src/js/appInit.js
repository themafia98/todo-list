
(function(){

    let settingsTodo = {
        appID: document.getElementById('todo'),
        title:'Todo-list'
    }

    let todoView = new Todo(settingsTodo);
    todoView.build();

    let settingsController = {
        controllerEnter: document.querySelector('.getTodo'),
        btn: document.querySelector('.setTodo')
    }

    let storageData = new Storage();
    let controller = new todoControl(settingsController);
    controller.setLsitener();

})();