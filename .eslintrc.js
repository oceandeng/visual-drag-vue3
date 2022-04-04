module.exports = {
    root: true,
    parserOptions: {
        sourceType: "module",
    },
    parser: "vue-eslint-parser",
    extends: ["plugin:vue/base"],
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    rules: {
        "no-console": "off",
        "vue/multi-word-component-names": "off",
    },
};
