define([
    'infrastructure/WidgetGlobalCallbacks'
    ],
    function (
    WidgetGlobalCallbacks
    ) {
        'use strict';
        return function () {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    ownerId: '@'
                },
                transclude: true,
                templateUrl: '../app/src/filterPanel/filterPanel.tpl.html',
                controller: 'FiltersPanelCtrl',
                link: function (scope, element) {
                    WidgetGlobalCallbacks.linkComplete(scope, element);
                }
            }
        }
    });
