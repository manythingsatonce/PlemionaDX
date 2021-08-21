const { merge } = require('webpack-merge');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const baseWebpackConfig = require('./webpack.base');

const buildWebpackConfig = merge(baseWebpackConfig, {
	mode: 'production',
	plugins: [
		new CleanWebpackPlugin(),
		new ImageMinimizerPlugin({
			minimizerOptions: {
				plugins: [
					['jpegtran', { progressive: true }],
					['optipng', { ooptimizationLevel: 9 }],
					[
						'svgo',
						{
							plugins: [
								{
									removeViewBox: false,
								},
							],
						},
					],
				],
			},
		}),
	],
});

module.exports = new Promise((resolve) => {
	resolve(buildWebpackConfig);
});
