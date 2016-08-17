define([
          'lodash'
        , 'filterModel/DiscreteValuesFilter'
    ],
    function (
          _
        , DiscreteValuesFilter
    ) {
        'use strict';

        function DiscreteValuesListAnyRequiredFilter() {
            DiscreteValuesFilter.apply(this, arguments);
        }

        DiscreteValuesListAnyRequiredFilter.prototype = Object.create(DiscreteValuesFilter.prototype);
        DiscreteValuesListAnyRequiredFilter.prototype.constructor = DiscreteValuesListAnyRequiredFilter;

        DiscreteValuesListAnyRequiredFilter.prototype.filteringFunctionConstructor = function (filterablePropertyName, permittedPropertyValues) {
            return function (element) {
                var elementValuesList = _.result(element, filterablePropertyName);
                return elementValuesList.some(function (elementValue) {
                    return _.includes(permittedPropertyValues, elementValue);
                });
            };
        };

        return DiscreteValuesListAnyRequiredFilter;
    });
