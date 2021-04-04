const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');

const resolve = p => path.resolve(__dirname, p);

const webpackConfig = {
	entry: './src/index.js',
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			<%_ if (hasBabel) { -%>
			{
				test: /\.jsx?$/,
				use: 'babel-loader',
				exclude: [/node_modules/]
			}
			<%_ } -%>
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'My App',
			template: resolve('../public/index.html'),
		}),
		new CleanWebpackPlugin(),
		new WebpackBar(),
	],
};

module.exports = webpackConfig;
