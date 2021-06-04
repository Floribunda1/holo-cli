module.exports = (api, { features }) => {
	const hasBabel = features.includes('babel');
	const hasTypescript = features.includes('typescript');

	api.injectFile('./base', { hasBabel, hasTypescript });

	if (hasTypescript) {
		api.injectFile('./ts');
	} else {
		api.injectFile('./js');
	}

	const devDependencies = {
		webpack: 'latest',
		'webpack-cli': 'latest',
		'webpack-dev-server': 'latest',
		'html-webpack-plugin': 'latest',
		'clean-webpack-plugin': 'latest',
		'css-loader': 'latest',
		'mini-css-extract-plugin': 'latest',
		'webpack-merge': 'latest',
		webpackbar: 'latest',
		'webpack-bundle-analyzer': 'latest',
		'node-polyfill-webpack-plugin': 'latest',
	};

	if (hasBabel) {
		devDependencies['babel-loader'] = 'latest';
	}

	if (hasTypescript) {
		devDependencies['ts-loader'] = 'latest';
	}

	api.extendPackage({
		devDependencies: devDependencies,
		scripts: {
			build: 'webpack build --config build/prod.config.js',
			dev: 'webpack serve --config build/dev.config.js',
		},
	});
};
