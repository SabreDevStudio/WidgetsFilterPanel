define([
    'angular',
    'templates.mod',
    'filterPanel/filterPanel.mod',
    'messaging/messaging.mod',
    'commonDisplayFilters/commonDisplayFilters.mod',
    'filterServiceFactory.srv'
], function (
    angular,
    TemplatesModule,
    FilterPanelModule,
    MessagingModule,
    CommonDisplayFiltersModule,
    filterServiceFactory
) {
    'use strict';

    angular.module('WidgetsFilterPanel', [
        'WidgetsFilterPanel.templates',
        'WidgetsFilterPanel.messaging',
        'WidgetsFilterPanel.filterPanel',
        'WidgetsFilterPanel.commonDisplayFilters'
    ])
        .factory('filterServiceFactory', [
            'FilteringCriteriaChangedNotificationService',
            'StatisticsGatheringRequestsRegistryService',
            'StatisticsBroadcastingService',
            '$interval',
            filterServiceFactory
        ])
});