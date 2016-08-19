define([
    'angular',
    'templates.mod',
    'filterPanel/filterPanel.mod',
    'messaging/messaging.mod',
    'commonDisplayFilters/commonDisplayFilters.mod',
    'filterService.srv'
], function (
    angular,
    TemplatesModule,
    FilterPanelModule,
    MessagingModule,
    CommonDisplayFiltersModule,
    FilterService
) {
    'use strict';

    angular.module('WidgetsFilterPanel', [
        'WidgetsFilterPanel.templates',
        'WidgetsFilterPanel.messaging',
        'WidgetsFilterPanel.filterPanel',
        'WidgetsFilterPanel.commonDisplayFilters'
    ])
        .factory('filterService', [
            'FilteringCriteriaChangedNotificationService',
            'StatisticsGatheringRequestsRegistryService',
            'StatisticsBroadcastingService',
            '$interval',
            FilterService
        ])
});