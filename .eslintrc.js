module.exports = {
	parser: 'babel-eslint',
	extends: ['prettier'],
	plugins: ['prettier', 'compat', 'import'],
	env: {
		es6: true,
		browser: true,
		node: true,
		'shared-node-browser': true,
	},
	parserOptions: {
		ecmaVersion: 2017,
		sourceType: 'module',
		jsx: true,
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
		},
	},
	rules: {
		'compat/compat': 1,
		'prettier/prettier': [
			'error',
			{
				useTabs: true,
				printWidth: 120,
				tabWidth: 4,
				singleQuote: true,
				trailingComma: 'es5',
				jsxBracketSameLine: false,
				semi: true,
			},
		],
		'no-var': 2,
		'no-dynamic-require': 0,
		'import/no-dynamic-require': 0,
		'no-const-assign': 'error',
		radix: 'error',
		'prefer-template': 'error',
		'prefer-const': 'error',
		'prefer-spread': 'error',
		eqeqeq: ['error', 'always'],
		semi: [2, 'always'],
		'default-case': 2,
		'template-curly-spacing': 0, // Prettier.
		'arrow-parens': 0, // Does not work with Flow generic types
		'consistent-return': 0, // Flow.
		'newline-before-return': 'error',
		'no-use-before-define': ['error', { functions: false, classes: false, variables: true }],
		'import/no-extraneous-dependencies': 0,
		'import/extensions': 0,
		'import/no-unresolved': 0,
		'no-return-await': 0,
		'no-restricted-syntax': 0,
		'no-underscore-dangle': 0,
		'import/first': 0,
		'no-restricted-globals': 1,
		'no-useless-escape': 1,
		'no-unused-vars': 1,
		yoda: ['error', 'never', { exceptRange: true }],
		'import/prefer-default-export': 0,
		'jsx-a11y/href-no-hash': 'off',
		'no-console': 0, // we are enabling this in the scripts
		'no-debugger': 0, // we are enabling this in the scripts
		'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
		quotes: ['error', 'single', { avoidEscape: true }],
	},
	settings: {
		polyfills: ['promises'],
		flowtype: {
			onlyFilesWithFlowAnnotation: false,
		},
	},
};
