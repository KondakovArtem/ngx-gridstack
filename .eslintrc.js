module.exports = {
    root: true,
    ignorePatterns: ['projects /**/*'],
    extends: ['plugin:storybook/recommended'],
    overrides: [
        {
            files: ['*.ts'],
            parserOptions: {
                project: ['tsconfig.json'],
                createDefaultProgram: true,
            },
            extends: [
                'airbnb-base',
                'airbnb-typescript/base',
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:@angular-eslint/recommended',
                'plugin:@angular-eslint/template/process-inline-templates',
                'plugin:prettier/recommended',
            ],
            rules: {
                'object-curly-spacing': ['error', 'always'],
                '@angular-eslint/directive-selector': [
                    'error',
                    {
                        type: 'attribute',
                        style: 'camelCase',
                    },
                ],
                '@angular-eslint/component-selector': [
                    'error',
                    {
                        type: 'element',
                        prefix: ['lib', 'app'],
                    },
                ],
                '@typescript-eslint/no-unused-vars': [
                    'error',
                    {
                        argsIgnorePattern: '_',
                    },
                ],
                '@typescript-eslint/array-type': 'error',
                '@typescript-eslint/ban-ts-comment': 0,
                '@typescript-eslint/no-empty-function': 0,
                '@typescript-eslint/explicit-module-boundary-types': 0,
                '@typescript-eslint/no-explicit-any': 0,
                '@typescript-eslint/explicit-function-return-type': ['error'],
                'no-async-promise-executor': 0,
                'import/no-webpack-loader-syntax': 0,
                'import/extensions': 0,
                'import/prefer-default-export': 0,
                '@typescript-eslint/lines-between-class-members': 0,
                'class-methods-use-this': 0,
                '@typescript-eslint/no-use-before-define': 0,
                'import/no-extraneous-dependencies': 0,
                'no-plusplus': 0,
                'no-underscore-dangle': 0,
                'no-param-reassign': 0,
                '@angular-eslint/no-empty-lifecycle-method': 0,
            },
        },
        // NOTE: WE ARE NOT APPLYING PRETTIER IN THIS OVERRIDE, ONLY @ANGULAR-ESLINT/TEMPLATE
        {
            files: ['*.html'],
            extends: ['plugin:@angular-eslint/template/recommended'],
            rules: {},
        },
        // NOTE: WE ARE NOT APPLYING @ANGULAR-ESLINT/TEMPLATE IN THIS OVERRIDE, ONLY PRETTIER
        {
            files: ['*.html'],
            excludedFiles: ['*inline-template-*.component.html'],
            extends: ['plugin:prettier/recommended'],
            rules: {
                // NOTE: WE ARE OVERRIDING THE DEFAULT CONFIG TO ALWAYS SET THE PARSER TO ANGULAR (SEE BELOW)
                'prettier/prettier': [
                    'error',
                    {
                        parser: 'angular',
                    },
                ],
            },
        },
    ],
};
