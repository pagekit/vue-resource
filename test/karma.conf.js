module.exports = config => {

  config.set({

    basePath: __dirname,

    frameworks: ['jasmine'],

    browsers: ['Chrome', 'Safari', 'Firefox'],

    files: [
      'specs.js',
      {pattern: 'data/*', included: false},
    ],

    proxies: {
      '/data/': '/base/data/'
    },

  });

};
