// 用来生成 packages/@holo 下面每个包的 package.json 等文件
const fs = require('fs');
const path = require('path');

const version = require('../package.json').version;
const dir = path.resolve(__dirname, '../packages/@holo');
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

	const getFilePath = (file) => path.join(dir, package, file);

	const packageJson = {
		name: `@holo/${package}`,
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

	const packageJsonPath = getFilePath('package.json');
	if (!fs.existsSync(packageJsonPath)) {
		fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
	}

	const readmePath = getFilePath('README.md');
	if (!fs.existsSync(readmePath)) {
		fs.writeFileSync(readmePath, `## ${description}`);
	}
});
