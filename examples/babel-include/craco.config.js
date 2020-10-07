const babelInclude = require('@dealmore/craco-plugin-babel-include');

module.exports = {
  plugins: [
    {
      plugin: babelInclude,
      options: {
        include: ['./external-source'],
      },
    },
  ],
};
