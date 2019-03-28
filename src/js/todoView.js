
class View {

    constructor({appID,title}){
        this.ID = appID;
        this.title = title;
    }
}

class Todo extends View {

    constructor(settingsTodo){
        super(settingsTodo);
    }

    build(){
        let wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');

        let footer = document.createElement('div');
        footer.classList.add('footer');

        let section = document.createElement('div');
        section.classList.add('section');

        let titleName = document.createElement('h1');
        titleName.classList.add('title');
        titleName.innerHTML = this.title;

        let todoControllers = document.createElement('div');
        todoControllers.classList.add('controllers');

        let input = document.createElement('input');
        input.setAttribute('type','text');
        input.classList.add('getTodo');
        input.setAttribute('placeholder','What should you do today?');

        let button = document.createElement('input');
        button.setAttribute('type','button');
        button.classList.add('setTodo');
        button.setAttribute('value','ADD');

        footer.appendChild(titleName);
        todoControllers.appendChild(input);
        todoControllers.appendChild(button);

        wrapper.appendChild(footer);
        wrapper.appendChild(todoControllers);
        wrapper.appendChild(section);
        this.ID.appendChild(wrapper);


    }

}