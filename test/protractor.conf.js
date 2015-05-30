exports.config = {
  allScriptsTimeout: 11000,

  seleniumAddress: 'http://localhost:4444/wd/hub',

  specs: [
    'test/e2e/*.js'
  ],

  capabilities: {
    'browserName': 'firefox'
  },

  baseUrl: 'http://localhost:9001/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
