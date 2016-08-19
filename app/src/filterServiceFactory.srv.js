define([
    'FilterService'
    ],
    function (
    FilterService
    ) {
        'use strict';

    return function FilterServiceFactory(
        FilteringCriteriaChangedNotificationService,
        StatisticsGatheringRequestsRegistryService,
        StatisticsBroadcastingService,
        $interval
    ) {

        return {
            newInstance: function (creatorId) {
                return new FilterService(FilteringCriteriaChangedNotificationService,
                    StatisticsGatheringRequestsRegistryService,
                    StatisticsBroadcastingService,
                    $interval,
                    creatorId);
            }
        };

    };
});
