# 第三方工具类

> Author: 刘建


## 需要条件

确保package.json文件内有以下安装包

```
{
	"devDependencies": {
		"@babel/cli": "^7.4.4",
		"@babel/core": "^7.4.4",
		"@babel/plugin-transform-runtime": "^7.4.4",
		"@babel/preset-env": "^7.4.4",
		"@babel/runtime": "^7.4.4"
	}
}
```

## 使用方法

### 请求接口

```
let requestParams = {
	url: 'http://127.0.0.1:8021/abbott/list',
	data: {
		appid: "cmp",
		token: 0,
		data: {
			roadbookId: roadbookId,
        	roadbookCode: "RB000133"
       }
	},
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	},
    method: "post"
};

let ajaxPromise = _this.$ASSISTANT.requestAjax(requestParams);
ajaxPromise.then(
	response => {}
)
```

### 设置缓存

```
Assistant.newLocStorage.setStorage('abc', '123');

```
