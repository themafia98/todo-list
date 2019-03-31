class TodoControl extends Storage{

    constructor({controllerEnter,btn}){
    super();
    this.btnEnter = controllerEnter;
    this.btnAdd = btn;
    }

    setLsitener(todoView){

        let parentDnD = document.getElementsByClassName('todoList')[0];

        let clickEvent = (e) =>{


            if ((e.target.classList[0] === 'setTodo') && (this.btnEnter.value)) {

                this.buffer = [];
                this.number = this.localeStorageUpdate();
                this.dataParser(e.target);
                todoView.showNewTodo(JSON.parse(localStorage.list));
                this.btnEnter.value = '';
            }

            if (e.target.dataset.num) {

                let splits = JSON.parse(localStorage.list);
                let date = JSON.parse(localStorage.date);
                let count = () => {
                    splits.forEach((element,i) => {
                    if (element.timer === parseInt(e.target.dataset.num)) return i;
                });
                }

                date.splice(count(),1);
                localStorage.date = JSON.stringify(date);
    
                if (splits.some((item) => item.value === e.target.innerHTML)) {

                    let filter = splits.filter((v) => v.value === e.target.innerHTML);
                    this.updateStorage(JSON.parse(localStorage.list),filter[0].timer);
                    e.target.remove();
                    localStorage.timersN = --localStorage.timersN;
                }
            }
        };

        document.addEventListener('click',clickEvent,false);
        document.addEventListener('touchend',clickEvent,false);

        let drag = null;

        document.addEventListener('dragstart', (e) => {
            drag = e.target;
        });


        parentDnD.addEventListener('dragover', function(e) {

            e.preventDefault();
            let target = e.target;
            let bounding = target.getBoundingClientRect();
            let offset = bounding.y + (bounding.height/2);

            if (target.classList[0] != 'todoList'){
                if ( e.clientY - offset > 0 ) {
                    target.style['border-bottom'] = 'solid 4px blue';
                    target.style['border-top'] = '';
                } else {
                    target.style['border-top'] = 'solid 4px blue';
                    target.style['border-bottom'] = '';
                }
        }

        });

        parentDnD.addEventListener('dragleave', function(e) {
            e.preventDefault();
            console.log('dragleave...');
        });

        parentDnD.addEventListener('dragleave', function(e) {
            e.target.style['border-bottom'] = '';
            e.target.style['border-top'] = '';
        });

        parentDnD.addEventListener('drop', function(e) {
            let target = e.target;

            if ( target.style['border-bottom'] !== '' ) {
                target.style['border-bottom'] = '';
                this.insertBefore(drag, target.nextSibling);
            } else {
                target.style['border-top'] = '';
                this.insertBefore(drag, target);
            }
    
            // this.insertBefore(target,target.previousSibling);
        });

        window.addEventListener('DOMContentLoaded',() =>{

            (localStorage.list) && (todoView.showNewTodo(JSON.parse(localStorage.list)));
        },false);
    }
}