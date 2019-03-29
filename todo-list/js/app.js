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

var ListModal = function ListModal(num, string) {
  _classCallCheck(this, ListModal);

  this.number = num;
  this.todo = string;
};

var Storage =
/*#__PURE__*/
function (_ListModal) {
  _inherits(Storage, _ListModal);

  function Storage() {
    var _this;

    _classCallCheck(this, Storage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Storage).call(this));
    _this.todoStorage = [];
    _this.arrayList = [];
    _this.timersN = -1;
    return _this;
  }

  _createClass(Storage, [{
    key: "store",
    value: function store(todo) {
      todo.value && this.arrayList.push(todo.value);
      localStorage.list = this.arrayList.join();
      localStorage.newTodo && localStorage.removeItem('newTodo');
    }
  }, {
    key: "updateStorage",
    value: function updateStorage(list, list2, num) {
      var nums = parseInt(num);

      if (list.some(function (e, i, v) {
        return e.timer === nums;
      })) {
        var newList = list.filter(function (v) {
          return v.timer != nums;
        });
        var newList2 = list2.filter(function (v) {
          return parseInt(v.timer) != nums;
        });
        list.forEach(function (element) {
          element.timer--;
        });
        list2.forEach(function (element) {
          element.timer--;
        });
        localStorage.list = JSON.stringify(newList);
        localStorage.ar = JSON.stringify(newList2);
      }
    }
  }]);

  return Storage;
}(ListModal);

