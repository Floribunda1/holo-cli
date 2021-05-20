const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const resolve = p => path.resolve(__dirname, p);

const webpackConfig = {
	<%_ if (hasTypescript) { -%>
	entry: './src/index.ts',
	<%_ } -%>
	<%_ if (!hasTypescript) { -%>
	entry: './src/index.js',
	<%_ } -%>
	resolve: {
		alias: {
			'@': path.resolve(__dirname, '../src'),
		},
		extensions: ['.ts', '.js', '.json']
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			<%_ if (hasBabel && !hasTypescript) { -%>
			{
				test: /\.jsx?$/,
				use: 'babel-loader',
				exclude: [/node_modules/]
			},
			<%_ } -%>
			<%_ if (hasTypescript) { -%>
			{
				test: /\.tsx?$/,
				use: ['babel-loader', 'ts-loader'],
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
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash:8].css'
		})
	],
};

module.exports = webpackConfig;
