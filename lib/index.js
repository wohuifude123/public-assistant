"use strict";

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toArray = function toArray(args) {
  if (!args.length) return [];
  return Array.isArray(args[0]) ? args[0] : Array.prototype.slice.call(args);
};

var requestAjax = function requestAjax(options) {
  var _this = this;

  var url = options.url;
  var data = options.data;
  var method = options.method;
  return new _promise2.default(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.onreadystatechange = function () {
      var xhrThis = _this;
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(new Error(xhr.statusText));
      }
    };
    if (method === "post") {
      xhr.responseType = "json";
      xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
      xhr.send((0, _stringify2.default)(data));
    }
  });
};

var newLocStorage = {
  setStorage: function setStorage(name, data) {
    var dataType = typeof data === "undefined" ? "undefined" : (0, _typeof3.default)(data);

    if (dataType === 'object') {
      window.localStorage.setItem(name, (0, _stringify2.default)(data));
    } else if (['number', 'string', 'boolean'].indexOf(dataType) >= 0) {
        window.localStorage.setItem(name, data);
      } else {
          console.log('该类型不能用于本地存储');
        }
  },

  getStorage: function getStorage(name) {
    var data = window.localStorage.getItem(name);
    if (data) {
      return JSON.parse(data);
    } else {
      return '';
    }
  },

  removeStorage: function removeStorage(name) {
    window.localStorage.removeItem(name);
  }
};

function listenEventStorage(evenName) {
  var signSetItem = localStorage.setItem;
  localStorage.setItem = function (key, val) {
    var setEvent = new Event(evenName);
    setEvent.key = key;
    setEvent.newValue = val;
    window.dispatchEvent(setEvent);
    signSetItem.apply(this, arguments);
  };
}

function defaultOptions() {
  console.log('默认');
}

module.exports = {
  requestAjax: requestAjax,
  newLocStorage: newLocStorage,
  listenEventStorage: listenEventStorage
};
module.exports.defaults = newLocStorage;