module.exports = {
  "root":true,
  "env": {
      "es6": true,
      "browser": true,
      "commonjs": true,
  },
  "extends": [
      "eslint:recommended"
  ],
  "parserOptions": {
      "sourceType": "module"
  },
  "rules": {
      "brace-style": ["error", "1tbs", {"allowSingleLine": true}],
      "comma-style": "error",
      "comma-spacing": "error",
      "eqeqeq": ["off", "smart"],
      "indent": "off",
      "indent-legacy": ["error", 4, {"SwitchCase": 1}],
      "key-spacing": "error",
      "keyword-spacing": "error",
      "linebreak-style": ["error", "unix"],
      "no-multi-spaces": "error",
      "no-trailing-spaces": "error",
      "no-lone-blocks": "error",
      "no-extend-native": "error",
      "no-unused-vars": ["error", {"vars": "local", "args": "none"}],
      "no-empty": ["error", {"allowEmptyCatch": true}],
      "no-duplicate-imports": "error",
      "no-array-constructor": "error",
      "no-multiple-empty-lines": "error",
      "no-template-curly-in-string": "error",
      "no-console": "off",
      "object-curly-spacing": "error",
      "quotes": ["error", "single", {"avoidEscape": true}],
      "semi": ["error", "always"],
      "space-infix-ops": "error",
      "space-unary-ops": "error",
      "space-in-parens": "error",
      "space-before-blocks": "error",
      "template-curly-spacing": "error"
  }
};
