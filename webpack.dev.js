const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base');

const buildWebpackConfig = merge(baseWebpackConfig, {
	mode: 'development',
	devtool: 'source-map',
	plugins: [],
});

module.exports = new Promise((resolve) => {
	resolve(buildWebpackConfig);
});
