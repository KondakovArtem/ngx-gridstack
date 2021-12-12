module.exports = {
  overrides: [
    {
      files: ["**/*.scss"],
      customSyntax: "postcss-scss",
    },
  ],
  extends: ["stylelint-config-standard-scss", "stylelint-config-prettier"],
  rules: {
    indentation: 4,
    "string-quotes": "single",
    "no-descending-specificity": null,
    "scss/at-mixin-pattern": null,
    "scss/at-function-pattern": null,
    "scss/no-global-function-names": null,
    "function-name-case": null,
    "color-function-notation": "legacy",
    "scss/dollar-variable-empty-line-before": null,
    "selector-pseudo-element-no-unknown": [
      true,
      { ignorePseudoElements: ["ng-deep"] },
    ],
    "number-max-precision": 6,
  },
};
