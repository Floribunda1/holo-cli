module.exports = (api, {}) => {
	api.injectFile('./template');

	api.extendPackage({
		devDependencies: {
			typescript: 'latest',
		},
	});
};
