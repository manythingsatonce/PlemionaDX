const packageDetails = require('./package.json');

const path = require('path');
const fs = require('fs');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Main const
const PATHS = {
	src: path.join(__dirname, './src'),
	build: path.join(__dirname, './build'),
};

const PAGES_DIR = PATHS.src;
const PAGES = fs.readdirSync(PAGES_DIR).filter((fileName) => fileName.endsWith('.html'));

module.exports = {
	externals: {
		paths: PATHS,
	},
	entry: {
		content: `${PATHS.src}/js/content.js`,
	},
	output: {
		filename: 'js/[name].js',
		path: PATHS.build,
		publicPath: '/',
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				parallel: true,
			}),
			new CssMinimizerPlugin(),
		],
	},
	module: {
		rules: [
			{
				// JavaScript Eslint
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'eslint-loader',
				enforce: 'pre',
				options: {
					failOnWarning: false,
					failOnError: false,
					'linebreak-style': 0,
				},
			},
			{
				// JavaScript
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /(node_modules|bower_components)/,
			},
			{
				// Fonts
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file-loader',
				options: {
					name: 'fonts/[name].[ext]',
					publicPath: '../',
				},
			},
			{
				// images / icons
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: 'images/[name].[ext]',
					publicPath: '../',
				},
			},
			{
				// scss
				test: /\.(sa|sc|c)ss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
			},
			{
				// css
				test: /\.css$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: { sourceMap: true },
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
		],
	},
	resolve: {
		alias: {
			'~': PATHS.src,
			'@': `${PATHS.src}/js`,
		},
	},
	plugins: [
		new StyleLintPlugin({
			configFile: '.stylelintrc',
			context: '',
			files: '**/*.scss',
			syntax: 'scss',
			failOnError: true,
			quiet: false,
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
		}),
		new CopyWebpackPlugin({
			patterns: [
				// Images:
				{
					from: `${PATHS.src}/images`,
					to: 'images',
				},
				// Fonts:
				/*{
					from: `${PATHS.src}/fonts`,
					to: 'fonts',
				},*/
				// Manifest:
				{
					from: `${PATHS.src}/manifest.json`,
					to: 'manifest.json',
					transform: (content) =>
						content
							.toString()
							.replace(/#description#/g, packageDetails.description)
							.replace(/#version#/g, packageDetails.version)
							.replace(/#homepage_url#/g, packageDetails.homepage)
							.replace(/#author#/g, packageDetails.author),
				},
			],
		}),
		...PAGES.map(
			(page) =>
				new HtmlWebpackPlugin({
					template: `${PAGES_DIR}/${page}`,
					filename: `./${page}`,
				})
		),
	],
};
