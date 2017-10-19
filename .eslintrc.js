// For a complete list of airbnb rules refer to this url: https://github.com/airbnb/javascript
module.exports = {
    "extends": "airbnb-base",
    "plugins": [
      "jest"
    ],
    "env": {
      "jest/globals": true
    },
    "rules": {
      "import/prefer-default-export": "off",
      "newline-before-return": "error",
    }
};
