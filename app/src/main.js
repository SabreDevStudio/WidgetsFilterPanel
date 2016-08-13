require.config({
    paths: {
        'angular': '../../bower_components/angular/angular',
        'lodash': '../../bower_components/lodash/lodash',
        'angular_resource': '../../bower_components/angular-resource/angular-resource',
        'angular_bootstrap': '../../bower_components/angular-bootstrap/ui-bootstrap-tpls',
        'angular-sanitize': '../../bower_components/angular-sanitize/angular-sanitize',
        'angular-touch': '../../bower_components/angular-touch/angular-touch',
        'angular_iso_currency': '../../bower_components/iso-currency/dist/isoCurrency',
        'ngStorage': '../../bower_components/ngstorage/ngStorage',
        'nsPopover': '../../bower_components/nsPopover/src/nsPopover',
        'moment': '../../bower_components/moment/moment',
        'elementQuery': '../../bower_components/css-element-queries/src/ElementQueries',
        'ResizeSensor': '../../bower_components/css-element-queries/src/ResizeSensor'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        angular_resource: {
            deps: ['angular'], 'exports': 'ngResource'
        },
        angular_bootstrap: {
            deps: ['angular']
        },
        'angular-sanitize': {
            deps: ['angular']
        },
        'angular-touch': {
            deps: ['angular']
        },
        'angular_iso_currency': {
            deps: ['angular']
        },
        'ngStorage': {
            deps: ['angular']
        },
        'nsPopover': {
            deps: ['angular']
        }
    }
});

define([
    'angular',
    'angular-sanitize',
    'angular-touch',
    'SomeWidgets.mod'
], function (
    angular,
    ngSanitize,
    ngTouch,
    SomeWidgetsModule) {
    "use strict";

});
