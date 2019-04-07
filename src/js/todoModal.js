

class ListModal{

    constructor(){
        this.states = {
            main: () => false,
            modal: () => false,
        };
    }

    getKey(){
        return this.key = 'fcec3450dbf00eb6e012fa3766c6d11d';
    }

    setState(bind,what){

        (bind === 'main') && (this.states.main = what);
        (bind === 'modal') && (this.states.modal = what);
    }

    getState(bind){
        if (bind === 'main') return this.states.main;
        if (bind === 'modal') return this.states.modal;
    }

    getCoords(){

        this.weatherHistory = {};
        this.weathersArray = [];


        fetch('https://get.geojs.io/v1/ip/geo.json')
        .then( (response) => response.json())
        .then( (response) =>{

            let coords = {
                latitude: response.latitude,
                longitude: response.longitude
            }
            localStorage.coords = JSON.stringify(coords);
        })

        .catch ( error => {
            console.log(error);
        });
    }
    
    getWeather(target,weatherList,modal) {

        let coords = JSON.parse(localStorage.coords);
        
        fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&APPID=${this.getKey()}`)
        .then((response) => response.json())
        .then((response) =>{
            this.weatherHistory = {};
            response.list.forEach(element => {

                
                let date = element.dt_txt.split(' ')[0].split('-').reverse().join().replace(/\,/g,'.');
                let time = element.dt_txt.split(' ')[1].slice(0,5);
                if (date === target.dataset.date){

                    this.weatherHistory[`${time}`]= `<span class ='important'>${Math.floor((element.main.temp - 273.15))} C°</span>`;
                }
            });

        })

        .then (()=> {

            this.weathersArray = [];
            for (let key in this.weatherHistory){
                if (this.weatherHistory != {}){
            let weatherView = document.createElement('li');
            weatherView.classList.add('weather');
            weatherView.innerHTML = `${key} : ${this.weatherHistory[key]}`;
            this.weathersArray.push(weatherView);
            weatherList.appendChild(weatherView);
                }
            }

            (this.weathersArray.length <= 1) && (weatherList.classList.add('ResetCount'));
            Todo.checkEmpty(modal);
            Todo.spinnerHide();
            return true;
        })

        .catch ( error => {
            console.log(error);
        });
    }

}

class Loader {

    constructor(){ 

        this.image = [];
    }

    loading(type,srcFile, css){

        if (type === 'image') {
        let image = new Image();
        image.src = srcFile;
        image.classList.add(css);
        this.image.push(image);
    }
    }
}

class Storage{
    constructor(){
        this.arrayList = [];
        this.lists = [];
        this.dateArray = [];
        this.buffer = {};
        this.number = 0;
    }

    store(todo){

        (todo.value) && (this.arrayList.push(todo.value));
        localStorage.list = this.arrayList.join();
        (localStorage.newTodo) && (localStorage.removeItem('newTodo'));
    }

    updateStorage(list,num){
        
        let newList = list.filter( (v) => { return v.uniqueId != num;});

        localStorage.list = JSON.stringify(newList);

        return true;
    }

    localeStorageUpdate(){


        localStorage.setItem('newTodo',this.btnEnter.value);
        
        let todo = new todoOne(localStorage.newTodo);

        todo.save = true;

        (localStorage.list) && (this.lists = JSON.parse(localStorage.list));
        this.lists.push(todo);

        localStorage.list = JSON.stringify(this.lists,null, '\t');

        return this.number;
    }

    dataParser(target){
       
        (localStorage.date) && (this.buffer = JSON.parse(localStorage.date));
        let valueButton = target.previousSibling.value.slice(0,10).split('-').reverse()
                        .join().replace(/\,/g,'.');

        (!(localStorage.date)) && (localStorage.date = JSON.stringify([valueButton]));
        (localStorage.date) && (this.buffer.push(valueButton));
        (localStorage.date) && (localStorage.date = JSON.stringify(this.buffer));

    }


    
}

class todoOne extends ListModal {

    constructor(value){
        super();
        this.value = value;
        this.save = false;
        this.uniqueId = `id${ Math.floor((((Math.random()+5)-5).toFixed(7))*10000000)}`;
        this.note  = 'click for add note';
    }
}


class Calendar {

    constructor(){

        this.todayYear = new Date().getFullYear();
        this.totalDay = null;
        this.dateWeek = ['Mon', 'Tue', 'Wed', 'Thu','Fr','Sat','Sun'];
        this.monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];

        this.dateNow = Date.now();
        this.currentDate = new Date(this.dateNow);

        this.LocalTimeFormat = this.currentDate.toLocaleDateString().split('.');

        this.currentDay = parseInt(this.LocalTimeFormat[0]);
        this.currentMonth =  parseInt(this.LocalTimeFormat[1]);
        this.currentYear =  parseInt(this.LocalTimeFormat[2]);

        this.firstDay = null;
        this.weekDay = null;

    }

    parseCalendarData(changeYear = 0){

        this.currentYear = this.currentYear + changeYear;
        this.firstDay = new Date(this.currentYear,this.currentMonth-1);
        this.weekDay = this.firstDay.getDay();

        this.totalDay = new Date(this.currentYear,this.currentMonth,0).getDate();
        console.log(this.firstDay + ' ' + this.weekDay);
        // (this.currentMonth-1 === 0) && (this.totalDay = 31);
        // (this.currentMonth-1 === 1) && (this.totalDay = 31);
    }
}


