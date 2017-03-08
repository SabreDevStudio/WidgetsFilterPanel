/*global requirejs */
var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Test.js$/.test(file)) {
            tests.push(file);
        }
    }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/app/src',

    paths: {
        'angular': '../../bower_components/angular/angular',
        'lodash': '../../bower_components/lodash/lodash',
        'angular_bootstrap': '../../bower_components/angular-bootstrap/ui-bootstrap-tpls',
        'angular_rangeslider': '../../bower_components/angular-rangeslider/angular.rangeSlider',
        'moment': '../../bower_components/moment/moment',
        'elementQuery': '../../bower_components/css-element-queries/src/ElementQueries',
        'ResizeSensor': '../../bower_components/css-element-queries/src/ResizeSensor'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular_rangeslider': {
            deps: ['angular']
        }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});