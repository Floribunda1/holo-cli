module.exports = (api, { features }) => {
	let hasBabel = features.includes('babel');

	api.injectFile('./template', { hasBabel });

	const devDependencies = {
		webpack: 'latest',
		'webpack-cli': 'latest',
		'webpack-dev-server': 'latest',
		'html-webpack-plugin': 'latest',
		'clean-webpack-plugin': 'latest',
		'css-loader': 'latest',
		'style-loader': 'latest',
		'webpack-merge': 'latest',
		webpackbar: 'latest',
		'webpack-bundle-analyzer': 'latest',
	};

	if (hasBabel) {
		devDependencies['babel-loader'] = 'latest';
	}

	api.extendPackage({
		devDependencies: devDependencies,
		scripts: {
			build: 'webpack build --config build/prod.config.js',
			dev: 'webpack serve --config build/dev.config.js --open',
		},
	});
};
