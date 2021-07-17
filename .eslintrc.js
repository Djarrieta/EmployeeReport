module.exports = {
  "extends": [
    "airbnb-typescript-prettier"
  ],
  "rules": {
    "import/prefer-default-export": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "import/no-extraneous-dependencies": "off",
    "@typescript-eslint/no-var-requires": "off",
    "import/no-dynamic-require": "off",
    "global-require": "off",
    "react/jsx-props-no-spreading": "off",
    'prettier/prettier': [
      'error',
      {
        'endOfLine': 'auto',
      }
    ]
  },
  "settings": {
    "import/resolver": {
      "node": {
        "paths": [
          "src"
        ],
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx"
        ]
      }
    }
  }
};
