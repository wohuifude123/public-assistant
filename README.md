# 第三方工具类

> Author: 刘建

```
let requestParams = {
	url: GlobalUrl.readRoadAllUrl,
    data: {
    	appid: "cmp",
        token: 0,
        data: {
        	roadbookId: roadbookId,
        	roadbookCode: "RB000133"
        }
    },
    method: "post"
};

let ajaxPromise = _this.$ASSISTANT.requestAjax(requestParams);
ajaxPromise.then(
	response => {}
)
```

```
Assistant.newLocStorage.setStorage('abc', '123');

```
