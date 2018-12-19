module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/recommended', '@vue/standard'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        indent: [
            'error',
            4,
            {
                SwitchCase: 1
            }
        ],
        'space-before-function-paren': ['error', { anonymous: 'always', named: 'never' }],
        'no-global-assign': 'off',
        'vue/html-indent': ['error', 4],
        'vue/require-v-for-key': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/multiline-html-element-content-newline': 'off'
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
