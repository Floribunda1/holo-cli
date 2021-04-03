module.exports = (api) => {
	api.injectFeature({
		name: 'Linter',
		value: 'eslint',
		short: 'Linter',
		description: 'Find and fix problems in your JavaScript code',
		link: 'https://eslint.org/',
		checked: true,
	});
};
