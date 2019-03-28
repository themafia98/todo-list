
(function(){

    let settingsTodo = {
        appID: document.getElementById('todo'),
        title:'Todo-list'
    }

    let todoView = new Todo(settingsTodo);
    todoView.build();


})();