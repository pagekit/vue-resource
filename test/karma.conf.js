module.exports = config => {

  config.set({

    basePath: __dirname,

    frameworks: ['jasmine'],

    browsers: ['Chrome', 'Safari', 'Firefox'],

    files: [
      'index.js',
      {pattern: 'data/*', included: false},
    ],

    preprocessors: {
      'index.js': ['webpack']
    },

    proxies: {
      '/data/': '/base/data/'
    },

  });

};
