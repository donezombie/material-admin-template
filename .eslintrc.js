module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "node": true
    },
    "settings": {
        "import/resolver": {
          "node": {
            "paths": ["src"]
          }
        }
    },
    "rules": {
        'no-underscore-dangle': ['error', {
            allow: ["_id"],
            allowAfterThis: false,
            allowAfterSuper: false,
            enforceInMethodNames: false,
        }],
        "react/jsx-filename-extension": [1, { "extensions": [".jsx"] }],
    }
  };