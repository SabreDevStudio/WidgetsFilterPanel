define([
        'angular',
        'angular_bootstrap',
        'filterPanel/filterPanel.ctr',
        'filterPanel/filterPanel.drv',
        'filterPanel/valuesFilter.drv'
    ],
    function (
        angular,
        angular_bootstrap,
        FiltersPanelCtrl,
        FiltersPanelDirective,
        ValuesFilterDirective
) {
        'use strict';

        return angular.module('WidgetsFilterPanel.filterPanel', [])
            .service('FilterIdGeneratorService', function () {
                var seqNumber = 0;
                return {
                    next: function () {
                        return seqNumber++;
                    }
                };
            })
            .controller('FiltersPanelCtrl', [
                '$scope',
                'FilteringCriteriaChangedBroadcastingService',
                'resetAllFiltersEvent',
                FiltersPanelCtrl
            ])
            .directive('filterPanel', FiltersPanelDirective)
            .directive('valuesFilter', [
                'StatisticsGatheringRequestsRegistryService',
                'itinerariesStatisticsUpdateNotification',
                'ItineraryStatisticsBroadcastingService',
                'FilterIdGeneratorService',
                'resetAllFiltersEvent',
                ValuesFilterDirective])
    }
);