var todoOne =
/*#__PURE__*/
function () {
  function todoOne(timerN, value) {
    _classCallCheck(this, todoOne);

    this.value = value;
    this.timer = timerN;
    this.ac = null;
    this.today = null;
    this.todaySec = null;
    this.todayMins = null;
    this.todayHours = null;
  }

  _createClass(todoOne, [{
    key: "startTimer",
    value: function startTimer(num) {
      var _that = this;

      var display = document.createElement('span');
      display.classList.add('timer');
      display.dataset.timer = num;
      var here = document.querySelector('.todoList');
      here.appendChild(display);
      setInterval(function () {
        if (num >= 1) {}

        ; // let minutes = parseInt(timer / 60, 10)
        // let seconds = timer;

        var ab = Date.now();
        var disp = document.querySelector("[data-timer = \"".concat(num, "\"]"));
        _that.ac = new Date(localStorage.newDate.split('.').reverse().join().replace(/\./g, ',')).getTime();
        _that.today = Math.floor((_that.ac - ab) / 1000.0); // разница между текущей датой и др и переводим в секунды

        _that.todaySec = _that.today % 60; // Секунды

        _that.today = Math.floor(_that.today / 60); // перевод в минуты

        _that.todayMins = _that.today % 60; // Минуты

        _that.today = Math.floor(_that.today / 60); // перевод в часы

        _that.todayHours = _that.today % 24; // Часы

        _that.today = Math.floor(_that.today / 24); //  перевод в дни

        disp.innerHTML = "".concat(_that.today, " days ").concat(_that.todayHours, " h ").concat(_that.todayMins, " m ").concat(_that.todaySec, " s"); // if (--timer < 0) {
        //     timer = duration;
        // }
      }, 1000);
    }
  }]);

  return todoOne;
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
    _this.prewDate = [];
    _this.prewTime = [];
    _this.arrayTodo = [];
    return _this;
  }

  _createClass(Todo, [{
    key: "build",
    value: function build() {
      var time = new Date().toLocaleDateString().split('.').reverse().join().replace(/\,/g, '-');
      var wrapper = document.createElement('div');
      wrapper.classList.add('wrapper');
      var footer = document.createElement('div');
      footer.classList.add('footer');
      var section = document.createElement('div');
      section.classList.add('section');
      var todoList = document.createElement('div');
      todoList.classList.add('todoList');
      var titleName = document.createElement('h1');
      titleName.classList.add('title');
      titleName.innerHTML = this.title;
      var titleTodoList = document.createElement('h3');
      titleTodoList.classList.add('todoList__title');
      titleTodoList.innerHTML = 'list'.toLocaleUpperCase();
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
      datePick.setAttribute('type', 'datetime-local');
      datePick.setAttribute('value', time + "T".concat(new Date().toLocaleTimeString()));
      footer.appendChild(titleName);
      todoControllers.appendChild(input);
      todoControllers.appendChild(datePick);
      todoControllers.appendChild(button);
      todoList.appendChild(titleTodoList);
      section.appendChild(todoList);
      wrapper.appendChild(footer);
      wrapper.appendChild(todoControllers);
      wrapper.appendChild(section);
      this.ID.appendChild(wrapper);
    }
  }, {
    key: "showNewTodo",
    value: function showNewTodo(fullList, value, ir) {
      fullList === undefined && this.arrayTodo.push(value[ir]);
      fullList != undefined && (this.arrayTodo = fullList);
      var here = document.querySelector('.todoList');
      var oldTodo = document.querySelectorAll('p');
      var todoList;
      var dateAdd;

      if (oldTodo.length) {
        oldTodo.forEach(function (element) {
          element.remove();
        });
        ;
      }

      for (var i = 0; i < this.arrayTodo.length; i++) {
        todoList = document.createElement('p');
        dateAdd = document.createElement('p');
        dateAdd.classList.add('dateAdd');
        dateAdd.innerHTML = 'Last add: ' + localStorage.timeAdd;
        todoList.setAttribute('draggable', 'true');

        if (this.arrayTodo.length - 1 === i && localStorage.newDate) {
          this.prewDate.push(localStorage.newDate);
          this.prewTime.push(localStorage.newTime);
          todoList.dataset.date = this.prewDate[i];
          todoList.dataset.time = this.prewTime[i];
          localStorage.prewDate = JSON.stringify(this.prewDate);
          localStorage.prewTime = JSON.stringify(this.prewTime);
        } else if (localStorage.prewDate && localStorage.prewTime) {
          todoList.dataset.date = JSON.parse(localStorage.prewDate)[i];
          todoList.dataset.time = JSON.parse(localStorage.prewTime)[i];
        }

        todoList.dataset.num = i;
        todoList.innerHTML = this.arrayTodo[i].value;
        here.appendChild(todoList);
      }

      localStorage.removeItem('newTime');
      here.insertBefore(dateAdd, here.children[1]);
    }
  }]);

  return Todo;
}(View);
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var TodoControl =
/*#__PURE__*/
function (_Storage) {
  _inherits(TodoControl, _Storage);

  function TodoControl(_ref) {
    var _this;

    var controllerEnter = _ref.controllerEnter,
        btn = _ref.btn;

    _classCallCheck(this, TodoControl);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TodoControl).call(this));
    _this.btnEnter = controllerEnter;
    _this.btnAdd = btn;
    _this.ar = [];
    return _this;
  }

  _createClass(TodoControl, [{
    key: "setLsitener",
    value: function setLsitener(todoView) {
      var _this2 = this;

      var clickEvent = function clickEvent(e) {
        if (e.target.classList[0] === 'setTodo' && _this2.btnEnter.value) {
          var number;
          !localStorage.timersN && (localStorage.timersN = -1);
          localStorage.timersN && (localStorage.timersN = ++localStorage.timersN);
          number = localStorage.timersN ? parseInt(localStorage.timersN) : 0;
          localStorage.setItem('newTodo', _this2.btnEnter.value);
          var todo = new todoOne(number, localStorage.newTodo);
          localStorage.ar && (_this2.ar = JSON.parse(localStorage.ar));

          _this2.ar.push(todo);

          localStorage.ar = JSON.stringify(_this2.ar);
          !localStorage.ar && (localStorage.list = JSON.stringify(_this2.ar));
          localStorage.ar && (localStorage.list = JSON.stringify(JSON.parse(localStorage.ar))); // this.store(todo);

          localStorage.setItem('timeAdd', new Date().toLocaleString()); // (!(localStorage.newDate)) &&
          // (localStorage.setItem('newDate', JSON.stringify([e.target.previousSibling.value.slice(0,10).split('-').reverse().join().replace(/\,/g,'.')])));
          // localStorage.setItem('newTime', e.target.previousSibling.value.slice(11));
          // (localStorage.newDate) && (this.dateArray.push(localStorage.newDate));
          // (localStorage.newDate) && (localStorage.newDate = this.dateArray);

          todoView.showNewTodo(undefined, JSON.parse(localStorage.list), number); // todo.startTimer(todo.timer);

          _this2.btnEnter.value = '';
        }

        if (e.target.dataset.num) {
          var splits = JSON.parse(localStorage.list);
          var currentTodo = null;

          if (splits.some(function (item) {
            return item.value === e.target.innerHTML;
          })) {
            var filter = splits.filter(function (v, i, a) {
              return v.value === e.target.innerHTML;
            });
            currentTodo = document.querySelectorAll('[data-num]');

            _this2.updateStorage(JSON.parse(localStorage.list), JSON.parse(localStorage.ar), filter[0].timer);

            e.target.remove();
            localStorage.timersN = --localStorage.timersN;
          }
        }
      };

      document.addEventListener('click', clickEvent, false);
      document.addEventListener('touchend', clickEvent, false);
      window.addEventListener('DOMContentLoaded', function () {
        localStorage.list && todoView.showNewTodo(JSON.parse(localStorage.list));
      }, false);
    }
  }]);

  return TodoControl;
}(_wrapNativeSuper(Storage));
"use strict";

var todoApp = function () {
  function main() {
    var settingsTodo = {
      appID: document.getElementById('todo'),
      title: 'Todo-list'
    };
    var storageData = new Storage();
    var todoView = new Todo(settingsTodo);
    todoView.build();
    var controllerSettings = {
      controllerEnter: document.querySelector('.getTodo'),
      btn: document.querySelector('.setTodo')
    };
    var controller = new TodoControl(controllerSettings);
    controller.setLsitener(todoView);
  }

  return {
    init: main
  };
}();

todoApp.init();
//# sourceMappingURL=app.js.map
