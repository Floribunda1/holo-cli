module.exports = (api) => {
	api.injectFeature({
		name: 'Linter',
		value: 'eslint',
		short: 'Linter',
		description: 'Find and fix problems in your JavaScript code',
		link: 'https://eslint.org/',
		checked: true,
	});

	api.injectPrompt({
		type: 'list',
		name: 'lintRule',
		message: '请选择代码风格',
		choices: ['airbnb', 'standard', 'none'],
		when: ({ features }) => features.includes('eslint'),
	});

	api.injectPrompt({
		type: 'confirm',
		name: 'lintWithPrettier',
		message: '是否使用 Prettier',
		default: false,
		when: ({ features }) => features.includes('eslint'),
	});
};
