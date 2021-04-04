const clearConsole = require('./clear-console');

const mergeOptions = (target, obj) => {
	Object.keys(obj).forEach((key) => {
		if (
			Reflect.ownKeys(target, key) &&
			isObject(obj[key]) &&
			isObject(target[key])
		) {
			mergeOptions(target[key], obj[key]);
		} else {
			target[key] = obj[key];
		}
	});
};

const isObject = (target) =>
	Object.prototype.toString.call(target) === '[object Object]';

module.exports = {
	clearConsole,
	mergeOptions,
};
