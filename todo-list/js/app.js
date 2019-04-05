"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ListModal =
/*#__PURE__*/
function () {
  function ListModal() {
    _classCallCheck(this, ListModal);

    this.states = {
      main: function main() {
        return false;
      },
      modal: function modal() {
        return false;
      }
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
    this.buffer = {};
    this.number = 0;
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
      var newList = list.filter(function (v) {
        return v.uniqueId != num;
      });
      localStorage.list = JSON.stringify(newList);
      return true;
    }
  }, {
    key: "localeStorageUpdate",
    value: function localeStorageUpdate() {
      localStorage.setItem('newTodo', this.btnEnter.value);
      var todo = new todoOne(localStorage.newTodo);
      todo.save = true;
      localStorage.list && (this.lists = JSON.parse(localStorage.list));
      this.lists.push(todo);
      localStorage.list = JSON.stringify(this.lists, null, '\t');
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
}();

var todoOne =
/*#__PURE__*/
function (_ListModal) {
  _inherits(todoOne, _ListModal);

  function todoOne(value) {
    var _this2;

    _classCallCheck(this, todoOne);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(todoOne).call(this));
    _this2.value = value;
    _this2.save = false;
    _this2.uniqueId = "id".concat(Math.floor((Math.random() + 5 - 5).toFixed(7) * 10000000));
    _this2.note = 'click for add note';
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
    key: "spinnerShow",
    value: function spinnerShow(modal, load) {
      var weatherBox = document.querySelector('.weather-box');

      if (!weatherBox) {
        weatherBox = document.createElement('div');
        weatherBox.classList.add('weather-box');
      }

      ;
      load.classList.add('center');
      modal.appendChild(weatherBox);
      weatherBox.appendChild(load);
      return weatherBox;
    }
  }, {
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
      datePick.setAttribute('type', 'date');
      datePick.setAttribute('value', time);
      footer.appendChild(titleName);
      todoControllers.appendChild(input);
      todoControllers.appendChild(datePick);
      todoControllers.appendChild(button);
      section.appendChild(todoList);
      wrapper.appendChild(footer);
      wrapper.appendChild(todoControllers);
      wrapper.appendChild(section);
      this.ID.appendChild(wrapper);
    }
  }, {
    key: "showNewTodo",
    value: function showNewTodo(value) {
      var here = document.querySelector('.todoList');
      var oldTodo = document.querySelectorAll('p');
      var todoList;
      var NOW = Date.now();

      if (oldTodo.length) {
        oldTodo.forEach(function (element, i) {
          element.remove();
        });
        ;
      }

      for (var i = 0; i < value.length; i++) {
        if (value[i].save) {
          todoList = document.createElement('p');
          todoList.setAttribute('draggable', 'true');

          if (localStorage.date) {
            this.arrayJSON = JSON.parse(localStorage.date);
            todoList.dataset.date = this.arrayJSON[i];
            var dateNow = JSON.parse(localStorage.date)[i];

            var _todoDay = new Date(dateNow.split('.').reverse().join().replace(/\./g, ',')).getTime();

            var _today = new Date(NOW).toLocaleDateString();

            todoList.dataset.date === _today && todoList.classList.add('today');
            _todoDay < NOW && todoList.classList.add('unactive');
          } else if (localStorage.prewDate && localStorage.prewTime) {
            todoList.dataset.date = JSON.parse(localStorage.prewDate)[i];
            todoList.dataset.time = JSON.parse(localStorage.prewTime)[i];
            todoList.dataset.date === today && todoList.classList.add('today');
            todoDay < today && todoList.classList.add('unactive');
          }

          todoList.dataset.unique = value[i].uniqueId;
          todoList.innerHTML = value[i].value;
          here.appendChild(todoList);
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
      var modal = document.createElement('div');
      modal.classList.add('modal-window');
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
    }
  }, {
    key: "createEditInput",
    value: function createEditInput(target) {
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
    value: function checkEmpty(modal) {
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
    value: function setLsitener(todoView, todoState, load) {
      var _this2 = this;

      var parentDnD = document.getElementsByClassName('todoList')[0];

      var clickEvent = function clickEvent(e) {
        var target = e.target;
        var modalWindow = target.parentNode.parentNode;
        var modal = null;

        if (todoState.getState('main')) {
          if (target.classList[0] === 'setTodo' && _this2.btnEnter.value) {
            _this2.buffer = [];

            _this2.localeStorageUpdate();

            _this2.dataParser(target);

            todoView.showNewTodo(JSON.parse(localStorage.list));
            _this2.btnEnter.value = '';
          }

          if (target.dataset.unique) {
            var jsonObject = null;
            localStorage.list && (jsonObject = JSON.parse(localStorage.list));
            todoView.showModal.call(target, jsonObject);
            modal = document.querySelector('[data-modal-num]');
            todoView.spinnerShow(modal, load.image[0]);
            var weatherList = document.querySelector('.weatherList');
            todoState.getWeather(target, weatherList, modal);
            todoState.setState('main', false);
            todoState.setState('modal', true);
          }
        }

        if (todoState.getState('modal')) {
          target.classList[0] === 'addNotes' && todoView.createEditInput(target);

          if (target.classList[0] === 'editButton') {
            var _modal = document.querySelector('[data-modal-num]');

            var notes = document.querySelector('.addNotes');
            var item = JSON.parse(localStorage.list);
            var index = item.findIndex(function (item) {
              return _modal.dataset.modalNum === item.uniqueId;
            });
            notes.innerHTML = target.previousSibling.value;
            item[index].note = target.previousSibling.value;
            localStorage.list = JSON.stringify(item);
            notes.classList.toggle('visibility');
            target.previousSibling.remove();
            target.remove();
          }

          if (target.classList[0] === 'close' || target.classList[0] === 'background-modal') {
            todoState.setState('main', true);
            todoState.setState('modal', false);
          }

          target.classList[0] === 'close' && modalWindow.remove();
          target.classList[0] === 'background-modal' && target.remove();

          if (target.classList[0] === 'delete') {
            var parent = target.parentNode;
            var todoDelete = document.querySelector("[data-unique=\"".concat(parent.dataset.modalNum, "\"]"));
            var numDelete = todoDelete.dataset.unique;
            var splits = JSON.parse(localStorage.list);
            var date = JSON.parse(localStorage.date);
            var counter = splits.findIndex(function (element) {
              return element.uniqueId === numDelete;
            });
            date.splice(counter, 1);
            localStorage.date = JSON.stringify(date);
            var filter = splits.filter(function (v) {
              return v.uniqueId === numDelete;
            });

            _this2.updateStorage(JSON.parse(localStorage.list), filter[0].uniqueId);

            todoDelete.remove();
            todoState.setState('main', true);
            todoState.setState('modal', false);
            modalWindow.remove();
          }

          var todos = document.querySelectorAll('[data-date]');
          todos.forEach(function (element, i) {
            return element.dataset.num = i;
          });
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
    var load = new Loader();
    load.loading('image', '../img/spinner.gif', 'smallSpinner');
    var todoState = new ListModal();
    todoState.getCoords();
    todoState.setState('main', true);
    var storageData = new Storage();
    var todoView = new Todo(settingsTodo);
    todoView.build();
    var controllerSettings = {
      controllerEnter: document.querySelector('.getTodo'),
      btn: document.querySelector('.setTodo')
    };
    var controller = new TodoControl(controllerSettings);
    controller.setLsitener(todoView, todoState, load);
  }

  return {
    init: main
  };
}();

todoApp.init();
//# sourceMappingURL=app.js.map
