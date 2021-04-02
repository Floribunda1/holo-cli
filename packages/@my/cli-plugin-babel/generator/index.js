module.exports = (api, answers) => {
  api.extendPackage({
    dependencies: {
      'core-js': 'latest',
    },
    devDependencies: {
      '@babel/core': 'latest',
      '@babel/preset-env': 'latest',
    },
  });

  api.injectFile('./template');
};
