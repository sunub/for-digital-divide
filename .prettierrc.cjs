module.exports = {
  arrowParens: 'avoid',
  bracketSameLine: false,
  bracketSpacing: true,
  endOfLine: 'lf',
  jsxSingleQuote: false,
  printWidth: 120,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  importOrder: ['<THIRD_PARTY_MODULES>', '^@(.*)$', '^[.]/', '^[.]{2,}/'],
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
  overrides: [
    {
      files: 'src/**/{index,compat}.ts',
      options: {
        plugins: [require.resolve('prettier-plugin-sort-re-exports')],
      },
    },
  ],
};
