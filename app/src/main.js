require.config({
    paths: {
        'angular': '../../bower_components/angular/angular',
        'lodash': '../../bower_components/lodash/lodash',
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
    }
});

define([
    'angular',
    'WidgetsFilterPanel.mod'
], function (
    angular,
    WidgetsFilterPanelModule) {
    "use strict";

});
