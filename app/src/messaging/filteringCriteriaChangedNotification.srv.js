define([],
    function () {
        'use strict';

        return function FilteringCriteriaChangedNotificationService() {
            var listeners = [];
            return {
                registerListener: function (listenerFn) {
                    listeners.push(listenerFn);
                },
                notify: function (filteringFn) {
                    listeners.forEach(function (listenerFn) {
                        listenerFn(filteringFn);
                    });
                }
            };
        };
});