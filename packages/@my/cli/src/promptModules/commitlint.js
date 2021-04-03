module.exports = (api) => {
	api.injectFeature({
		name: 'Commitlint',
		value: 'commitlint',
		short: 'Commitlint',
		description: 'Lint commit messages',
		link: 'https://commitlint.js.org/',
		checked: true,
	});
};
