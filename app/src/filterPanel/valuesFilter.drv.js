define([
    'lodash',
    'moment',
    'filterModel/DiscreteValuesFilter',
    'filterModel/DiscreteValuesListAllRequiredFilter',
    'filterModel/DiscreteValuesListAnyRequiredFilter',
    'filterModel/RangeFilter',
    'filterModel/RangeDateTimeFilter',
    'filterModel/RangeMonetaryAmountFilter',
    'filterModel/BooleanFilter'
    ],
    function (
    _,
    moment,
    DiscreteValuesFilter,
    DiscreteValuesListAllRequiredFilter,
    DiscreteValuesListAnyRequiredFilter,
    RangeFilter,
    RangeDateTimeFilter,
    RangeMonetaryAmountFilter,
    BooleanFilter
    ) {
        'use strict';

    return function (
        StatisticsGatheringRequestsRegistryService,
        statisticsUpdateNotification,
        StatisticsBroadcastingService,
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
                , filterPanelId: '@?'
            },
            templateUrl: '../app/src/filterPanel/valuesFilter.tpl.html',
            link: function(scope, element, attrs, filtersPanelController) {

                scope.filterInstance = createFilterInstance();

                /* jshint maxcomplexity:8 */
                function createFilterInstance() {
                    var filterId = FilterIdGeneratorService.next();
                    switch (scope.filterType) {
                        case 'discrete':
                            return new DiscreteValuesFilter(filterId, attrs.label, attrs.filterablePropertyName);
                        case 'discreteListAllRequired':
                            return new DiscreteValuesListAllRequiredFilter(filterId, attrs.label, attrs.filterablePropertyName);
                        case 'discreteListAnyRequired':
                            return new DiscreteValuesListAnyRequiredFilter(filterId, attrs.label, attrs.filterablePropertyName);
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
                scope.hidePriceFrom = (attrs.hidePriceFrom === 'true');
                scope.currencyFilter = attrs.customCurrencyFilter || 'currency';

                StatisticsGatheringRequestsRegistryService.register({
                      property: scope.filterInstance.getFilterablePropertyName()
                    , type: scope.filterInstance.getRequestedStatisticsType()
                }, filtersPanelController.getOwnerId());

                scope.$on(statisticsUpdateNotification, function () {
                    filtersPanelController.notifyOnStatisticsUpdate();
                    var statistics = StatisticsBroadcastingService.statistics[filtersPanelController.getOwnerId()];
                    if(_.isUndefined(statistics)){
                        return;
                    }
                    scope.filterInstance.applyStatistics(statistics);
                    // need to kick angular as in values filter view we are ngShow on AbstractFilter.filterInitialized. Angular does not see change in this boolean value.
                    scope.$evalAsync();
                });

                scope.permittedValuesChanged = function () {
                    var newFilteringFunction = scope.filterInstance.rebuildFilteringFunction();
                    filtersPanelController.updateFilteringFunction(scope.filterInstance.filterId, newFilteringFunction);
                    // We need to call the digest cycle manually, as we changed the model outside of Angular (we have read the state of filters UI controls (sliders), sent new filtering functions thru event and applied to the itineraries domain model).
                    // In case of discrete filters (checkboxes), the digest cycle is already triggered by Angular (checkboxes with ng-model), while range sliders are component totally outside of Angular: that is why we have to call digest after change from these components.
                    // It is evalAsync, not just digest(), because in case of discrete values filters, the digest cycle is already in progress.
                    scope.$evalAsync();
                };

                scope.$on(resetAllFiltersEvent, function () {
                    scope.filterInstance.reset();
                    scope.permittedValuesChanged();
                });

            }
        }
        };
    });