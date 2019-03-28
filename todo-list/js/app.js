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
    _classCallCheck(this, Todo);

    return _possibleConstructorReturn(this, _getPrototypeOf(Todo).call(this, settingsTodo));
  }

  _createClass(Todo, [{
    key: "build",
    value: function build() {
      var wrapper = document.createElement('div');
      wrapper.classList.add('wrapper');
      var footer = document.createElement('div');
      footer.classList.add('footer');
      var section = document.createElement('div');
      section.classList.add('section');
      var titleName = document.createElement('h1');
      titleName.classList.add('title');
      titleName.innerHTML = this.title;
      var todoControllers = document.createElement('div');
      todoControllers.classList.add('controllers');
      var input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.classList.add('getTodo');
      input.setAttribute('placeholder', 'What should you do today?');
      var button = document.createElement('input');
      button.setAttribute('type', 'button');
      button.classList.add('setTodo');
      button.setAttribute('value', 'ADD');
      footer.appendChild(titleName);
      todoControllers.appendChild(input);
      todoControllers.appendChild(button);
      wrapper.appendChild(footer);
      wrapper.appendChild(todoControllers);
      wrapper.appendChild(section);
      this.ID.appendChild(wrapper);
    }
  }]);

  return Todo;
}(View);

(function () {
  var settingsTodo = {
    appID: document.getElementById('todo'),
    title: 'Todo-list'
  };
  var todoView = new Todo(settingsTodo);
  todoView.build();
})();
//# sourceMappingURL=app.js.map
