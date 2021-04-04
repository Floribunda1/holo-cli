module.exports = (api) => {
	api.injectFeature({
		name: 'Packer',
		value: 'webpack',
		short: 'Packer',
		description: 'Bundle files for usage in a browser',
		link: 'https://webpack.js.org/',
		checked: true,
	});
};
