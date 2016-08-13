define([
    'angular',
    'templates.mod',
    'submodule1/submodule1.mod'
], function (
    angular,
    TemplatesModule,
    submodule1
) {
    'use strict';

    angular.module('SomeWidgets', [
        'SomeWidgets.templates',
        'SomeWidgets.submodule1'
    ]);
});