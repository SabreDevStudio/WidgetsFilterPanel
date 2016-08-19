define([
        'lodash'
    ],
    function (
        _
    ) {
        'use strict';

        return function StatisticsGatheringRequestsRegistryService() {
            var registry = {};
            return {
                register: function (statisticDescription, owner) {
                    if (_.isUndefined(registry[owner])) {
                        registry[owner] = [];
                    }
                    registry[owner].push(statisticDescription);
                },
                getAll: function (owner) {
                    if (_.isUndefined(registry[owner])) {
                        return [];
                    }
                    return registry[owner];
                }
            };
        }
    });