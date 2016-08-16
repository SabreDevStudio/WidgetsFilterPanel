define([
        'statistics/StatisticsCalculator'
    ],
    function (
        StatisticsCalculator
    ) {
        'use strict';

    return function FilterService(
        FilteringCriteriaChangedNotificationService,
        StatisticsGatheringRequestsRegistryService,
        StatisticsBroadcastingService
    ) {

        return {
            onFilterChange: function (callbackFn) {
                FilteringCriteriaChangedNotificationService.registerListener(callbackFn); // TODO pass also this reference and then apply?
            },
            updateFiltersState: function (modelObjectsArray) {
                // WARN: dom element values filter directives must already register their statistics definitions, before this updateFiltersState is first called.
                // Normally it is not a problem as model objects are fetched from web service and similar.
                // This is deficiency, but not fixing now not to complicate the design
                var requestedStatisticsDescriptions = StatisticsGatheringRequestsRegistryService.getAll();
                var statisticsCalculator = new StatisticsCalculator(requestedStatisticsDescriptions);

                var statistics = statisticsCalculator.getCurrentValuesBounds(modelObjectsArray);
                StatisticsBroadcastingService.statistics = statistics;
                StatisticsBroadcastingService.broadcast();
            }
        };

    };
});
