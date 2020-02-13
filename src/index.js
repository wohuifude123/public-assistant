var toArray = function(args) {
  if (!args.length) return []
  return Array.isArray(args[0]) ? args[0] : Array.prototype.slice.call(args)
}

var requestAjax = function (options) {
  let url = options.url;
  var data = options.data;
  var method = options.method;
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.onreadystatechange = () => {
      var xhrThis = this;
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(new Error(xhr.statusText));
      }
    };
    if (method === "post") {
      xhr.responseType = "json";
      xhr.setRequestHeader(
        "Content-Type",
        "application/json;charset=utf-8"
      );
      xhr.send(JSON.stringify(data));
    }
  })
}

//utils/storage.js
var newLocStorage = {
  // 本地存储
  setStorage: (name, data) => {
    var dataType = typeof data;
    // json对象
    if (dataType === 'object') {
      window.localStorage.setItem(name, JSON.stringify(data));
    }
    // 基础类型
    else if (['number', 'string', 'boolean'].indexOf(dataType) >= 0) {
      window.localStorage.setItem(name, data);
    }
    // 其他不支持的类型
    else {
      console.log('该类型不能用于本地存储');
    }
  },
  // 取出本地存储内容
  getStorage: (name) => {
    var data = window.localStorage.getItem(name);
    if (data) {
      return JSON.parse(data);
    }
    else {
      return '';
    }
  },
  // 删除本地存储
  removeStorage: (name) => {
    window.localStorage.removeItem(name);
  }
}

// 重写setItem事件，当使用setItem的时候，触发，window.dispatchEvent派发事件
function listenEventStorage (evenName) {
  const signSetItem = localStorage.setItem
  localStorage.setItem = function (key, val) {
    var setEvent = new Event(evenName)
    setEvent.key = key;
    setEvent.newValue = val;
    window.dispatchEvent(setEvent);
    signSetItem.apply(this, arguments);
  }
}

function defaultOptions() {
  console.log('默认');
}

module.exports = { //在es6中当 key和value 一样的时候可以只写一个，为了更清晰我就不简写了
  requestAjax,
  newLocStorage,
  listenEventStorage
};
module.exports.defaults = newLocStorage;

