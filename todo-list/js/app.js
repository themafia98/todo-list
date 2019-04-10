"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-touchevents-setclasses !*/
!function (e, n, t) {
  function o(e) {
    var n = u.className,
        t = Modernizr._config.classPrefix || "";

    if (p && (n = n.baseVal), Modernizr._config.enableJSClass) {
      var o = new RegExp("(^|\\s)" + t + "no-js(\\s|$)");
      n = n.replace(o, "$1" + t + "js$2");
    }

    Modernizr._config.enableClasses && (n += " " + t + e.join(" " + t), p ? u.className.baseVal = n : u.className = n);
  }

  function s(e, n) {
    return _typeof(e) === n;
  }

  function a() {
    var e, n, t, o, a, i, r;

    for (var l in c) {
      if (c.hasOwnProperty(l)) {
        if (e = [], n = c[l], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)) for (t = 0; t < n.options.aliases.length; t++) {
          e.push(n.options.aliases[t].toLowerCase());
        }

        for (o = s(n.fn, "function") ? n.fn() : n.fn, a = 0; a < e.length; a++) {
          i = e[a], r = i.split("."), 1 === r.length ? Modernizr[r[0]] = o : (!Modernizr[r[0]] || Modernizr[r[0]] instanceof Boolean || (Modernizr[r[0]] = new Boolean(Modernizr[r[0]])), Modernizr[r[0]][r[1]] = o), f.push((o ? "" : "no-") + r.join("-"));
        }
      }
    }
  }

  function i() {
    return "function" != typeof n.createElement ? n.createElement(arguments[0]) : p ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0]) : n.createElement.apply(n, arguments);
  }

  function r() {
    var e = n.body;
    return e || (e = i(p ? "svg" : "body"), e.fake = !0), e;
  }

  function l(e, t, o, s) {
    var a,
        l,
        f,
        c,
        d = "modernizr",
        p = i("div"),
        h = r();
    if (parseInt(o, 10)) for (; o--;) {
      f = i("div"), f.id = s ? s[o] : d + (o + 1), p.appendChild(f);
    }
    return a = i("style"), a.type = "text/css", a.id = "s" + d, (h.fake ? h : p).appendChild(a), h.appendChild(p), a.styleSheet ? a.styleSheet.cssText = e : a.appendChild(n.createTextNode(e)), p.id = d, h.fake && (h.style.background = "", h.style.overflow = "hidden", c = u.style.overflow, u.style.overflow = "hidden", u.appendChild(h)), l = t(p, e), h.fake ? (h.parentNode.removeChild(h), u.style.overflow = c, u.offsetHeight) : p.parentNode.removeChild(p), !!l;
  }

  var f = [],
      c = [],
      d = {
    _version: "3.6.0",
    _config: {
      classPrefix: "",
      enableClasses: !0,
      enableJSClass: !0,
      usePrefixes: !0
    },
    _q: [],
    on: function on(e, n) {
      var t = this;
      setTimeout(function () {
        n(t[e]);
      }, 0);
    },
    addTest: function addTest(e, n, t) {
      c.push({
        name: e,
        fn: n,
        options: t
      });
    },
    addAsyncTest: function addAsyncTest(e) {
      c.push({
        name: null,
        fn: e
      });
    }
  },
      Modernizr = function Modernizr() {};

  Modernizr.prototype = d, Modernizr = new Modernizr();
  var u = n.documentElement,
      p = "svg" === u.nodeName.toLowerCase(),
      h = d._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
  d._prefixes = h;
  var m = d.testStyles = l;
  Modernizr.addTest("touchevents", function () {
    var t;
    if ("ontouchstart" in e || e.DocumentTouch && n instanceof DocumentTouch) t = !0;else {
      var o = ["@media (", h.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
      m(o, function (e) {
        t = 9 === e.offsetTop;
      });
    }
    return t;
  }), a(), o(f), delete d.addTest, delete d.addAsyncTest;

  for (var v = 0; v < Modernizr._q.length; v++) {
    Modernizr._q[v]();
  }

  e.Modernizr = Modernizr;
}(window, document);
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ListModal =
/*#__PURE__*/
function () {
  function ListModal() {
    _classCallCheck(this, ListModal);

    this.states = {
      main: false,
      modal: false
    };
  }

  _createClass(ListModal, [{
    key: "getKey",
    value: function getKey() {
      return this.key = 'fcec3450dbf00eb6e012fa3766c6d11d';
    }
  }, {
    key: "setState",
    value: function setState(bind, what) {
      bind === 'main' && (this.states.main = what);
      bind === 'modal' && (this.states.modal = what);
    }
  }, {
    key: "getState",
    value: function getState(bind) {
      if (bind === 'main') return this.states.main;
      if (bind === 'modal') return this.states.modal;
    }
  }, {
    key: "getCoords",
    value: function getCoords() {
      this.weatherHistory = {};
      this.weathersArray = [];
      fetch('https://get.geojs.io/v1/ip/geo.json').then(function (response) {
        return response.json();
      }).then(function (response) {
        var coords = {
          latitude: response.latitude,
          longitude: response.longitude
        };
        localStorage.coords = JSON.stringify(coords);
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: "getWeather",
    value: function getWeather(target, weatherList, modal) {
      var _this = this;

      var coords = JSON.parse(localStorage.coords);
      fetch("http://api.openweathermap.org/data/2.5/forecast?lat=".concat(coords.latitude, "&lon=").concat(coords.longitude, "&APPID=").concat(this.getKey())).then(function (response) {
        return response.json();
      }).then(function (response) {
        _this.weatherHistory = {};
        response.list.forEach(function (element) {
          var date = element.dt_txt.split(' ')[0].split('-').reverse().join().replace(/\,/g, '.');
          var time = element.dt_txt.split(' ')[1].slice(0, 5);

          if (date === target.dataset.date) {
            _this.weatherHistory["".concat(time)] = "<span class ='important'>".concat(Math.floor(element.main.temp - 273.15), " C\xB0</span>");
          }
        });
      }).then(function () {
        _this.weathersArray = [];

        for (var key in _this.weatherHistory) {
          if (_this.weatherHistory != {}) {
            var weatherView = document.createElement('li');
            weatherView.classList.add('weather');
            weatherView.innerHTML = "".concat(key, " : ").concat(_this.weatherHistory[key]);

            _this.weathersArray.push(weatherView);

            weatherList.appendChild(weatherView);
          }
        }

        _this.weathersArray.length <= 1 && weatherList.classList.add('ResetCount');
        Todo.checkEmpty(modal);
        Todo.spinnerHide();
        return true;
      }).catch(function (error) {
        console.log(error);
      });
    }
  }]);

  return ListModal;
}();

var Loader =
/*#__PURE__*/
function () {
  function Loader() {
    _classCallCheck(this, Loader);

    this.image = [];
  }

  _createClass(Loader, [{
    key: "loading",
    value: function loading(type, srcFile, css) {
      if (type === 'image') {
        var image = new Image();
        image.src = srcFile;
        image.classList.add(css);
        this.image.push(image);
      }
    }
  }]);

  return Loader;
}();

var Storage =
/*#__PURE__*/
function () {
  function Storage() {
    _classCallCheck(this, Storage);

    this.arrayList = [];
    this.lists = [];
    this.dateArray = [];
    this.buffer = [];
    this.number = 0;
  }

  _createClass(Storage, [{
    key: "updateStorage",
    value: function updateStorage(list, num) {
      var newList = list.filter(function (v) {
        return v.uniqueId != num;
      });
      newList.forEach(function (e) {
        return e.value > 0 && (e.value = e.value - 1);
      });
      localStorage.list = JSON.stringify(newList);
      return true;
    }
  }, {
    key: "localeStorageUpdate",
    value: function localeStorageUpdate(btnValue) {
      localStorage.setItem('newTodo', btnValue);
      var todo = new todoOne(localStorage.newTodo);
      todo.save = true;
      localStorage.list && (this.lists = JSON.parse(localStorage.list));
      this.lists.push(todo);
      localStorage.list = JSON.stringify(this.lists, null, '\t');
      return this.number;
    }
  }, {
    key: "dataParser",
    value: function dataParser() {
      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      localStorage.date && (this.buffer = JSON.parse(localStorage.date));
      var valueButton = target.previousSibling.value.slice(0, 10).split('-').reverse().join().replace(/\,/g, '.');
      !localStorage.date && (localStorage.date = JSON.stringify([valueButton]));
      localStorage.date && this.buffer.push(valueButton);
      localStorage.date && (localStorage.date = JSON.stringify(this.buffer));
    }
  }]);

  return Storage;
}();

var todoOne =
/*#__PURE__*/
function () {
  function todoOne() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    _classCallCheck(this, todoOne);

    this.changeNote = false;
    this.save = false;
    this.uniqueId = "id".concat(Math.floor((Math.random() + 5 - 5).toFixed(7) * 10000000));
    this.note = 'click for add note';
    this.value = value;
  }

  _createClass(todoOne, [{
    key: "updateChangeNote",
    value: function updateChangeNote(item) {
      item.changeNote && (item.changeNote = false);
    }
  }]);

  return todoOne;
}();

var Calendar =
/*#__PURE__*/
function () {
  function Calendar() {
    _classCallCheck(this, Calendar);

    this.todayYear = new Date().getFullYear();
    this.todayMonth = new Date().getMonth();
    this.totalDay = null;
    this.dateWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fr', 'Sat', 'Sun'];
    this.monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.dateNow = Date.now();
    this.currentDate = new Date(this.dateNow);
    this.LocalTimeFormat = this.currentDate.toLocaleDateString().split('.');
    this.currentDay = parseInt(this.LocalTimeFormat[0]);
    this.currentMonth = parseInt(this.LocalTimeFormat[1]);
    this.currentYear = parseInt(this.LocalTimeFormat[2]);
    this.firstDay = null;
    this.weekDay = null;
    this.one = 1; // support
  }

  _createClass(Calendar, [{
    key: "parseCalendarData",
    value: function parseCalendarData() {
      var changeYear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var changeMonth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (this.currentMonth === 1) {
        this.currentYear = target === 'prewMonth' ? this.currentYear + changeMonth : this.currentYear;
        this.currentMonth = target === 'prewMonth' ? 12 : this.currentMonth + changeMonth;
        (target === 'prew' || target === 'next') && (this.currentYear = this.currentYear + changeYear);
      } else if (this.currentMonth === 12) {
        this.currentYear = target === 'prewMonth' ? this.currentYear : target != 'nextMonth' ? this.currentYear = this.currentYear : this.currentYear + changeMonth;
        this.currentMonth = target === 'prewMonth' ? this.currentMonth + changeMonth : target === 'nextMonth' ? this.one : this.currentMonth;
        (target === 'prew' || target === 'next') && (this.currentYear = this.currentYear + changeYear);
      } else {
        this.currentYear = this.currentYear + changeYear;
        this.currentMonth = this.currentMonth + changeMonth;
      }

      this.firstDay = new Date(this.currentYear, this.currentMonth);
      this.weekDay = this.firstDay.getDay();
      this.totalDay = new Date(this.currentYear, this.currentMonth, 0).getDate();
    }
  }]);

  return Calendar;
}();
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = function View(_ref) {
  var appID = _ref.appID,
      title = _ref.title;

  _classCallCheck(this, View);

  this.ID = appID;
  this.title = title;
};

var Todo =
/*#__PURE__*/
function (_View) {
  _inherits(Todo, _View);

  function Todo(settingsTodo) {
    var _this;

    _classCallCheck(this, Todo);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Todo).call(this, settingsTodo));
    _this.arrayJSON = [];
    return _this;
  }

  _createClass(Todo, [{
    key: "spinnerShow",
    value: function spinnerShow() {
      var modal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.createElement('div');
      var load = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.createElement('image');
      var weatherBox = document.querySelector('.weather-box');

      if (!weatherBox) {
        weatherBox = document.createElement('div');
        weatherBox.classList.add('weather-box');
      }

      ;
      load.classList.add('center');
      modal.appendChild(weatherBox);
      weatherBox.appendChild(load);
    }
  }, {
    key: "build",
    value: function build(time) {
      var wrapper = document.createElement('div');
      wrapper.classList.add('wrapper');
      var footer = document.createElement('div');
      footer.classList.add('footer');
      var section = document.createElement('div');
      section.classList.add('section');
      var sortWrapper = document.createElement('div');
      sortWrapper.classList.add('sortWrapper');
      var selectCalendar = document.createElement('input');
      selectCalendar.setAttribute('type', 'button');
      selectCalendar.classList.add('selectCalendar');
      selectCalendar.value = 'select date';
      var sortBtnBefore = document.createElement('input');
      sortBtnBefore.setAttribute('type', 'button');
      sortBtnBefore.classList.add('sort');
      sortBtnBefore.classList.add('sortBefore');
      sortBtnBefore.value = 'past';
      var sortBtnCurrent = document.createElement('input');
      sortBtnCurrent.setAttribute('type', 'button');
      sortBtnCurrent.classList.add('sort');
      sortBtnCurrent.classList.add('sortCurrent');
      sortBtnCurrent.value = 'current';
      var sortBtnAfter = document.createElement('input');
      sortBtnAfter.setAttribute('type', 'button');
      sortBtnAfter.classList.add('sort');
      sortBtnAfter.classList.add('sortAfter');
      sortBtnAfter.value = 'future';
      var sortBtnAll = document.createElement('input');
      sortBtnAll.setAttribute('type', 'button');
      sortBtnAll.classList.add('sort');
      sortBtnAll.classList.add('sortAll');
      sortBtnAll.value = 'all';
      var todoList = document.createElement('div');
      todoList.classList.add('todoList');
      var titleName = document.createElement('h1');
      titleName.classList.add('title');
      titleName.innerHTML = this.title;
      var todoControllers = document.createElement('div');
      todoControllers.classList.add('controllers');
      var input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('maxlength', '110');
      input.classList.add('getTodo');
      input.setAttribute('placeholder', 'What should you do?');
      var button = document.createElement('input');
      button.setAttribute('type', 'button');
      button.classList.add('setTodo');
      button.setAttribute('value', 'ADD');
      var datePick = document.createElement('input');
      datePick.classList.add('date');
      datePick.setAttribute('disabled', '');
      datePick.setAttribute('type', 'text');
      datePick.setAttribute('value', time);
      footer.appendChild(titleName);
      todoControllers.appendChild(input);
      todoControllers.appendChild(selectCalendar);
      todoControllers.appendChild(datePick);
      todoControllers.appendChild(button);
      sortWrapper.appendChild(sortBtnBefore);
      sortWrapper.appendChild(sortBtnCurrent);
      sortWrapper.appendChild(sortBtnAfter);
      sortWrapper.appendChild(sortBtnAll);
      section.appendChild(sortWrapper);
      section.appendChild(todoList);
      wrapper.appendChild(footer);
      wrapper.appendChild(todoControllers);
      wrapper.appendChild(section);
      this.ID.appendChild(wrapper);
    }
  }, {
    key: "sortTodos",
    value: function sortTodos() {
      var todo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var type = arguments.length > 1 ? arguments[1] : undefined;
      var currentTodos = arguments.length > 2 ? arguments[2] : undefined;

      if (type != 'sortAll') {
        todo.forEach(function (element) {
          return element.classList.add('hide');
        });
        currentTodos.forEach(function (element) {
          return element.classList.toggle('hide');
        });
        return;
      }

      if (type === 'sortAll') {
        todo.forEach(function (element) {
          return element.classList[1] === 'hide' && element.classList.toggle('hide');
        });
      }
    }
  }, {
    key: "showNewTodo",
    value: function showNewTodo() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var mainList = document.querySelector('.todoList');
      var oldTodo = document.querySelectorAll('p');
      var NOW = Date.now();
      var todoList = null;
      oldTodo.length && oldTodo.forEach(function (element) {
        return element.remove();
      });

      for (var i = 0; i < value.length; i++) {
        if (value[i].save) {
          todoList = document.createElement('p');
          todoList.setAttribute('draggable', 'true');
          this.arrayJSON = JSON.parse(localStorage.date);
          todoList.dataset.date = this.arrayJSON[i];
          var dateNow = JSON.parse(localStorage.date)[i].split('.').reverse();
          dateNow[1] = dateNow[1] - 1;
          var todoDay = new Date(dateNow[0], dateNow[1], dateNow[2]).getTime();
          var today = new Date(NOW).toLocaleDateString();

          if (todoList.dataset.date === today) {
            todoList.classList.add('today');
          } else if (todoDay < NOW) {
            todoList.classList.add('unactive');
          } else if (todoDay > NOW) {
            todoList.classList.add('future');
          }

          todoList.dataset.unique = value[i].uniqueId;
          todoList.innerHTML = value[i].value;
          mainList.appendChild(todoList);
        }
      }

      localStorage.removeItem('newTime');
      localStorage.removeItem('newTodo');
    }
  }, {
    key: "showModal",
    value: function showModal() {
      var _this2 = this;

      var jsonObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'click for add note';
      var num = jsonObject.findIndex(function (element) {
        return element.uniqueId === _this2.dataset.unique;
      });
      var getList = document.getElementById('todo');
      var modalBg = document.createElement('div');
      modalBg.classList.add('background-modal');
      modalBg.classList.add('animateOpen');
      var modal = document.createElement('div');
      modal.classList.add('modal-window');
      modal.classList.add('animateOpen');
      modal.dataset.modalNum = this.dataset.unique;
      var closeBtn = document.createElement('input');
      closeBtn.setAttribute('type', 'button');
      closeBtn.setAttribute('value', 'X');
      closeBtn.classList.add('close');
      var deleteBtn = document.createElement('input');
      deleteBtn.setAttribute('type', 'button');
      deleteBtn.setAttribute('value', 'Delete todo');
      deleteBtn.classList.add('delete');
      var noteZone = document.createElement('div');
      noteZone.classList.add('textArea');
      var currentTodo = document.createElement('p');
      currentTodo.classList.add('currentTodo');
      currentTodo.innerHTML = this.innerHTML;
      var additionalNotesTitle = document.createElement('p');
      additionalNotesTitle.classList.add('addNotes__title');
      additionalNotesTitle.innerHTML = 'additional notes';
      var edditableWrapper = document.createElement('div');
      edditableWrapper.classList.add('editWrapper');
      var additionalNotes = document.createElement('p');
      additionalNotes.classList.add('addNotes');
      additionalNotes.innerHTML = jsonObject[num].note;
      var weatherList = document.createElement('ul');
      weatherList.classList.add('weatherList');
      var showTodoDate = document.createElement('p');
      showTodoDate.classList.add('modal-date');
      showTodoDate.innerHTML = this.dataset.date;
      modal.appendChild(closeBtn);
      modal.appendChild(showTodoDate);
      modal.appendChild(deleteBtn);
      noteZone.appendChild(currentTodo);
      edditableWrapper.appendChild(additionalNotesTitle);
      edditableWrapper.appendChild(additionalNotes);
      noteZone.appendChild(edditableWrapper);
      modal.appendChild(noteZone);
      modal.appendChild(weatherList);
      modalBg.appendChild(modal);
      getList.appendChild(modalBg);
      return document.querySelector('[data-modal-num]');
    }
  }, {
    key: "showWarning",
    value: function showWarning(ctx) {
      var modal = document.createElement('div');
      modal.classList.add('warning');
      var question = document.createElement('p');
      question.classList.add('question');
      question.innerHTML = 'Save changes?';
      var save = document.createElement('input');
      save.setAttribute('type', 'button');
      save.classList.add('save');
      save.value = 'save';
      var cancel = document.createElement('input');
      cancel.setAttribute('type', 'button');
      cancel.classList.add('cancel');
      cancel.value = 'cancel';
      modal.appendChild(question);
      modal.appendChild(save);
      modal.appendChild(cancel);
      ctx.appendChild(modal);
    }
  }, {
    key: "buildCalendar",
    value: function buildCalendar() {
      var dateObject = arguments.length <= 0 ? undefined : arguments[0];
      var EmptyCount = 0;
      var monthName = dateObject.monthName[dateObject.currentMonth - 1];
      var clearCalendar = document.querySelector('.calendar');
      if (clearCalendar) clearCalendar.remove();
      var calendarWrapper = document.querySelector('calendar') ? document.querySelector('calendar') : document.createElement('div');
      calendarWrapper.classList.add('calendar');
      var zeroMonth = dateObject.currentMonth < 10 ? '0' : '';
      var zeroDay = dateObject.currentDay < 10 ? '0' : '';
      calendarWrapper.dataset.current = "".concat(zeroDay + dateObject.currentDay, ".").concat(zeroMonth + dateObject.currentMonth, ".").concat(dateObject.currentYear);
      var wrapperSpan = document.createElement('div');
      wrapperSpan.classList.add('calendarControlBtns');
      var spanPrew = document.createElement('input');
      spanPrew.setAttribute('type', 'button');
      spanPrew.dataset.move = 'prew';
      spanPrew.value = '<==';
      var spanNext = document.createElement('input');
      spanNext.setAttribute('type', 'button');
      spanNext.dataset.move = 'next';
      spanNext.value = '==>';
      var spanMonthPrew = document.createElement('input');
      spanMonthPrew.setAttribute('type', 'button');
      spanMonthPrew.dataset.move = 'prewMonth';
      spanMonthPrew.value = '<=';
      var spanMonthNext = document.createElement('input');
      spanMonthNext.setAttribute('type', 'button');
      spanMonthNext.dataset.move = 'nextMonth';
      spanMonthNext.value = '=>';
      var calendarName = document.createElement('h3');
      calendarName.classList.add('calendarDate');
      calendarName.innerHTML = monthName + ' ' + dateObject.currentYear;
      var ulCalendar = document.createElement('ul');
      ulCalendar.classList.add('calendarList');
      var calendarController = document.createElement('div');
      calendarController.classList.add('calendarController');
      var controllers = document.querySelector('.controllers');

      for (var i = 0; i < dateObject.dateWeek.length; i++) {
        var dayWeek = document.createElement('li');
        dayWeek.dataset.week = dateObject.dateWeek[i];
        dayWeek.innerHTML = dateObject.dateWeek[i];
        ulCalendar.appendChild(dayWeek);
      }

      for (var _i = 1, j = 1; j <= dateObject.totalDay; _i++) {
        if (!dateObject.weekDay && !EmptyCount) {
          for (var _i2 = 0; _i2 < dateObject.dateWeek.length - 1; _i2++) {
            var dempty = document.createElement('li');
            dempty.classList.add('empty');
            ulCalendar.appendChild(dempty);
          }

          EmptyCount++;
        }

        if (dateObject.weekDay <= _i) {
          var day = document.createElement('li');
          dateObject.currentDay === j && dateObject.todayYear === dateObject.currentYear && dateObject.currentMonth === dateObject.todayMonth + 1 && day.classList.add('today');
          day.dataset.day = j;
          day.innerHTML = j;
          ulCalendar.appendChild(day);
          j++;
        } else {
          var _dempty = document.createElement('li');

          _dempty.classList.add('empty');

          ulCalendar.appendChild(_dempty);
        }
      }

      wrapperSpan.appendChild(spanPrew);
      wrapperSpan.appendChild(spanMonthPrew);
      wrapperSpan.appendChild(spanMonthNext);
      wrapperSpan.appendChild(spanNext);
      calendarController.appendChild(calendarName);
      calendarController.appendChild(wrapperSpan);
      calendarWrapper.appendChild(calendarController);
      calendarWrapper.appendChild(ulCalendar);
      controllers.appendChild(calendarWrapper);
    }
  }, {
    key: "createEditInput",
    value: function createEditInput() {
      var addNotes = document.querySelector('.addNotes');
      var textArea = document.querySelector('.textArea');
      var edditableWrapper = document.querySelector('.editWrapper');
      var inputEdit = document.createElement('textarea');
      var buttonEdit = document.createElement('input');
      addNotes.classList.add('visibility');
      inputEdit.setAttribute('maxLength', '100');
      inputEdit.classList.add('edditable');
      inputEdit.value = addNotes.innerHTML;
      buttonEdit.setAttribute('type', 'button');
      buttonEdit.classList.add('editButton');
      buttonEdit.setAttribute('value', 'Edit');
      edditableWrapper.appendChild(inputEdit);
      edditableWrapper.appendChild(buttonEdit);
      textArea.appendChild(edditableWrapper);
    }
  }], [{
    key: "checkEmpty",
    value: function checkEmpty() {
      var modal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.createElement('div');
      var weatherLists = document.querySelector('.weatherList');
      var weatherBox = document.querySelector('.weather-box');
      var checkP = document.querySelectorAll('.weather');

      if (checkP.length === 0) {
        var weatherView = document.createElement('p');
        weatherView.classList.add('weather');
        weatherView.classList.add('weatherNone');
        weatherView.innerHTML = "Weather not found";
        weatherLists.remove();
        weatherBox.remove();
        modal.appendChild(weatherView);
      }
    }
  }, {
    key: "spinnerHide",
    value: function spinnerHide() {
      var spinner = document.querySelector('.weather-box');
      spinner && spinner.remove();
    }
  }]);

  return Todo;
}(View);
"use strict";

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TodoControl =
/*#__PURE__*/
function () {
  function TodoControl(_ref) {
    var controllerEnter = _ref.controllerEnter,
        btn = _ref.btn;

    _classCallCheck(this, TodoControl);

    this.btnEnter = controllerEnter;
    this.btnAdd = btn;
  }

  _createClass(TodoControl, [{
    key: "setLsitener",
    value: function setLsitener(todoView, todoState, load, datePicker, store) {
      var _this = this;

      var parentDnD = document.getElementsByClassName('todoList')[0];

      var clickEvent = function clickEvent(e) {
        var target = e.target;
        var modalWindow = target.parentNode.parentNode;
        var modal = null;

        if (todoState.getState('main')) {
          var todos = document.querySelectorAll('[data-unique]');
          var currentTodos = null;
          target.classList[0] === 'selectCalendar' && todoView.buildCalendar(datePicker);

          if (target.dataset.move) {
            if (target.dataset.move === 'prew') {
              datePicker.parseCalendarData(-1, null, target.dataset.move);
              todoView.buildCalendar(datePicker);
            }

            if (target.dataset.move === 'next') {
              datePicker.parseCalendarData(+1, null, target.dataset.move);
              todoView.buildCalendar(datePicker);
            }

            if (target.dataset.move === 'prewMonth') {
              datePicker.parseCalendarData(null, -1, target.dataset.move);
              todoView.buildCalendar(datePicker);
            }

            if (target.dataset.move === 'nextMonth') {
              datePicker.parseCalendarData(null, +1, target.dataset.move);
              todoView.buildCalendar(datePicker);
            }
          }

          if (target.dataset.day) {
            var timerDeleteCalendar = null;
            var days = document.querySelectorAll('[data-day]');
            var dateInput = document.querySelector('.date');
            var date = modalWindow.dataset.current.split('.');
            date[0] = target.dataset.day;
            days.forEach(function (element) {
              element.classList[0] === 'selectDay' && element.classList.toggle('selectDay');
            });
            target.classList.add('selectDay');
            var zeroDay = date[0] < 10 ? '0' : '';
            date[0] = (zeroDay + date[0]).trim();
            dateInput.value = date.reverse().join().replace(/\,/g, '-');
            timerDeleteCalendar = setTimeout(function () {
              return modalWindow.remove();
            }, 300);
          }

          target.classList[1] === 'sortAfter' && (currentTodos = (_readOnlyError("currentTodos"), document.querySelectorAll('.future')));
          target.classList[1] === 'sortBefore' && (currentTodos = (_readOnlyError("currentTodos"), document.querySelectorAll('.unactive')));
          target.classList[1] === 'sortCurrent' && (currentTodos = (_readOnlyError("currentTodos"), document.querySelectorAll('.today')));
          target.classList[0] === 'sort' && todoView.sortTodos(todos, target.classList[1], currentTodos);

          if (target.classList[0] === 'setTodo' && _this.btnEnter.value) {
            store.localeStorageUpdate(_this.btnEnter.value);
            store.dataParser(target);
            todoView.showNewTodo(JSON.parse(localStorage.list));
            _this.btnEnter.value = '';
          }

          if (target.dataset.unique) {
            var jsonObject = null;
            localStorage.list && (jsonObject = JSON.parse(localStorage.list));
            modal = todoView.showModal.call(target, jsonObject);
            todoView.spinnerShow(modal, load.image[0]);
            todoState.getWeather(target, document.querySelector('.weatherList'), modal);
            todoState.setState('main', false);
            todoState.setState('modal', true);
          }
        }

        if (todoState.getState('modal')) {
          var _modal = document.querySelector('[data-modal-num]');

          var notes = document.querySelector('.addNotes');
          var timer = null;
          var parent = target.parentNode;
          var item = JSON.parse(localStorage.list);
          var index = item.findIndex(function (item) {
            return _modal.dataset.modalNum === item.uniqueId;
          });

          if (target.classList[0] === 'addNotes') {
            todoView.createEditInput();
            item[index].changeNote = true;
            localStorage.list = JSON.stringify(item);
          }

          if (target.classList[0] === 'editButton') {
            notes.innerHTML = target.previousSibling.value;
            item[index].note = target.previousSibling.value;
            localStorage.list = JSON.stringify(item);
            notes.classList.toggle('visibility');
            target.previousSibling.remove();
            target.remove();
          }

          if (target.classList[0] === 'close' || target.classList[0] === 'background-modal') {
            _modal = _modal.parentNode;

            if (item[index].changeNote) {
              todoView.showWarning(_modal);
            } else {
              todoState.setState('main', true);
              todoState.setState('modal', false);

              _modal.classList.toggle('animateOpen');

              _modal.classList.add('animateHide');

              timer = setTimeout(function () {
                _modal.style.display = 'none';

                _modal.remove();
              }, 400);
            }
          }

          if (target.classList[0] === 'save') {
            todoState.setState('main', true);
            todoState.setState('modal', false);
            target.parentNode.remove();

            _modal.classList.toggle('animateOpen');

            _modal.classList.add('animateHide');

            item.forEach(function (item) {
              return item.changeNote && (item.changeNote = false);
            });
            localStorage.list = JSON.stringify(item);
            timer = setTimeout(function () {
              _modal.style.display = 'none';

              _modal.parentNode.remove();

              _modal.remove();
            }, 400);
          } else if (target.classList[0] === 'cancel') target.parentNode.remove();

          if (target.classList[0] === 'delete') {
            var todoDelete = document.querySelector("[data-unique=\"".concat(parent.dataset.modalNum, "\"]"));
            var numDelete = todoDelete.dataset.unique;
            var splits = JSON.parse(localStorage.list);

            var _date = JSON.parse(localStorage.date);

            var counter = splits.findIndex(function (element) {
              return element.uniqueId === numDelete;
            });

            _date.splice(counter, 1);

            localStorage.date = JSON.stringify(_date);
            var filter = splits.filter(function (v) {
              return v.uniqueId === numDelete;
            });
            store.updateStorage(JSON.parse(localStorage.list), filter[0].uniqueId);
            todoDelete.remove();
            /* Switch state */

            todoState.setState('main', true);
            todoState.setState('modal', false);
            modalWindow.remove();
          }

          var _todos = document.querySelectorAll('[data-date]');

          _todos.forEach(function (element, i) {
            return element.dataset.num = i;
          });
        }
      };
      /* -----------Modernizr----------- */


      console.log('touchevents detected:' + Modernizr.touchevents);
      Modernizr.touchevents && document.addEventListener('touchend', clickEvent, false);
      !Modernizr.touchevents && document.addEventListener('click', clickEvent, false);
      document.addEventListener('keydown', function (e) {
        e.target.classList[0] === 'date' && e.preventDefault();
      }, false);
      /* -----------DnD----------- */

      var drag = null;
      document.addEventListener('dragstart', function (e) {
        drag = e.target;
      });
      parentDnD.addEventListener('dragover', function (e) {
        e.preventDefault();
        var target = e.target;
        var bounding = target.getBoundingClientRect();
        var offset = bounding.y + bounding.height / 2;

        if (target.classList[0] != 'todoList') {
          if (e.clientY - offset > 0) {
            target.style['border-bottom'] = 'solid 4px red';
            target.style['border-top'] = '';
          }
        }
      });
      parentDnD.addEventListener('dragleave', function (e) {
        e.preventDefault();
        e.target.style['border-bottom'] = '';
        e.target.style['border-top'] = '';
      });
      parentDnD.addEventListener('drop', function (e) {
        var target = e.target;
        var swapeDate = JSON.parse(localStorage.date);
        var swapeList = JSON.parse(localStorage.list);

        if (target.style['border-bottom'] !== '') {
          target.style['border-bottom'] = '';
          var dragID = drag.dataset.unique;
          var targetID = target.dataset.unique;
          var targetNum = swapeList.findIndex(function (element) {
            return element.uniqueId === targetID;
          });
          var dragNum = swapeList.findIndex(function (element) {
            return element.uniqueId === dragID;
          });

          if (dragNum < targetNum) {
            swapeDate.splice(targetNum, 0, swapeDate.splice(targetNum, 1, swapeDate[dragNum])[0]);
            swapeDate.splice(dragNum, 1);
            swapeList.splice(targetNum, 0, swapeList.splice(targetNum, 1, swapeList[dragNum])[0]);
            swapeList.splice(dragNum, 1);
            this.insertBefore(drag, target.nextSibling);
          } else {
            swapeDate.splice(targetNum, 0, swapeDate.splice(targetNum, 1, swapeDate[dragNum])[0]);
            swapeDate.splice(dragNum + 1, 1);
            swapeList.splice(targetNum, 0, swapeList.splice(targetNum, 1, swapeList[dragNum])[0]);
            swapeList.splice(dragNum + 1, 1);
            this.insertBefore(drag, target.nextSibling);
          }

          var todos = document.querySelectorAll('[data-date]');
          todos.forEach(function (element, i) {
            return element.dataset.num = i;
          });
          localStorage.date = JSON.stringify(swapeDate);
          localStorage.list = JSON.stringify(swapeList);
        } else target.style['border-top'] = '';
      });
      /* ----on window load---- */

      window.addEventListener('DOMContentLoaded', function () {
        if (!localStorage.list) return;
        var item = JSON.parse(localStorage.list);
        item.forEach(function (item) {
          return item.changeNote && (item.changeNote = false);
        });
        localStorage.list = JSON.stringify(item);
        todoView.showNewTodo(item);
      }, false);
    }
  }]);

  return TodoControl;
}();
"use strict";

var todoApp = function () {
  function main() {
    var settingsTodo = {
      appID: document.getElementById('todo'),
      title: 'Todo-list'
    };
    var load = new Loader();
    var time = new Date().toLocaleDateString().split('.').reverse().join().replace(/\,/g, '-');
    load.loading('image', '../img/spinner.gif', 'smallSpinner');
    var todoState = new ListModal();
    var store = new Storage();
    todoState.getCoords();
    todoState.setState('main', true);
    var todoView = new Todo(settingsTodo);
    todoView.build(time);
    var datePicker = new Calendar();
    datePicker.parseCalendarData();
    var controllerSettings = {
      controllerEnter: document.querySelector('.getTodo'),
      btn: document.querySelector('.setTodo')
    };
    var controller = new TodoControl(controllerSettings);
    controller.setLsitener(todoView, todoState, load, datePicker, store);
  }

  return {
    init: main
  };
}();

todoApp.init();
//# sourceMappingURL=app.js.map
