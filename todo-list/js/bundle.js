"use strict";function _possibleConstructorReturn(e,t){return!t||"object"!==_typeof(t)&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,a){return t&&_defineProperties(e.prototype,t),a&&_defineProperties(e,a),e}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}!function(a,u,e){function p(){return"function"!=typeof u.createElement?u.createElement(arguments[0]):v?u.createElementNS.call(u,"http://www.w3.org/2000/svg",arguments[0]):u.createElement.apply(u,arguments)}var d=[],c=[],t={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var a=this;setTimeout(function(){t(a[e])},0)},addTest:function(e,t,a){c.push({name:e,fn:t,options:a})},addAsyncTest:function(e){c.push({name:null,fn:e})}},h=function(){};h.prototype=t,h=new h;var m=u.documentElement,v="svg"===m.nodeName.toLowerCase(),n=t._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];t._prefixes=n;var r=t.testStyles=function(e,t,a,n){var r,o,s,i,l="modernizr",d=p("div"),c=function(){var e=u.body;return e||((e=p(v?"svg":"body")).fake=!0),e}();if(parseInt(a,10))for(;a--;)(s=p("div")).id=n?n[a]:l+(a+1),d.appendChild(s);return(r=p("style")).type="text/css",r.id="s"+l,(c.fake?c:d).appendChild(r),c.appendChild(d),r.styleSheet?r.styleSheet.cssText=e:r.appendChild(u.createTextNode(e)),d.id=l,c.fake&&(c.style.background="",c.style.overflow="hidden",i=m.style.overflow,m.style.overflow="hidden",m.appendChild(c)),o=t(d,e),c.fake?(c.parentNode.removeChild(c),m.style.overflow=i,m.offsetHeight):d.parentNode.removeChild(d),!!o};h.addTest("touchevents",function(){var t;if("ontouchstart"in a||a.DocumentTouch&&u instanceof DocumentTouch)t=!0;else{var e=["@media (",n.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");r(e,function(e){t=9===e.offsetTop})}return t}),function(){var e,t,a,n,r,o,s,i;for(var l in c)if(c.hasOwnProperty(l)){if(e=[],(t=c[l]).name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(a=0;a<t.options.aliases.length;a++)e.push(t.options.aliases[a].toLowerCase());for(s=t.fn,i="function",n=_typeof(s)===i?t.fn():t.fn,r=0;r<e.length;r++)1===(o=e[r].split(".")).length?h[o[0]]=n:(!h[o[0]]||h[o[0]]instanceof Boolean||(h[o[0]]=new Boolean(h[o[0]])),h[o[0]][o[1]]=n),d.push((n?"":"no-")+o.join("-"))}}(),function(e){var t=m.className,a=h._config.classPrefix||"";if(v&&(t=t.baseVal),h._config.enableJSClass){var n=new RegExp("(^|\\s)"+a+"no-js(\\s|$)");t=t.replace(n,"$1"+a+"js$2")}h._config.enableClasses&&(t+=" "+a+e.join(" "+a),v?m.className.baseVal=t:m.className=t)}(d),delete t.addTest,delete t.addAsyncTest;for(var o=0;o<h._q.length;o++)h._q[o]();a.Modernizr=h}(window,document);var ListModal=function(){function e(){_classCallCheck(this,e),this.states={main:!1,modal:!1}}return _createClass(e,[{key:"getKey",value:function(){return this.key="fcec3450dbf00eb6e012fa3766c6d11d"}},{key:"setState",value:function(e,t){"main"===e&&(this.states.main=t),"modal"===e&&(this.states.modal=t)}},{key:"getState",value:function(e){return"main"===e?this.states.main:"modal"===e?this.states.modal:void 0}},{key:"getCoords",value:function(){this.weatherHistory={},this.weathersArray=[],fetch("https://get.geojs.io/v1/ip/geo.json").then(function(e){return e.json()}).then(function(e){var t={latitude:e.latitude,longitude:e.longitude};localStorage.coords=JSON.stringify(t)}).catch(function(e){console.log(e)})}},{key:"getWeather",value:function(n,a,r){var o=this,e=JSON.parse(localStorage.coords);fetch("http://api.openweathermap.org/data/2.5/forecast?lat=".concat(e.latitude,"&lon=").concat(e.longitude,"&APPID=").concat(this.getKey())).then(function(e){return e.json()}).then(function(e){o.weatherHistory={},e.list.forEach(function(e){var t=e.dt_txt.split(" ")[0].split("-").reverse().join().replace(/\,/g,"."),a=e.dt_txt.split(" ")[1].slice(0,5);t===n.dataset.date&&(o.weatherHistory["".concat(a)]="<span class ='important'>".concat(Math.floor(e.main.temp-273.15)," C°</span>"))})}).then(function(){for(var e in o.weathersArray=[],o.weatherHistory)if(o.weatherHistory!={}){var t=document.createElement("li");t.classList.add("weather"),t.innerHTML="".concat(e," : ").concat(o.weatherHistory[e]),o.weathersArray.push(t),a.appendChild(t)}return o.weathersArray.length<=1&&a.classList.add("ResetCount"),Todo.checkEmpty(r),Todo.spinnerHide(),!0}).catch(function(e){console.log(e)})}}]),e}(),Loader=function(){function e(){_classCallCheck(this,e),this.image=[]}return _createClass(e,[{key:"loading",value:function(e,t,a){if("image"===e){var n=new Image;n.src=t,n.classList.add(a),this.image.push(n)}}}]),e}(),Storage=function(){function e(){_classCallCheck(this,e),this.arrayList=[],this.lists=[],this.dateArray=[],this.buffer=[],this.valueButton=null,this.number=0}return _createClass(e,[{key:"updateStorage",value:function(e,t){var a=e.filter(function(e){return e.uniqueId!=t});return a.forEach(function(e){return 0<e.value&&(e.value=e.value-1)}),localStorage.list=JSON.stringify(a),!0}},{key:"localeStorageUpdate",value:function(e,t){localStorage.setItem("newTodo",e),this.valueButton=t.slice(0,10).split("-").reverse().join().replace(/\,/g,".");var a=new todoOne(localStorage.newTodo,this.valueButton);return a.save=!0,localStorage.list&&(this.lists=JSON.parse(localStorage.list)),this.lists.push(a),localStorage.list=JSON.stringify(this.lists,null,"\t"),this.number}},{key:"dataParser",value:function(){localStorage.date&&(this.buffer=JSON.parse(localStorage.date)),!localStorage.date&&(localStorage.date=JSON.stringify([this.valueButton])),localStorage.date&&this.buffer.push(this.valueButton),localStorage.date&&(localStorage.date=JSON.stringify(this.buffer))}}]),e}(),todoOne=function(){function a(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0,t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:Date.now();_classCallCheck(this,a),this.changeNote=!1,this.save=!1,this.uniqueId="id".concat(Math.floor(1e7*(Math.random()+5-5).toFixed(7))),this.note="click for add note",this.value=e,this.date=t}return _createClass(a,[{key:"updateChangeNote",value:function(e){e.changeNote&&(e.changeNote=!1)}}]),a}(),Calendar=function(){function e(){_classCallCheck(this,e),this.selectDate=null,this.selectDateName=[],this.listName=null,this.todayYear=(new Date).getFullYear(),this.todayMonth=(new Date).getMonth(),this.totalDay=null,this.dateWeek=["Mon","Tue","Wed","Thu","Fr","Sat","Sun"],this.monthName=["January","February","March","April","May","June","July","August","September","October","November","December"],this.dateNow=Date.now(),this.currentDate=new Date(this.dateNow),this.LocalTimeFormat=this.currentDate.toLocaleDateString().split(/\.|\//g),this.currentDay=parseInt(this.LocalTimeFormat[0]),this.currentMonth=parseInt(this.LocalTimeFormat[1]),this.currentYear=parseInt(this.LocalTimeFormat[2]),this.firstDay=null,this.weekDay=null,this.one=1}return _createClass(e,[{key:"parseCalendarData",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0,t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,a=2<arguments.length&&void 0!==arguments[2]&&arguments[2];1===this.currentMonth?(this.currentYear="prewMonth"===a?this.currentYear+t:this.currentYear,this.currentMonth="prewMonth"===a?12:this.currentMonth+t,("prew"===a||"next"===a)&&(this.currentYear=this.currentYear+e)):12===this.currentMonth?(this.currentYear="prewMonth"===a?this.currentYear:"nextMonth"!=a?this.currentYear=this.currentYear:this.currentYear+t,this.currentMonth="prewMonth"===a?this.currentMonth+t:"nextMonth"===a?this.one:this.currentMonth,("prew"===a||"next"===a)&&(this.currentYear=this.currentYear+e)):(this.currentYear=this.currentYear+e,this.currentMonth=this.currentMonth+t),this.firstDay=new Date(this.currentYear,this.currentMonth),this.weekDay=this.firstDay.getDay(),this.totalDay=new Date(this.currentYear,this.currentMonth,0).getDate()}},{key:"aboutTodo",value:function(e,t){var a=this,n=!1;this.listName=JSON.parse(localStorage.list);var r=e.dataset.day<10?"0":"";return(t=t.split("."))[0]=r+e.dataset.day,this.selectDate=t.join().replace(/\,/g,"."),this.selectDateName=this.listName.filter(function(e){return a.selectDate===e.date}),this.selectDateName.length&&(n=!0),n}}]),e}(),View=function e(t){var a=t.appID,n=t.title;_classCallCheck(this,e),this.ID=a,this.title=n},Todo=function(e){function a(e){var t;return _classCallCheck(this,a),(t=_possibleConstructorReturn(this,_getPrototypeOf(a).call(this,e))).arrayJSON=[],t}return _inherits(a,View),_createClass(a,[{key:"spinnerShow",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:document.createElement("div"),t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:document.createElement("image"),a=document.querySelector(".weather-box");a||(a=document.createElement("div")).classList.add("weather-box"),t.classList.add("center"),e.appendChild(a),a.appendChild(t)}},{key:"build",value:function(e){var t=document.createElement("div");t.classList.add("wrapper");var a=document.createElement("div");a.classList.add("footer");var n=document.createElement("div");n.classList.add("section");var r=document.createElement("div");r.classList.add("sortWrapper");var o=document.createElement("input");o.setAttribute("type","button"),o.classList.add("selectCalendar"),o.value="select date";var s=document.createElement("input");s.setAttribute("type","button"),s.classList.add("sort"),s.classList.add("sortBefore"),s.value="past";var i=document.createElement("input");i.setAttribute("type","button"),i.classList.add("sort"),i.classList.add("sortCurrent"),i.value="current";var l=document.createElement("input");l.setAttribute("type","button"),l.classList.add("sort"),l.classList.add("sortAfter"),l.value="future";var d=document.createElement("input");d.setAttribute("type","button"),d.classList.add("sort"),d.classList.add("sortAll"),d.value="all";var c=document.createElement("div");c.classList.add("todoList");var u=document.createElement("h1");u.classList.add("title"),u.innerHTML=this.title;var p=document.createElement("div");p.classList.add("controllers");var h=document.createElement("input");h.setAttribute("type","text"),h.setAttribute("maxlength","110"),h.classList.add("getTodo"),h.setAttribute("placeholder","What should you do?");var m=document.createElement("input");m.setAttribute("type","button"),m.classList.add("setTodo"),m.setAttribute("value","ADD");var v=document.createElement("input");v.classList.add("date"),v.setAttribute("disabled",""),v.setAttribute("type","text"),v.setAttribute("value",e),a.appendChild(u),p.appendChild(h),p.appendChild(o),p.appendChild(v),p.appendChild(m),r.appendChild(s),r.appendChild(i),r.appendChild(l),r.appendChild(d),n.appendChild(r),n.appendChild(c),t.appendChild(a),t.appendChild(p),t.appendChild(n),this.ID.appendChild(t)}},{key:"sortTodos",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:[],t=1<arguments.length?arguments[1]:void 0,a=2<arguments.length?arguments[2]:void 0;if("sortAll"!=t)return console.log(a),e.forEach(function(e){return e.classList.add("hide")}),void a.forEach(function(e){return e.classList.toggle("hide")});"sortAll"===t&&e.forEach(function(e){return"hide"===e.classList[1]&&e.classList.toggle("hide")})}},{key:"showNewTodo",value:function(){var e=0<arguments.length&&void 0!==arguments[0]&&arguments[0],t=document.querySelector(".todoList"),a=document.querySelectorAll("p"),n=Date.now(),r=null;a.length&&a.forEach(function(e){return e.remove()});for(var o=0;o<e.length;o++)if(e[o].save){(r=document.createElement("p")).setAttribute("draggable","true"),this.arrayJSON=JSON.parse(localStorage.date),r.dataset.date=this.arrayJSON[o];var s=JSON.parse(localStorage.date)[o].split(".").reverse();s[1]=s[1]-1;var i=new Date(s[0],s[1],s[2]).getTime(),l=new Date(n).toLocaleDateString();r.dataset.date===l?r.classList.add("todayDay"):i<n?r.classList.add("unactive"):n<i&&r.classList.add("future"),r.dataset.unique=e[o].uniqueId,r.innerHTML=e[o].value,t.appendChild(r)}localStorage.removeItem("newTime"),localStorage.removeItem("newTodo")}},{key:"showModal",value:function(){var t=this,e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"click for add note",a=e.findIndex(function(e){return e.uniqueId===t.dataset.unique}),n=document.getElementById("todo"),r=document.createElement("div");r.classList.add("background-modal"),r.classList.add("animateOpen");var o=document.createElement("div");o.classList.add("modal-window"),o.classList.add("animateOpen"),o.dataset.modalNum=this.dataset.unique;var s=document.createElement("input");s.setAttribute("type","button"),s.setAttribute("value","X"),s.classList.add("close");var i=document.createElement("input");i.setAttribute("type","button"),i.setAttribute("value","Delete todo"),i.classList.add("delete");var l=document.createElement("div");l.classList.add("textArea");var d=document.createElement("p");d.classList.add("currentTodo"),d.innerHTML=this.innerHTML;var c=document.createElement("p");c.classList.add("addNotes__title"),c.innerHTML="additional notes";var u=document.createElement("div");u.classList.add("editWrapper");var p=document.createElement("p");p.classList.add("addNotes"),p.innerHTML=e[a].note;var h=document.createElement("ul");h.classList.add("weatherList");var m=document.createElement("p");return m.classList.add("modal-date"),m.innerHTML=this.dataset.date,o.appendChild(s),o.appendChild(m),o.appendChild(i),l.appendChild(d),u.appendChild(c),u.appendChild(p),l.appendChild(u),o.appendChild(l),o.appendChild(h),r.appendChild(o),n.appendChild(r),document.querySelector("[data-modal-num]")}},{key:"showWarning",value:function(e){var t=document.createElement("div");t.classList.add("warning");var a=document.createElement("p");a.classList.add("question"),a.innerHTML="Save changes?";var n=document.createElement("input");n.setAttribute("type","button"),n.classList.add("save"),n.value="save";var r=document.createElement("input");r.setAttribute("type","button"),r.classList.add("cancel"),r.value="cancel",t.appendChild(a),t.appendChild(n),t.appendChild(r),e.appendChild(t)}},{key:"buildCalendar",value:function(){var e=arguments.length<=0?void 0:arguments[0],t=0,a=e.monthName[e.currentMonth-1],n=document.querySelector(".calendar");n&&n.remove();var r=document.querySelector("calendar")?document.querySelector("calendar"):document.createElement("div");r.classList.add("calendar");var o=e.currentMonth<10?"0":"",s=e.currentDay<10?"0":"";r.dataset.current="".concat(s+e.currentDay,".").concat(o+e.currentMonth,".").concat(e.currentYear);var i=document.createElement("div");i.classList.add("calendarControlBtns");var l=document.createElement("input");l.setAttribute("type","button"),l.dataset.move="prew",l.value="<==";var d=document.createElement("input");d.setAttribute("type","button"),d.dataset.move="next",d.value="==>";var c=document.createElement("input");c.setAttribute("type","button"),c.dataset.move="prewMonth",c.value="<=";var u=document.createElement("input");u.setAttribute("type","button"),u.dataset.move="nextMonth",u.value="=>";var p=document.createElement("h3");p.classList.add("calendarDate"),p.innerHTML=a+" "+e.currentYear;var h=document.createElement("ul");h.classList.add("calendarList");var m=document.createElement("div");m.classList.add("calendarController");for(var v=document.querySelector(".controllers"),f=0;f<e.dateWeek.length;f++){var y=document.createElement("li");y.dataset.week=e.dateWeek[f],y.innerHTML=e.dateWeek[f],h.appendChild(y)}for(var g=1,S=1;S<=e.totalDay;g++){if(!e.weekDay&&!t){for(var L=0;L<e.dateWeek.length-1;L++){var b=document.createElement("li");b.classList.add("empty"),h.appendChild(b)}t++}if(e.weekDay<=g){var C=document.createElement("li");e.currentDay===S&&e.todayYear===e.currentYear&&e.currentMonth===e.todayMonth+1&&C.classList.add("today"),C.dataset.day=S,C.innerHTML=S,h.appendChild(C),S++}else{var w=document.createElement("li");w.classList.add("empty"),h.appendChild(w)}}i.appendChild(l),i.appendChild(c),i.appendChild(u),i.appendChild(d),m.appendChild(p),m.appendChild(i),r.appendChild(m),r.appendChild(h),v.appendChild(r)}},{key:"createEditInput",value:function(){var e=document.querySelector(".addNotes"),t=document.querySelector(".textArea"),a=document.querySelector(".editWrapper"),n=document.createElement("textarea"),r=document.createElement("input");e.classList.add("visibility"),n.setAttribute("maxLength","100"),n.classList.add("edditable"),n.value=e.innerHTML,r.setAttribute("type","button"),r.classList.add("editButton"),r.setAttribute("value","Edit"),a.appendChild(n),a.appendChild(r),t.appendChild(a)}},{key:"showCalendarNotification",value:function(e,t){var a=t.getBoundingClientRect(),n=document.createElement("div");n.classList.add("wrapperNotification"),n.dataset.show=e.selectDate,n.style.left=a.left+"px",n.style.top=a.top+a.width+"px";for(var r=document.createElement("ul"),o=0;o<e.selectDateName.length;o++){var s=document.createElement("li");s.classList.add("notificationInfo"),s.innerHTML=e.selectDateName[o].value,r.appendChild(s)}n.appendChild(r),document.body.appendChild(n)}}],[{key:"checkEmpty",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:document.createElement("div"),t=document.querySelector(".weatherList"),a=document.querySelector(".weather-box");if(0===document.querySelectorAll(".weather").length){var n=document.createElement("p");n.classList.add("weather"),n.classList.add("weatherNone"),n.innerHTML="Weather not found",t.remove(),a.remove(),e.appendChild(n)}}},{key:"spinnerHide",value:function(){var e=document.querySelector(".weather-box");e&&e.remove()}}]),a}(),TodoControl=function(){function n(e){var t=e.controllerEnter,a=e.btn;_classCallCheck(this,n),this.xMouse=null,this.yMouse=null,this.btnEnter=t,this.btnAdd=a}return _createClass(n,[{key:"mainController",value:function(e,t,a,n,r,o){var s=document.querySelectorAll("[data-unique]"),i=document.querySelector(".calendar"),l=o.parentNode.parentNode,d=null,c=null;if(i&&("wrapper"===o.classList[0]||"todoList"===o.classList[0])&&i.remove(),"selectCalendar"===o.classList[0]&&e.buildCalendar(n),o.dataset.move&&("prew"===o.dataset.move&&(n.parseCalendarData(-1,null,o.dataset.move),e.buildCalendar(n)),"next"===o.dataset.move&&(n.parseCalendarData(1,null,o.dataset.move),e.buildCalendar(n)),"prewMonth"===o.dataset.move&&(n.parseCalendarData(null,-1,o.dataset.move),e.buildCalendar(n)),"nextMonth"===o.dataset.move&&(n.parseCalendarData(null,1,o.dataset.move),e.buildCalendar(n))),o.dataset.day){var u=document.querySelectorAll("[data-day]"),p=document.querySelector(".date"),h=l.dataset.current.split(".");h[0]=o.dataset.day,u.forEach(function(e){"selectDay"===e.classList[0]&&e.classList.toggle("selectDay")}),o.classList.add("selectDay");var m=h[0]<10?"0":"";h[0]=(m+h[0]).trim(),p.value=h.reverse().join().replace(/\,/g,"-"),setTimeout(function(){return l.remove()},300)}if("sortAfter"===o.classList[1]&&(d=document.querySelectorAll(".future")),"sortBefore"===o.classList[1]&&(d=document.querySelectorAll(".unactive")),"sortCurrent"===o.classList[1]&&(d=document.querySelectorAll(".todayDay")),"sort"===o.classList[0]&&e.sortTodos(s,o.classList[1],d),"setTodo"===o.classList[0]&&this.btnEnter.value&&(r.localeStorageUpdate(this.btnEnter.value,o.previousSibling.value),r.dataParser(o),e.showNewTodo(JSON.parse(localStorage.list)),this.btnEnter.value=""),o.dataset.unique){var v=null;localStorage.list&&(v=JSON.parse(localStorage.list)),c=e.showModal.call(o,v),e.spinnerShow(c,a.image[0]),t.getWeather(o,document.querySelector(".weatherList"),c),t.setState("main",!1),t.setState("modal",!0)}}},{key:"modalController",value:function(e,t,a,n){var r=document.querySelector("[data-modal-num]"),o=document.querySelector(".addNotes"),s=n.parentNode.parentNode,i=n.parentNode,l=JSON.parse(localStorage.list),d=l.findIndex(function(e){return r.dataset.modalNum===e.uniqueId});if("addNotes"===n.classList[0]&&(e.createEditInput(),l[d].changeNote=!0,localStorage.list=JSON.stringify(l)),"editButton"===n.classList[0]&&(o.innerHTML=n.previousSibling.value,l[d].note=n.previousSibling.value,localStorage.list=JSON.stringify(l),o.classList.toggle("visibility"),n.previousSibling.remove(),n.remove()),"close"!==n.classList[0]&&"background-modal"!==n.classList[0]||(r=r.parentNode,l[d].changeNote?e.showWarning(r):(t.setState("main",!0),t.setState("modal",!1),r.classList.toggle("animateOpen"),r.classList.add("animateHide"),setTimeout(function(){r.style.display="none",r.remove()},400))),"save"===n.classList[0]?(t.setState("main",!0),t.setState("modal",!1),n.parentNode.remove(),r.classList.toggle("animateOpen"),r.classList.add("animateHide"),l.forEach(function(e){return e.changeNote&&(e.changeNote=!1)}),localStorage.list=JSON.stringify(l),setTimeout(function(){r.style.display="none",r.parentNode.remove(),r.remove()},400)):"cancel"===n.classList[0]&&n.parentNode.remove(),"delete"===n.classList[0]){var c=document.querySelector('[data-unique="'.concat(i.dataset.modalNum,'"]')),u=c.dataset.unique,p=JSON.parse(localStorage.list),h=JSON.parse(localStorage.date),m=p.findIndex(function(e){return e.uniqueId===u});h.splice(m,1),localStorage.date=JSON.stringify(h);var v=p.filter(function(e){return e.uniqueId===u});a.updateStorage(JSON.parse(localStorage.list),v[0].uniqueId),c.remove(),t.setState("main",!0),t.setState("modal",!1),s.remove()}document.querySelectorAll("[data-date]").forEach(function(e,t){return e.dataset.num=t})}},{key:"setLsitener",value:function(a,n,r,o,s){var i=this,e=document.querySelector(".todoList"),t=function(e){var t=e.target;n.getState("main")&&i.mainController(a,n,r,o,s,t),n.getState("modal")&&i.modalController(a,n,s,t)};console.log("touchevents detected:"+Modernizr.touchevents),Modernizr.touchevents&&document.addEventListener("touchend",t,!1),!Modernizr.touchevents&&document.addEventListener("click",t,!1),document.addEventListener("keydown",function(e){"date"===e.target.classList[0]&&e.preventDefault()},!1),document.addEventListener("mouseover",function(e){if(!Modernizr.touchevents){var t=document.querySelector(".calendar");if(document.querySelectorAll(".wrapperNotification").forEach(function(e){return e.remove()}),!e.target.dataset.day)return;o.aboutTodo(e.target,t.dataset.current)&&a.showCalendarNotification(o,e.target)}},!1),document.addEventListener("mousemove",function(e){i.xMouse=e.clientX,i.yMouse=e.clientY});var l=null;document.addEventListener("dragstart",function(e){l=e.target,e.dataTransfer.setData("text","foo")}),e.addEventListener("dragover",function(e){e.preventDefault();var t=e.target,a=t.getBoundingClientRect(),n=a.y+a.height/2;"todoList"!=t.classList[0]&&0<e.clientY-n&&(t.style["border-bottom"]="solid 4px red",t.style["border-top"]="")}),e.addEventListener("dragleave",function(e){e.preventDefault(),e.target.style["border-bottom"]="",e.target.style["border-top"]=""}),e.addEventListener("drop",function(e){e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation();var t=e.target,a=JSON.parse(localStorage.date),n=JSON.parse(localStorage.list);if(""!==t.style["border-bottom"]){t.style["border-bottom"]="";var r=l.dataset.unique,o=t.dataset.unique,s=n.findIndex(function(e){return e.uniqueId===o}),i=n.findIndex(function(e){return e.uniqueId===r});i<s?(a.splice(s,0,a.splice(s,1,a[i])[0]),a.splice(i,1),n.splice(s,0,n.splice(s,1,n[i])[0]),n.splice(i,1)):(a.splice(s,0,a.splice(s,1,a[i])[0]),a.splice(i+1,1),n.splice(s,0,n.splice(s,1,n[i])[0]),n.splice(i+1,1)),this.insertBefore(l,t.nextSibling),document.querySelectorAll("[data-date]").forEach(function(e,t){return e.dataset.num=t}),localStorage.date=JSON.stringify(a),localStorage.list=JSON.stringify(n)}else t.style["border-top"]=""}),window.addEventListener("DOMContentLoaded",function(){if(localStorage.list){var e=JSON.parse(localStorage.list);e.forEach(function(e){return e.changeNote&&(e.changeNote=!1)}),localStorage.list=JSON.stringify(e),a.showNewTodo(e)}},!1)}}]),n}(),todoApp={init:function(){var e={appID:document.getElementById("todo"),title:"Todo-list"},t=new Loader,a=(new Date).toLocaleDateString().split(".").reverse().join().replace(/\,/g,"-");t.loading("image","../img/spinner.gif","smallSpinner");var n=new ListModal,r=new Storage;n.getCoords(),n.setState("main",!0);var o=new Todo(e);o.build(a);var s=new Calendar;s.parseCalendarData();var i={controllerEnter:document.querySelector(".getTodo"),btn:document.querySelector(".setTodo")};new TodoControl(i).setLsitener(o,n,t,s,r)}};todoApp.init();
//# sourceMappingURL=bundle.js.map
