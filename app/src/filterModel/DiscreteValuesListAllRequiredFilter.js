define([
          'lodash'
        , 'filterModel/DiscreteValuesFilter'
    ],
    function (
          _
        , DiscreteValuesFilter
    ) {
        'use strict';

        function DiscreteValuesListAllRequiredFilter() {
            DiscreteValuesFilter.apply(this, arguments);
        }

        DiscreteValuesListAllRequiredFilter.prototype = Object.create(DiscreteValuesFilter.prototype);
        DiscreteValuesListAllRequiredFilter.prototype.constructor = DiscreteValuesListAllRequiredFilter;

        DiscreteValuesListAllRequiredFilter.prototype.filteringFunctionConstructor = function (filterablePropertyName, permittedPropertyValues) {
            return function (element) {
                var elementValuesList = _.result(element, filterablePropertyName);
                return elementValuesList.every(function (elementValue) {
                    return _.includes(permittedPropertyValues, elementValue);
                });
            };
        };

        return DiscreteValuesListAllRequiredFilter;
    });
