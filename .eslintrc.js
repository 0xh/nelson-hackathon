module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true
  },
  extends: ["plugin:vue/essential", "standard"],
  globals: {},
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2017,
    sourceType: "module"
  },
  plugins: ["vue", "standard"],
  root: true,
  rules: {
    "no-console": "error",
    "no-debugger": "error"
  }
};
