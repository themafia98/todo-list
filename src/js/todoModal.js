
class ListModal{

    constructor(num,string){
        this.number = num;
        this.todo = string;
    }
}

class Storage extends ListModal{
    constructor(){
        super();
        this.arrayList = [];
        this.lists = [];
        this.dateArray = [];
        this.buffer = {};
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
        debugger;
        debugger;
        localStorage.list = JSON.stringify(this.lists);
        debugger;
        localStorage.setItem('timeAdd', new Date().toLocaleString());

        return this.number;
    }

    dataParser(target){
       
        (localStorage.date) && (this.buffer = JSON.parse(localStorage.date));
        let valueButton = target.previousSibling.value.slice(0,10).split('-').reverse()
                        .join().replace(/\,/g,'.');

        localStorage.newDate = JSON.stringify(valueButton);


        (!(localStorage.date)) && (localStorage.date = JSON.stringify([valueButton]));
        (localStorage.date) && (this.buffer.push(valueButton));
        (localStorage.date) && (localStorage.date = JSON.stringify(this.buffer));

          // localStorage.setItem('newTime', e.target.previousSibling.value.slice(11));
    }


    
}



class todoOne {

    constructor(timerN,value){
        this.value = value;
        this.timer = timerN;
        this.save = false;

        this.timers = {
            ac: null,
            today: null,
            todaySec: null,
            todayMins: null,
            todayHours: null,
            thisNum: null
        }
    }

    startTimer() {

        let _that = this;
        
        let display = document.createElement('span');
        display.classList.add('timer');
        
        display.dataset.timer = parseInt(localStorage.timersN);
        _that.timers.thisNum = parseInt(localStorage.timersN);
        let here = document.querySelector('.todoList');
        here.appendChild(display);


        _that.timeGo = setTimeout(function tick() {
           
            if(parseInt(localStorage.timersN) >= 1) { };
            // let minutes = parseInt(timer / 60, 10)
            // let seconds = timer;
            let ab = Date.now();
            let disp = document.querySelector(`[data-timer = "${_that.timers.thisNum}"]`);
            
            let dateNow = JSON.parse(localStorage.date)[_that.timers.thisNum];
            _that.timers.ac = new Date(dateNow.split('.').reverse().join().replace(/\./g,',')).getTime();

            
            _that.timers.today = Math.floor((_that.timers.ac - ab)/1000.0); // разница между текущей датой и др и переводим в секунды
            _that.timers.todaySec =_that.timers.today % 60;  // Секунды
            _that.timers.today = Math.floor(_that.timers.today/60); // перевод в минуты
            _that.timers.todayMins = _that.timers.today % 60;  // Минуты
            _that.timers.today=Math.floor(_that.timers.today/60); // перевод в часы
            _that.timers.todayHours = _that.timers.today % 24; // Часы
            _that.timers.today = Math.floor(_that.timers.today/24); //  перевод в дни


  
            disp.innerHTML = `${_that.timers.today} days ${_that.timers.todayHours} h 
                            ${ _that.timers.todayMins} m ${ _that.timers.todaySec} s`;

            if (_that.timers.today < 0) {
                
                clearTimeout(_that.timeGo);
                let prew = document.querySelector(`[data-num="${_that.timers.thisNum}"]`);
                let timerSpan = document.querySelector(`[data-timer="${_that.timers.thisNum}"]`);
                prew.classList.add('unactive');
                
                timerSpan.remove();
                let listParse = JSON.parse(localStorage.list);
                
                listParse[_that.timers.thisNum].save = true;
                localStorage.list = JSON.stringify(listParse);

            } else _that.timeGo = setTimeout(tick,0);
            
        }, 0);

    }
}
