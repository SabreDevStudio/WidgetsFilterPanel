define([
    'angular',
    'templates.mod',
    'filterPanel/filterPanel.mod'
], function (
    angular,
    TemplatesModule,
    FilterPanelModule
) {
    'use strict';

    angular.module('WidgetsFilterPanel', [
        'WidgetsFilterPanel.templates',
        'WidgetsFilterPanel.filterPanel'
    ]);
});