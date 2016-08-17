define([
        'statistics/StatisticsCalculator',
        'lodash'
    ],
    function (
        StatisticsCalculator,
        _
    ) {
        'use strict';

    return function FilterService(
        FilteringCriteriaChangedNotificationService,
        StatisticsGatheringRequestsRegistryService,
        StatisticsBroadcastingService
    ) {

        var modelObjectAccessors;

        return {
            configure: function (modelObjectAccessorsArg) {
                modelObjectAccessors = modelObjectAccessorsArg;
            },
            onFilterChange: function (callbackFn) {
                FilteringCriteriaChangedNotificationService.registerListener(callbackFn);
            },
            updateFiltersState: function (modelObjectsArray) {
                if (_.isUndefined(modelObjectAccessors)) {
                    throw new Error("call configure first before using the service");
                }
                // WARN: dom element values filter directives must already register their statistics definitions, before this updateFiltersState is first called.
                // Normally it is not a problem as model objects are fetched from web service and similar.
                // This is deficiency, but not fixing now not to complicate the design
                var requestedStatisticsDescriptions = StatisticsGatheringRequestsRegistryService.getAll();
                var statisticsCalculator = new StatisticsCalculator(requestedStatisticsDescriptions, modelObjectAccessors);

                var statistics = statisticsCalculator.getCurrentValuesBounds(modelObjectsArray);
                StatisticsBroadcastingService.statistics = statistics;
                StatisticsBroadcastingService.broadcast();
            }
        };

    };
});
