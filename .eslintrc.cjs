module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/recommended', 'eslint:recommended', 'prettier'],
    plugins: ['vue', 'prettier'],
    rules: {
        'vue/no-v-html': 'off',
        'vue/multi-word-component-names': [
            'error',
            {
                ignores: ['Background', 'Content', 'Header', 'Sidebar']
            }
        ],
        'prettier/prettier': 'error'
    }
}
