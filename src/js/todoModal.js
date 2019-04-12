class ListModal{

    constructor(){

        this.states ={
            main: false,
            modal: false,
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

        this.weatherHistory ={};
        this.weathersArray = [];


        fetch('https://get.geojs.io/v1/ip/geo.json')
        .then( (response) => response.json())
        .then( (response) =>{

            let coords ={
                latitude: response.latitude,
                longitude: response.longitude
            }
            localStorage.coords = JSON.stringify(coords);
        })

        .catch ( error =>{
            console.log(error);
        });
    }

    getWeather(target,weatherList,modal){

        let coords = JSON.parse(localStorage.coords);

        fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&APPID=${this.getKey()}`)
        .then((response) => response.json())
        .then((response) =>{

            this.weatherHistory ={};
            response.list.forEach(element => {
                let date = element.dt_txt.split(' ')[0].split('-').reverse().join().replace(/\,/g,'.');
                let time = element.dt_txt.split(' ')[1].slice(0,5);

                if (date === target.dataset.date){

                    this.weatherHistory[`${time}`]=
                    `<span class ='important'>${Math.floor((element.main.temp - 273.15))} C°</span>`;
                }
            });

        })

        .then (()=>{

            this.weathersArray = [];
            for (let key in this.weatherHistory){

                if (this.weatherHistory !={}){

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

        .catch ( error =>{
            console.log(error);
        });
    }

}

class Loader{

    constructor(){

        this.image = [];
    }

    loading(type,srcFile, css){

        if (type === 'image'){

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
        this.buffer = [];
        this.number = 0;
    }

    updateStorage(list,num){

        let newList = list.filter( (v) =>{ return v.uniqueId != num;});

        newList.forEach( e =>  (e.value > 0) && (e.value = e.value-1) );

        localStorage.list = JSON.stringify(newList);

        return true;
    }

    localeStorageUpdate(btnValue){

        localStorage.setItem('newTodo',btnValue);
        let todo = new todoOne(localStorage.newTodo);

        todo.save = true;

        (localStorage.list) && (this.lists = JSON.parse(localStorage.list));
        this.lists.push(todo);

        localStorage.list = JSON.stringify(this.lists,null, '\t');

        return this.number;
    }

    dataParser(target = null){

        (localStorage.date) && (this.buffer = JSON.parse(localStorage.date));

        let valueButton = target.previousSibling.value.slice(0,10).split('-').reverse()
                        .join().replace(/\,/g,'.');

        (!(localStorage.date)) && (localStorage.date = JSON.stringify([valueButton]));
        (localStorage.date) && (this.buffer.push(valueButton));
        (localStorage.date) && (localStorage.date = JSON.stringify(this.buffer));

    }
}

class todoOne{

    constructor(value = 0){

        this.changeNote = false;
        this.save = false;
        this.uniqueId = `id${ Math.floor((((Math.random()+5)-5).toFixed(7))*10000000)}`;
        this.note  = 'click for add note';
        this.value = value;
    }

    updateChangeNote(item){ (item.changeNote) && (item.changeNote = false) };
}


class Calendar{

    constructor(){

        this.selectDate = null;
        this.selectDateName = null;
        this.dateJSON = null;
        this.listName = null;
        this.numDate = [];

        this.todayYear = new Date().getFullYear();
        this.todayMonth = new Date().getMonth();
        this.totalDay = null;

        this.dateWeek = ['Mon', 'Tue', 'Wed', 'Thu','Fr','Sat','Sun'];

        this.monthName = ['January', 'February', 'March', 'April',
                          'May','June', 'July','August','September',
                          'October','November','December'];

        this.dateNow = Date.now();
        this.currentDate = new Date(this.dateNow);

        this.LocalTimeFormat = this.currentDate.toLocaleDateString().split('.');

        this.currentDay = parseInt(this.LocalTimeFormat[0]);
        this.currentMonth =  parseInt(this.LocalTimeFormat[1]);
        this.currentYear =  parseInt(this.LocalTimeFormat[2]);

        this.firstDay = null;
        this.weekDay = null;
        this.one = 1; // support

    }

    parseCalendarData(changeYear = 0, changeMonth = 0,target = false){

        if (this.currentMonth === 1){

        this.currentYear = target === 'prewMonth' ? this.currentYear + changeMonth : this.currentYear;
        this.currentMonth = target === 'prewMonth' ? 12 : this.currentMonth + changeMonth;

        ((target === 'prew') || (target === 'next')) && (this.currentYear = this.currentYear + changeYear);

        } else if (this.currentMonth === 12){

        this.currentYear = (target === 'prewMonth') ? this.currentYear : (target != 'nextMonth') ?
                this.currentYear = this.currentYear: this.currentYear  + changeMonth;

        this.currentMonth = (target === 'prewMonth') ? this.currentMonth + changeMonth : target === 'nextMonth' ? 
                (this.one) : this.currentMonth;

        ((target === 'prew') || (target === 'next')) && (this.currentYear = this.currentYear + changeYear);

        } else{

            this.currentYear = this.currentYear + changeYear;
            this.currentMonth = this.currentMonth + changeMonth;
        }


        this.firstDay = new Date(this.currentYear,this.currentMonth);
        this.weekDay = this.firstDay.getDay();

        this.totalDay = new Date(this.currentYear,this.currentMonth,0).getDate();

    }


    aboutTodo(target,date){

        let check = false;
        this.dateJSON = JSON.parse(localStorage.date);
        this.listName = JSON.parse(localStorage.list);

        this.selectDateName = [];
        this.numDate = [];

        date = date.split('.');
        date[0] = target.dataset.day;
        this.selectDate = date.join().replace(/\,/g,'.');
        this.dateJSON.forEach( (item,i) => (item === this.selectDate) && (this.numDate.push(i)) );
        this.selectDateName = this.listName.filter((item,i) => i = this.numDate[i]);

        console.log(this.selectDate);
        console.log(this.selectDateName);

        (this.selectDateName.length) && (check = true);

        return check;
    }
}


