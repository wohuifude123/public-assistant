var toArray = function(args) {
  if (!args.length) return []
  return Array.isArray(args[0]) ? args[0] : Array.prototype.slice.call(args)
}

requestAjax = function (options) {
  let url = options.url;
  let data = options.data;
  let method = options.method;
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.onreadystatechange = () => {
      let xhrThis = this;
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
    let dataType = typeof data;
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
    let data = window.localStorage.getItem(name);
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

function defaultOptions() {
  console.log('默认');
}

module.exports = { //在es6中当 key和value 一样的时候可以只写一个，为了更清晰我就不简写了
  requestAjax,
  newLocStorage
};
module.exports.defaults = newLocStorage;
