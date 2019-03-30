
class ListModal{

    constructor(num,string){
        this.number = num;
        this.todo = string;
    }
}

class Storage extends ListModal{
    constructor(){
        super();
        this.todoStorage = [];
        this.arrayList = [];
        this.lists = [];
        this.timersN = -1;
        this.number = 0;
    }

    store(todo){

        (todo.value) && (this.arrayList.push(todo.value));
        localStorage.list = this.arrayList.join();
        (localStorage.newTodo) && (localStorage.removeItem('newTodo'));
    }

    updateStorage(list,num){
        
        let nums = parseInt(num);
        let newList = list.filter( (v) => { return v.timer != nums;});

        localStorage.list = JSON.stringify(newList);

        return true;
    }

    localeStorageUpdate(){

        
        (!(localStorage.timersN)) && (localStorage.timersN = -1);
        (localStorage.timersN) && (localStorage.timersN = ++localStorage.timersN);
        this.number  = (localStorage.timersN) ? parseInt(localStorage.timersN) : -1;

        localStorage.setItem('newTodo',this.btnEnter.value);
        let todo = new todoOne(this.number,localStorage.newTodo);

        (localStorage.list) && (this.lists = JSON.parse(localStorage.list));
        this.lists.push(todo);
        localStorage.list = JSON.stringify(this.lists);

        localStorage.setItem('timeAdd', new Date().toLocaleString());

        return this.number;
    }


    
}



class todoOne {

    constructor(timerN,value){
        this.value = value;
        this.timer = timerN;

        this.timers = {
            ac: null,
            today: null,
            todaySec: null,
            todayMins: null,
            todayHours: null
        }
    }

    startTimer(num) {

        let _that = this;
        
        let display = document.createElement('span');
        display.classList.add('timer');
        display.dataset.timer = num;
        let here = document.querySelector('.todoList');
        here.appendChild(display);


        let timeGo = setTimeout(function tick() {
            if(num >= 1) {};
            // let minutes = parseInt(timer / 60, 10)
            // let seconds = timer;
            let ab = Date.now();
            let disp = document.querySelector(`[data-timer = "${num}"]`);

            _that.this.timers.ac = new Date(localStorage.newDate.split('.').reverse().join()
                                            .replace(/\./g,',')).getTime();

     
            _that.this.timers.today = Math.floor((_that.this.timers.ac - ab)/1000.0); // разница между текущей датой и др и переводим в секунды
            _that.this.timers.todaySec =_that.today % 60;  // Секунды
            _that.this.timers.today = Math.floor(_that.this.timers.today/60); // перевод в минуты
            _that.this.timers.todayMins = _that.this.timers.today % 60;  // Минуты
            _that.this.timers.today=Math.floor(_that.this.timers.today/60); // перевод в часы
            _that.this.timers.todayHours = _that.this.timers.today % 24; // Часы
            _that.this.timers.today = Math.floor(_that.this.timers.today/24); //  перевод в дни

    
            disp.innerHTML = `${_that.this.timers.today} days ${_that.this.timers.todayHours} h 
                            ${ _that.this.timers.todayMins} m ${ _that.todaySec} s`;

            // if (--timer < 0) {
            //     timer = duration;
            // }
            timeGo = setTimeout(tick,1000);
        }, 1000);

    }
}
