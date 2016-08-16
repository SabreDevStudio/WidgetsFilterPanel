define([],
    function () {
        'use strict';

        return function StatisticsGatheringRequestsRegistryService() {
            var registry = [];
            return {
                register: function (statisticDescription) {
                    registry.push(statisticDescription);
                },
                getAll: function () {
                    return registry;
                }
            };
        }
    });