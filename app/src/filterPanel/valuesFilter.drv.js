define([
    'lodash',
    'moment',
    'filterModel/DiscreteValuesFilter',
    'filterModel/DiscreteValuesListFilter',
    'filterModel/RangeFilter',
    'filterModel/RangeDateTimeFilter',
    'filterModel/RangeMonetaryAmountFilter',
    'filterModel/BooleanFilter'
    ],
    function (
    _,
    moment,
    DiscreteValuesFilter,
    DiscreteValuesListFilter,
    RangeFilter,
    RangeDateTimeFilter,
    RangeMonetaryAmountFilter,
    BooleanFilter
    ) {
        'use strict';

    return function (
        StatisticsGatheringRequestsRegistryService,
        itinerariesStatisticsUpdateNotification,
        ItineraryStatisticsBroadcastingService,
        FilterIdGeneratorService,
        resetAllFiltersEvent
    ) {

        return {
            restrict: 'E',
            require: '^filterPanel',
            replace: true,
            scope: {
                  canFilterOnlyOnMaxValue: '@'
                , canFilterOnlyOnMinValue: '@'
                , filterType: '@type'
            },
            templateUrl: '../app/src/filterPanel/valuesFilter.tpl.html',
            link: function(scope, element, attrs, filtersPanelController) {

                scope.filterInstance = createFilterInstance();

                /* jshint maxcomplexity:7 */
                function createFilterInstance() {
                    var filterId = FilterIdGeneratorService.next();
                    switch (scope.filterType) {
                        case 'discrete':
                            return new DiscreteValuesFilter(filterId, attrs.label, attrs.filterablePropertyName);
                        case 'discreteList':
                            return new DiscreteValuesListFilter(filterId, attrs.label, attrs.filterablePropertyName);
                        case 'range':
                            return new RangeFilter(filterId, attrs.label, attrs.filterablePropertyName);
                        case 'rangeDateTime':
                            return new RangeDateTimeFilter(filterId, attrs.label, attrs.filterablePropertyName);
                        case 'rangeMonetaryAmount':
                            return new RangeMonetaryAmountFilter(filterId, attrs.label, attrs.filterablePropertyName, attrs.currencyPropertyName);
                        case 'boolean':
                            return new BooleanFilter(filterId, attrs.label, attrs.filterablePropertyName);
                    }
                }

                scope.valuesDisplayFilter = attrs.valuesDisplayFilter;
                scope.valuesDisplayFilterOptions = attrs.valuesDisplayFilterOptions;

                StatisticsGatheringRequestsRegistryService.register({
                      property: scope.filterInstance.getFilterablePropertyName()
                    , type: scope.filterInstance.getRequestedStatisticsType()
                });

                scope.$on(itinerariesStatisticsUpdateNotification, function () {
                    filtersPanelController.notifyOnStatisticsUpdate();
                    var statistics = ItineraryStatisticsBroadcastingService.statistics;
                    scope.filterInstance.applyStatistics(statistics);
                });

                scope.permittedValuesChanged = function () {
                    var newFilteringFunction = scope.filterInstance.rebuildFilteringFunction();
                    filtersPanelController.updateFilteringFunction(scope.filterInstance.filterId, newFilteringFunction);
                };

                scope.$on(resetAllFiltersEvent, function () {
                    scope.filterInstance.reset();
                    scope.permittedValuesChanged();
                });

            }
        }
        };
    });