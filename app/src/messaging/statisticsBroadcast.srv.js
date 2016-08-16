define([],
    function () {
        'use strict';

        return function StatisticsBroadcastingService($rootScope, statisticsUpdateNotification) {
            var service = {
                statistics: undefined,
                broadcast: function () {
                    $rootScope.$broadcast(statisticsUpdateNotification);
                }
            };
            return service;
        };
    });