module.exports = (api, answers) => {
	api.extendPackage({
		dependencies: {
			'core-js': 'latest',
			'regenerator-runtime': 'latest',
		},
		devDependencies: {
			'@babel/core': 'latest',
			'@babel/preset-env': 'latest',
		},
	});

	api.injectFile('./template');
};
