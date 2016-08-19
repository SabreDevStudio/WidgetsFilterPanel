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
        StatisticsBroadcastingService,
        $interval
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
                // WARN: dom element values filter directives typically register their statistics definitions, before this updateFiltersState is first called.
                // Normally it is not a problem as model objects are fetched from web service which takes time.
                // However it may happen (for example data from webservice already available in cache) that this method and StatisticsGatheringRequestsRegistryService.getAll() is called BEFORE filters register their statistics definitions.
                // That is why we loop over getting (non-empty) statistics definitions.
                // This is ugly hack, but not fixing in more correct way not to complicate the design (communication protocol between StatisticsGatheringRequestsRegistryService writers and readers would be needed).
                // This whole problem will go away when we change the design so that filterable properties definitions (particular filter definitions) are not stored in filter directive, but are sent from filterService client (stored not in directive view, but in model).
                var fetchStatisticsLoop = $interval(function () {
                    var requestedStatisticsDescriptions = StatisticsGatheringRequestsRegistryService.getAll();
                    if (requestedStatisticsDescriptions.length === 0) {
                        return;
                    }
                    var statisticsCalculator = new StatisticsCalculator(requestedStatisticsDescriptions, modelObjectAccessors);

                    var statistics = statisticsCalculator.getCurrentValuesBounds(modelObjectsArray);
                    StatisticsBroadcastingService.statistics = statistics;
                    StatisticsBroadcastingService.broadcast();
                    $interval.cancel(fetchStatisticsLoop);
                }, 10);
            }
        };

    };
});
