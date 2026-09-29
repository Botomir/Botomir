import { configs } from 'eslint-config-airbnb-extended/legacy';
import globals from 'globals';

export default [
    {
        ignores: ['node_modules/**', 'views/**', 'jest.config.js', 'dist/**', 'coverage/**'],
    },
    ...configs.base.recommended,
    {
        languageOptions: {
            ecmaVersion: 2022,
            parserOptions: {
                ecmaVersion: 2022,
            },
            sourceType: 'commonjs',
            globals: {
                ...globals.commonjs,
                ...globals.es2021,
                ...globals.node,
                ...globals.jest,
                Atomics: 'readonly',
                SharedArrayBuffer: 'readonly',
            },
        },
        rules: {
            camelcase: 'warn',
            'no-promise-executor-return': 'warn',
            indent: [
                'error',
                4,
            ],
            'no-param-reassign': ['error', { props: false }],
            // eslint 9 changed the caughtErrors default to 'all', keep the eslint 8 behaviour
            'no-unused-vars': ['error', {
                vars: 'all', args: 'after-used', ignoreRestSiblings: true, caughtErrors: 'none',
            }],
            'object-curly-newline': ['error', {
                ObjectExpression: 'always',
                ObjectPattern: { multiline: true },
                ImportDeclaration: 'never',
                ExportDeclaration: { multiline: true, minProperties: 3 },
            }],
        },
    },
    {
        files: ['eslint.config.mjs'],
        languageOptions: { sourceType: 'module' },
        rules: {
            'import/no-unresolved': 'off',
            'import/extensions': 'off',
            'object-curly-newline': 'off',
        },
    },
];
