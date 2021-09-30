const path = require('path');
const { merge } = require('webpack-merge');

const common = require('./base.config');

const devConfig = {
	mode: 'development',
	devServer: {
		port: 8080,
		static: {
			directory: path.resolve(__dirname, 'dist'),
		},
		hot: true,
	},
	devtool: 'inline-source-map',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
};

module.exports = merge(common, devConfig);
