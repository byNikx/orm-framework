// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),

      require('karma-teamcity-reporter'),
      require('karma-istanbul-threshold'),
      require('karma-junit-reporter'),
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../../coverage'),
      reports: ['html', 'lcovonly', 'json'],
      fixWebpackSourcePaths: true
    },
    // istanbulThresholdReporter: {
    //   src: 'coverage/coverage-final.json',
    //   reporters: ['text'],
    //   thresholds: {
    //     global: {
    //       statements: 85,
    //       branches: 100,
    //       lines: 85,
    //       functions: 85
    //     },
    //     each: {
    //       statements: 85,
    //       branches: 100,
    //       lines: 85,
    //       functions: 85
    //     }
    //   }
    // },
    reporters: ['progress', 'kjhtml', 'junit', 'coverage-istanbul', 'istanbul-threshold'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
