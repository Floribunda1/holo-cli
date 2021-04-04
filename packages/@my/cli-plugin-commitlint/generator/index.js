module.exports = (api, { features }) => {
	const hasLinter = features.includes('eslint');
	api.injectFile('./template');

	const devDependencies = {
		'@commitlint/cli': 'latest',
		'@commitlint/config-conventional': 'latest',
		husky: 'latest',
	};

	if (hasLinter) {
		api.injectFile('./linter');
		devDependencies['lint-staged'] = 'latest';
	}

	api.extendPackage({
		devDependencies,
		scripts: {
			postinstall: 'husky install',
		},
	});
};
