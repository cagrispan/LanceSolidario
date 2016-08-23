//jshint strict: false
module.exports = function (config) {
    config.set({

        basePath: './app',

        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'src/services/utils.js',
            'src/services/auth.js',
            'src/services/webservice.js',
            'components/**/*.js',
            'src/app.js',
            'src/config/*.js',
            'src/controller/**/*.js',
            'src/model/**/*.js',
            'test/**/*_test.js',
            'test/**/**/*_test.js',
            'test/**/*Mock.js',
            'test/**/**/*Mock.js'
             ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
