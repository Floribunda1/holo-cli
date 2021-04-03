// 用来生成 packages/@my 下面每个包的 package.json 等文件
const fs = require('fs');
const path = require('path');

const version = require('../package.json').version;
const dir = path.resolve(__dirname, '../packages/@my');
const packages = fs.readdirSync(dir);

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

packages.forEach((package) => {
	const isPlugin = /^cli-plugin-(\w+)/gi.test(package);

	const description = isPlugin
		? `${package.replace('cli-plugin-', '')} plugin for cli`
		: `${package} for cli`;

	const packageJson = {
		name: `@my/${package}`,
		version,
		description,
		main: 'index.js',
		repository: {
			type: 'git',
			url: 'git+https://github.com/Floribunda1/my-cli.git',
		},
		keywords: ['cli'],
		license: 'MIT',
	};

	const filePath = path.join(dir, package, 'package.json');

	if (fs.existsSync(filePath)) {
		mergeOptions(require(filePath), packageJson);
	} else {
		fs.writeFileSync(filePath, JSON.stringify(packageJson, null, 2));
	}
});
