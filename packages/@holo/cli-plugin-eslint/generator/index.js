const ruleDependencyMap = {
	airbnb: {
		'eslint-config-airbnb-base': 'latest',
	},
	standard: {
		'eslint-config-standard': 'latest',
		'eslint-plugin-promise': 'latest',
		'eslint-plugin-node': 'latest',
	},
	none: {},
};

module.exports = (api, { features, lintRule, lintWithPrettier }) => {
	const hasBabel = features.includes('babel');

	api.injectFile('./template', {
		hasBabel,
		lintRule,
		lintWithPrettier,
	});

	const devDependencies = {
		eslint: 'latest',
		'eslint-plugin-import': 'latest',
	};

	if (hasBabel) {
		devDependencies['@babel/eslint-parser'] = 'latest';
	}

	Object.keys(ruleDependencyMap[lintRule]).forEach((d) => {
		devDependencies[d] = 'latest';
	});

	if (lintWithPrettier) {
		devDependencies['eslint-config-prettier'] = 'latest';
	}

	api.extendPackage({
		devDependencies,
		scripts: {
			lint: 'eslint --fix',
		},
	});
};
