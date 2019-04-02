

class ListModal{

    constructor(){
        this.weatherHistory = {};
        this.states = {
            main: false,
            modal: false
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

        fetch('https://get.geojs.io/v1/ip/geo.json')
        .then( (response) => response.json())
        .then( (response) =>{
            console.log(response);
            let coords = {
                latitude: response.latitude,
                longitude: response.longitude
            }
            localStorage.coords = JSON.stringify(coords);
        })
    }
    
    getWeather(target,modal) {

        let coords = JSON.parse(localStorage.coords);
        fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&APPID=${this.getKey()}`)
        .then( (response) => response.json())
        .then( (response) =>{
            this.weatherHistory = {};
            response.list.forEach(element => {

                let date = element.dt_txt.split(' ')[0].split('-').reverse().join().replace(/\,/g,'.');
                let time = element.dt_txt.split(' ')[1];
                if (date === target.dataset.date){
                    
                    debugger;
                    this.weatherHistory[`${time}`]= `${Math.floor((element.main.temp - 273.15))} C°`;
                }
                // } else {

                //     this.weatherHistory['key'] = 'not found';
                // }
            });

        })

        .then ( ()=> {

            
        
            for (let key in this.weatherHistory){
                if (this.weatherHistory != {}){
            let weatherView = document.createElement('p');
            weatherView.classList.add('weather');
            weatherView.innerHTML = `${key} : ${this.weatherHistory[key]}`;
            modal.appendChild(weatherView);
                } else {
                    let weatherView = document.createElement('p');
                    weatherView.classList.add('weather');
                    weatherView.innerHTML = `Not found`;
                    modal.appendChild(weatherView);
                }
            }
        });

    }

}

class Storage{
    constructor(){
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

    constructor(timerN,value){
        super();
        this.value = value;
        this.timer = timerN;
        this.save = false;
    }
}


