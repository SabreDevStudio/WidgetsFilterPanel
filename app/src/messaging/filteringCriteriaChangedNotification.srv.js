define([
        'lodash'
    ],
    function (
        _
    ) {
        'use strict';

        return function FilteringCriteriaChangedNotificationService() {
            var listeners = {};
            return {
                registerListener: function (listenerFn, listenerOwner) {
                    if (_.isUndefined(listeners[listenerOwner])) {
                        listeners[listenerOwner] = [];
                    }
                    listeners[listenerOwner].push(listenerFn);
                },
                notify: function (filteringFn, listenerOwner) {
                    if (_.isUndefined(listeners[listenerOwner])) {
                        return;
                    }
                    listeners[listenerOwner].forEach(function (listenerFn) {
                        listenerFn(filteringFn);
                    });
                }
            };
        };
});