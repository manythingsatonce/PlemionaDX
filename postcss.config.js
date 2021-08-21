module.exports = {
	plugins: [
		require('autoprefixer'),
		require('postcss-preset-env')({
			stage: 3,
			features: {
				'nesting-rules': true,
			},
		}),
		require('postcss-sorting')({
			order: ['custom-properties', 'dollar-variables', 'declarations', 'at-rules', 'rules'],
			'properties-order': 'alphabetical',
		}),
		require('cssnano')({
			preset: [
				'default',
				{
					discardComments: {
						removeAll: true,
					},
				},
			],
		}),
	],
};
