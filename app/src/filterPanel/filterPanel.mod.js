define([
        'angular',
        'angular_rangeslider',
        'messaging/messaging.mod',
        'filterPanel/filterPanel.ctr',
        'filterPanel/filterPanel.drv',
        'filterPanel/valuesFilter.drv',
        'filterPanel/applyFilter.ftr'
    ],
    function (
        angular,
        angular_rangeslider,
        MessagingModule,
        FiltersPanelCtrl,
        FiltersPanelDirective,
        ValuesFilterDirective,
        applyFilterFilter
) {
        'use strict';

        return angular.module('WidgetsFilterPanel.filterPanel', [
            'WidgetsFilterPanel.messaging',
            'ui-rangeSlider'
        ])
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
                'FilteringCriteriaChangedNotificationService',
                'resetAllFiltersEvent',
                FiltersPanelCtrl
            ])
            .filter('applyFilter', ['$filter', applyFilterFilter])
            .filter('passAllFilter', function () {
                return function (input) {
                    return input;
                };
            })
            .directive('filterPanel', FiltersPanelDirective)
            .directive('valuesFilter', [
                'StatisticsGatheringRequestsRegistryService',
                'statisticsUpdateNotification',
                'StatisticsBroadcastingService',
                'FilterIdGeneratorService',
                'resetAllFiltersEvent',
                ValuesFilterDirective])
    }
);