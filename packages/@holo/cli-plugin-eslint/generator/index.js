const ruleDependencyMap = {
	typescript: {
		airbnb: {
			'eslint-config-airbnb-typescript': 'latest',
		},
		'typescript-recommend': {},
		none: {},
	},
	javascript: {
		airbnb: {
			'eslint-config-airbnb-base': 'latest',
		},
		standard: {
			'eslint-config-standard': 'latest',
			'eslint-plugin-promise': 'latest',
			'eslint-plugin-node': 'latest',
		},
		none: {},
	},
};

const ruleNameMap = {
	typescript: {
		airbnb: 'airbnb-typescript/base',
		'typescript-recommend': 'plugin:@typescript-eslint/recommended',
		none: '',
	},
	javascript: {
		airbnb: 'airbnb-base',
		standard: 'standard',
		none: '',
	},
};

function resolveDependency({
	hasTypescript,
	hasBabel,
	lintRule,
	lintWithPrettier,
}) {
	const devDependencies = {
		eslint: 'latest',
		'eslint-plugin-import': 'latest',
	};

	// 基础依赖
	if (hasTypescript) {
		devDependencies['@typescript-eslint/parser'] = 'latest';
		devDependencies['@typescript-eslint/eslint-plugin'] = 'latest';
	} else {
		if (hasBabel) {
			devDependencies['@babel/eslint-parser'] = 'latest';
		}
	}

	if (lintWithPrettier) {
		devDependencies['eslint-config-prettier'] = 'latest';
	}

	// 规则适配
	const key = hasTypescript ? 'typescript' : 'javascript';
	return Object.assign({}, devDependencies, ruleDependencyMap[key][lintRule]);
}

function resolveRuleName(userSelection) {
	const { hasTypescript, lintRule } = userSelection;
	const key = hasTypescript ? 'typescript' : 'javascript';
	return ruleNameMap[key][lintRule];
}

module.exports = (api, userSelection) => {
	const { features, lintRule, lintWithPrettier } = userSelection;

	const hasBabel = features.includes('babel');
	const hasTypescript = features.includes('typescript');

	const ruleName = resolveRuleName({ hasTypescript, lintRule });

	const devDependencies = resolveDependency({
		hasBabel,
		hasTypescript,
		lintRule,
		lintWithPrettier,
	});

	api.injectFile('./template', {
		hasBabel,
		hasTypescript,
		lintWithPrettier,
		lintRule,
		ruleName,
	});

	api.extendPackage({
		devDependencies,
		scripts: {
			lint: 'eslint --fix',
		},
	});
};
