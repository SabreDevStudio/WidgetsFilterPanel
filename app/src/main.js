require.config({
    paths: {
        'angular': '../../bower_components/angular/angular',
        'lodash': '../../bower_components/lodash/lodash',
        'angular_bootstrap': '../../bower_components/angular-bootstrap/ui-bootstrap-tpls',
        'moment': '../../bower_components/moment/moment',
        'elementQuery': '../../bower_components/css-element-queries/src/ElementQueries',
        'ResizeSensor': '../../bower_components/css-element-queries/src/ResizeSensor'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        angular_bootstrap: {
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
