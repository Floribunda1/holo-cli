module.exports = (api) => {
	api.injectFile('./template');

	api.extendPackage({
		devDependencies: {
			'@commitlint/cli': 'latest',
			'@commitlint/config-conventional': 'latest',
			husky: 'latest',
		},
		scripts: {
			postinstall: 'husky install',
		},
	});
};
