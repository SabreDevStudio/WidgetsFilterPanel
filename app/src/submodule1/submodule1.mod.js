define([
    'angular',
    'submodule1/submodule1.drv'
], function (
    angular,
    Submodule1Widget
) {
    'use strict';

    angular.module('SomeWidgets.submodule1', [])
        .directive('submodule1Directive', [
            Submodule1Widget
        ]);
});