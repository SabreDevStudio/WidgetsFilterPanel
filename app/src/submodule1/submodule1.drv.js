define([
    'common/WidgetGlobalCallbacks'
], function (
    WidgetGlobalCallbacks
) {
    'use strict';

    return function submodule1Widget() {
        return {
            scope: true,
            templateUrl: '../app/src/submodule1/submodule1.tpl.html',
            link: function (scope, element) {
                scope.item = "one";
                WidgetGlobalCallbacks.linkComplete(scope, element);
            }
        }
    };
});