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
  this.states = {
    main: true,
    modal: true
  };
};

var Storage =
/*#__PURE__*/
function (_ListModal) {
  _inherits(Storage, _ListModal);

  function Storage() {
    var _this;

    _classCallCheck(this, Storage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Storage).call(this));
    _this.arrayList = [];
    _this.lists = [];
    _this.dateArray = [];
    _this.buffer = {};
    _this.timersN = -1;
    _this.number = 0;
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
    value: function updateStorage(list, num) {
      var nums = parseInt(num);
      var newList = list.filter(function (v) {
        return v.timer != nums;
      });
      localStorage.list = JSON.stringify(newList);
      return true;
    }
  }, {
    key: "localeStorageUpdate",
    value: function localeStorageUpdate() {
      !localStorage.timersN && (localStorage.timersN = -1);
      localStorage.timersN && (localStorage.timersN = ++localStorage.timersN);
      this.number = localStorage.timersN ? parseInt(localStorage.timersN) : -1;
      localStorage.setItem('newTodo', this.btnEnter.value);
      var todo = new todoOne(this.number, localStorage.newTodo);
      localStorage.list && (this.lists = JSON.parse(localStorage.list));
      this.lists.push(todo);
      localStorage.list = JSON.stringify(this.lists);
      return this.number;
    }
  }, {
    key: "dataParser",
    value: function dataParser(target) {
      localStorage.date && (this.buffer = JSON.parse(localStorage.date));
      var valueButton = target.previousSibling.value.slice(0, 10).split('-').reverse().join().replace(/\,/g, '.');
      !localStorage.date && (localStorage.date = JSON.stringify([valueButton]));
      localStorage.date && this.buffer.push(valueButton);
      localStorage.date && (localStorage.date = JSON.stringify(this.buffer));
    }
  }]);

  return Storage;
}(ListModal);

var todoOne =
/*#__PURE__*/
function (_ListModal2) {
  _inherits(todoOne, _ListModal2);

  function todoOne(timerN, value) {
    var _this2;

    _classCallCheck(this, todoOne);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(todoOne).call(this));
    _this2.value = value;
    _this2.timer = timerN;
    _this2.save = false;
    return _this2;
  }

  return todoOne;
}(ListModal);
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
    _this.arrayJSON = [];
    _this.saveP = [];
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
      titleName.innerHTML = this.title; // let titleTodoList = document.createElement('h3');
      // titleTodoList.classList.add('todoList__title');
      // titleTodoList.innerHTML = 'list'.toLocaleUpperCase();
      // let todoWrapperTitlte = document.createElement('div');
      // todoWrapperTitlte.classList.add('title');

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
      todoControllers.appendChild(button); // todoWrapperTitlte.appendChild(titleTodoList);
      // todoList.appendChild(todoWrapperTitlte);

      section.appendChild(todoList);
      wrapper.appendChild(footer);
      wrapper.appendChild(todoControllers);
      wrapper.appendChild(section);
      this.ID.appendChild(wrapper);
    }
  }, {
    key: "showNewTodo",
    value: function showNewTodo(value) {
      var _this2 = this;

      var here = document.querySelector('.todoList');
      var oldTodo = document.querySelectorAll('p');
      var todoList;
      var dateAdd;
      this.saveP = [];

      if (oldTodo.length) {
        oldTodo.forEach(function (element, i) {
          if (element.classList[0] === 'unactive') {
            value[i].save = true;

            _this2.saveP.push(oldTodo[i]);
          }

          element.remove();
        });
        ;
      }

      for (var i = 0; i < value.length; i++) {
        if (value[i].save && this.saveP[i] && this.saveP[i].classList[0] === 'unactive') {
          todoList = this.saveP[i];
        } else {
          todoList = document.createElement('p');

          if (value[i].save) {
            todoList.classList.add('unactive');
          }
        }

        todoList.setAttribute('draggable', 'true');

        if (localStorage.date) {
          this.arrayJSON = JSON.parse(localStorage.date);
          todoList.dataset.date = this.arrayJSON[i];
          var dateNow = JSON.parse(localStorage.date)[i];
          var todoDay = new Date(dateNow.split('.').reverse().join().replace(/\./g, ',')).getTime();

          if (todoDay < Date.now()) {
            todoList.classList.add('unactive');
          }
        } else if (localStorage.prewDate && localStorage.prewTime) {
          todoList.dataset.date = JSON.parse(localStorage.prewDate)[i];
          todoList.dataset.time = JSON.parse(localStorage.prewTime)[i];
        }

        todoList.dataset.num = i;
        todoList.innerHTML = value[i].value;
        here.appendChild(todoList);
      }

      localStorage.removeItem('newTime');
      localStorage.removeItem('newTodo');
      dateAdd && here.insertBefore(dateAdd, here.children[1]);
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
    return _this;
  }

  _createClass(TodoControl, [{
    key: "setLsitener",
    value: function setLsitener(todoView) {
      var _this2 = this;

      var parentDnD = document.getElementsByClassName('todoList')[0];

      var clickEvent = function clickEvent(e) {
        if (e.target.classList[0] === 'setTodo' && _this2.btnEnter.value) {
          _this2.buffer = [];
          _this2.number = _this2.localeStorageUpdate();

          _this2.dataParser(e.target);

          todoView.showNewTodo(JSON.parse(localStorage.list));
          _this2.btnEnter.value = '';
        }

        if (e.target.dataset.num) {
          var splits = JSON.parse(localStorage.list);
          var date = JSON.parse(localStorage.date);

          var count = function count() {
            splits.forEach(function (element, i) {
              if (element.timer === parseInt(e.target.dataset.num)) return i;
            });
          };

          date.splice(count(), 1);
          localStorage.date = JSON.stringify(date);

          if (splits.some(function (item) {
            return item.value === e.target.innerHTML;
          })) {
            var filter = splits.filter(function (v) {
              return v.value === e.target.innerHTML;
            });

            _this2.updateStorage(JSON.parse(localStorage.list), filter[0].timer);

            e.target.remove();
            localStorage.timersN = --localStorage.timersN;
          }
        }
      };

      document.addEventListener('click', clickEvent, false);
      document.addEventListener('touchend', clickEvent, false);
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
            target.style['border-bottom'] = 'solid 4px blue';
            target.style['border-top'] = '';
          } else {
            target.style['border-top'] = 'solid 4px blue';
            target.style['border-bottom'] = '';
          }
        }
      });
      parentDnD.addEventListener('dragleave', function (e) {
        e.preventDefault();
        console.log('dragleave...');
      });
      parentDnD.addEventListener('dragleave', function (e) {
        e.target.style['border-bottom'] = '';
        e.target.style['border-top'] = '';
      });
      parentDnD.addEventListener('drop', function (e) {
        var target = e.target;

        if (target.style['border-bottom'] !== '') {
          target.style['border-bottom'] = '';
          this.insertBefore(drag, target.nextSibling);
        } else {
          target.style['border-top'] = '';
          this.insertBefore(drag, target);
        } // this.insertBefore(target,target.previousSibling);

      });
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
