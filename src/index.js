var toArray = function(args) {
  if (!args.length) return []
  return Array.isArray(args[0]) ? args[0] : Array.prototype.slice.call(args)
}

module.exports.requestAjax = function (options) {
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
