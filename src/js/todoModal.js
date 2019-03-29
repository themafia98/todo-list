
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
        this.timersN = -1;
    }

    store(todo){

        (todo.value) && (this.arrayList.push(todo.value));
        localStorage.list = this.arrayList.join();
        (localStorage.newTodo) && (localStorage.removeItem('newTodo'));
    }

    updateStorage(list, list2 , num){
        
        let nums = parseInt(num);
        if (list.some((e,i,v)=> e.timer === nums)) {

           let newList = list.filter( (v) => { return v.timer != nums;});
           let newList2 = list2.filter((v)=>{ return parseInt(v.timer) != nums;});

            list.forEach(element => { element.timer--;});
            list2.forEach(element => { element.timer--;});

           localStorage.list = JSON.stringify(newList);
            localStorage.ar = JSON.stringify(newList2);
        }


    }
}



class todoOne {

    constructor(timerN,value){
        this.value = value;
        this.timer = timerN;

        this.ac = null;
        this.today = null;
        this.todaySec = null;
        this.todayMins = null;
        this.todayHours = null;
    }

    startTimer(num) {

        let _that = this;
        
        let display = document.createElement('span');
        display.classList.add('timer');
        display.dataset.timer = num;
        let here = document.querySelector('.todoList');
        here.appendChild(display);


        setInterval(function () {
            if(num >= 1) {};
            // let minutes = parseInt(timer / 60, 10)
            // let seconds = timer;
            let ab = Date.now();
            let disp = document.querySelector(`[data-timer = "${num}"]`);

            _that.ac = new Date(localStorage.newDate.split('.').reverse().join().replace(/\./g,',')).getTime();

     
            _that.today = Math.floor((_that.ac - ab)/1000.0); // разница между текущей датой и др и переводим в секунды
            _that.todaySec =_that.today % 60;  // Секунды
            _that.today = Math.floor(_that.today/60); // перевод в минуты
            _that.todayMins = _that.today % 60;  // Минуты
            _that.today=Math.floor(_that.today/60); // перевод в часы
            _that.todayHours = _that.today % 24; // Часы
            _that.today = Math.floor(_that.today/24); //  перевод в дни

    
            disp.innerHTML = `${_that.today} days ${_that.todayHours} h ${ _that.todayMins} m ${ _that.todaySec} s`;

            // if (--timer < 0) {
            //     timer = duration;
            // }
        }, 1000);

    }
}
