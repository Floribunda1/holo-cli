## some tricks

### 怎么获取函数的调用位置？

先看下面这段简化代码：

```javascript
// plugin
module.exports = (api) => {
	api.injectFile('./template', data);
};

// generator.js
function injectFile(path, data) {
	const fileContent = fs.readFileSync(path);
	const content = ejs.render(fileContent);
	return content;
}
```

这样明显是行不通的，因为在执行 injectFile 的文件中寻找路径，直接就路径出错了，因为在 generator 中执行的方法，自然

// TODO: 完整的阐述一下这一整件事情，等写完代码

[关于 captureStackTrace 的参考](https://www.bookstack.cn/read/node-in-debugging/3.3ErrorStack.md#3.3.2%20Error.captureStackTrace)

```javascript
function getCallStack() {
	const obj = {};
	Error.captureStackTrace(obj);
	console.log(obj.stack);
}
```
