define([
        'angular',
        'messaging/filteringCriteriaChangedNotification.srv',
        'messaging/statisticsGatheringRequestsRegistry.srv',
        'messaging/statisticsBroadcast.srv'
    ],
    function (
        angular,
        FilteringCriteriaChangedNotificationService,
        StatisticsGatheringRequestsRegistryService,
        StatisticsBroadcastingService
    ) {
        'use strict';

        return angular.module('WidgetsFilterPanel.messaging', [])
            .constant('resetAllFiltersEvent', 'resetAllFiltersEvent')
            .constant('statisticsUpdateNotification', 'statisticsUpdateNotification')
            .factory('FilteringCriteriaChangedNotificationService', FilteringCriteriaChangedNotificationService)
            .factory('StatisticsGatheringRequestsRegistryService', StatisticsGatheringRequestsRegistryService)
            .service('StatisticsBroadcastingService', [
                '$rootScope',
                'statisticsUpdateNotification',
                StatisticsBroadcastingService
            ])
    }
);