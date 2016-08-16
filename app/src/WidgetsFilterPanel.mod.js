define([
    'angular',
    'templates.mod',
    'filterPanel/filterPanel.mod',
    'messaging/messaging.mod',
    'filterService.srv'
], function (
    angular,
    TemplatesModule,
    FilterPanelModule,
    MessagingModule,
    FilterService
) {
    'use strict';

    angular.module('WidgetsFilterPanel', [
        'WidgetsFilterPanel.templates',
        'WidgetsFilterPanel.messaging',
        'WidgetsFilterPanel.filterPanel'
    ])
        .factory('filterService', [
            'FilteringCriteriaChangedNotificationService',
            'StatisticsGatheringRequestsRegistryService',
            'StatisticsBroadcastingService',
            FilterService
        ])
});