define([
    'lodash'
    ],
    function (
    _
    ) {
        'use strict';

        return function(
                    $scope,
                    FilteringCriteriaChangedNotificationService,
                    resetAllFiltersEvent
                ) {

                    // stores all current filtering function, as a mapping of unique filterId to its filtering function
                    // is updated per filter, on filter change
                    // the values of this map are all current filtering functions
                    var currentFilteringFunctions = {};

                    var anyStatisticsToCreateFiltersSent;

                    this.notifyOnStatisticsUpdate = function () {
                        anyStatisticsToCreateFiltersSent = true;
                    };

                    this.updateFilteringFunction = function (filterId, newFilteringFunction) {
                        currentFilteringFunctions[filterId] = newFilteringFunction;
                        var aggregateFilteringFn = function (modelObj) {
                            return _.values(currentFilteringFunctions).every(function (filteringFn) {
                                return filteringFn(modelObj)
                            });
                        };
                        FilteringCriteriaChangedNotificationService.notify(aggregateFilteringFn);
                    };

                    $scope.resetAllFilters = function () {
                        $scope.$broadcast(resetAllFiltersEvent);
                    };

                    $scope.isAnyDataToDisplayAvailable = function () {
                        return anyStatisticsToCreateFiltersSent;
                    };
                }
    });
