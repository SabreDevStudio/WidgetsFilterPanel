define([],
    function () {
        'use strict';

        return function StatisticsBroadcastingService($rootScope, statisticsUpdateNotification) {
            return {
                statistics: {},
                broadcast: function () {
                    $rootScope.$broadcast(statisticsUpdateNotification);
                }
            };
        };
    });