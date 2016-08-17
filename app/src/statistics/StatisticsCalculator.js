define([
        'statistics/LodashExtensions'
    ],
    function (
          _
    ) {
        'use strict';

        function StatisticsCalculator(statisticsSpecifications, modelObjectAccessors) {
            if (statisticsSpecifications.length === 0) {
                throw new Error("No point to create statistics calculator on empty statistics definitions");
            }
            this.statisticsSpecifications = statisticsSpecifications;

            if (modelObjectAccessors) {
                this.pricePropertyAmountAccessor = modelObjectAccessors.pricePropertyAmountAccessor;
                this.pricePropertyAmountForPriceFrom = modelObjectAccessors.pricePropertyAmountForPriceFrom;
                this.pricePropertyCurrencyForPriceFrom = modelObjectAccessors.pricePropertyCurrencyForPriceFrom;
            }
        }

        /**
         * For every element of the argument statisticsSpecifications list, returns its statistics
         */
        StatisticsCalculator.prototype.getCurrentValuesBounds = function (modelObjectArray) {
            var that = this;
            return this.statisticsSpecifications.map(function (oneStatSpec) {
                return {
                    filterablePropertyName: oneStatSpec.property,
                    statistics: that.getStatistics(modelObjectArray, oneStatSpec)
                };
            });
        };

        /**
         * Convenience factory returning instance of given statistic type (based on type property from oneStatSpec passed as argument)
         * @returns {*}
         */
        StatisticsCalculator.prototype.getStatistics = function (modelObjectArray, oneStatSpec) {
            var filterablePropertyName = oneStatSpec.property;
            switch (oneStatSpec.type) {
                case 'range': {
                    return this.getRangeStatistics(modelObjectArray, filterablePropertyName);
                }
                case 'rangeMonetaryAmount': {
                    return this.getMonetaryAmountRangeStatistics(modelObjectArray, filterablePropertyName);
                }
                case 'discrete': {
                    return  this.getDiscreteValuesStatistics(modelObjectArray, filterablePropertyName);
                }
                case 'noop': {
                    return undefined;
                }
                default:
                    throw new Error('Illegal specification of bounds requested: ' + oneStatSpec.type);
            }
        };

        /**
         * Retrieves property with propertyName from all model object array elements, and then from those property instances selects minimum value.
         * If the second argument propertyFieldToCompareOn is passed then minimum value is computed based on that property.
         *
         * For example getMinValue('totalFareAmountWithCurrency', 'amount') will retrieve totalFareAmountWithCurrency objects from all objects of model objects array
         * and then it will return the one totalFareAmountWithCurrency that has the lowest value of the 'amount' property.
         *
         * See lodash _.min
         *
         * @param propertyName
         * @param propertyFieldToCompareOn
         * @returns {*}
         */
        StatisticsCalculator.prototype.getMinValue = function (modelObjectArray, propertyName, propertyFieldToCompareOn) {
            var currentMinValue = Infinity;
            var currentMin = modelObjectArray[0];
            modelObjectArray.forEach(function (itin) {
                var element = _.result(itin, propertyName);
                var elementValue = (_.isUndefined(propertyFieldToCompareOn))? element : element[propertyFieldToCompareOn];
                if (elementValue < currentMinValue) {
                    currentMinValue = elementValue;
                    currentMin = element;
                }
            });
            return currentMin;
        };

        /**
         * See getMinValue
         */
        StatisticsCalculator.prototype.getMaxValue = function (modelObjectArray, propertyName, propertyFieldToCompareOn) {
            var currentMaxValue = -Infinity;
            var currentMax = modelObjectArray[0];
            modelObjectArray.forEach(function (itin) {
                var element = _.result(itin, propertyName);
                var elementValue = (_.isUndefined(propertyFieldToCompareOn))? element : element[propertyFieldToCompareOn];
                if (elementValue > currentMaxValue) {
                    currentMaxValue = elementValue;
                    currentMax = element;
                }
            });
            return currentMax;
        };

        /**
         * For passed propertyName returns biggest (maximum) and smallest (minimum) property value;
         * @param propertyName
         * @returns {{min: *, max: *}}
         */
        StatisticsCalculator.prototype.getRangeStatistics = function (modelObjectArray, propertyName) {
            return {
                min: this.getMinValue(modelObjectArray, propertyName),
                max: this.getMaxValue(modelObjectArray, propertyName)
            };
        };

        /**
         * Convenience method for extracting range statistics for monetary amounts.
         * @param propertyName
         * @returns {{min: *, max: *}}
         */
        StatisticsCalculator.prototype.getMonetaryAmountRangeStatistics = function (modelObjectArray, propertyName) {
            return {
                min: this.getMinValue(modelObjectArray, propertyName, this.pricePropertyAmountAccessor),
                max: this.getMaxValue(modelObjectArray, propertyName, this.pricePropertyAmountAccessor)
            };
        };

        /**
         * Does the operation same as SQL:
         * SELECT propertyName, MIN(totalFareAmount), COUNT(*)
         * FROM modelObjectArray
         * GROUP BY propertyName.
         * So, for the given property (like for example itinerary number of stops)
         * returns the list of all existing property values with the minimum total fare amount for given property value and
         * count of items with given property value.
         *
         * This function makes sense for discrete properties (number of stops, operating airlines, connection airports).
         * Without some ranging function does not make sense for continuous values (like flight time).
         *
         * For example getDiscreteValuesStatistics('getNumberOfStops') returns:
         * [
         {
            "value" : 0,
            "count" : 9,
            "minPrice" : 138.99,
            "currency" : "EUR"
         },
         {
            "value" : 1,
            "count" : 41,
            "minPrice" : 169.38,
            "currency" : "EUR"
         }
         ]
         *
         */
        StatisticsCalculator.prototype.getDiscreteValuesStatistics = function (modelObjectArray, propertyName) {
            var selectableValues =  _.chain(modelObjectArray)
                .groupByAndGetCountAndMin(propertyName, this.pricePropertyAmountForPriceFrom, this.pricePropertyCurrencyForPriceFrom).map(function (groupingItem) {
                    return {
                        value: groupingItem.value
                        , count: groupingItem.count
                        , minPrice: groupingItem.min
                        , currency: groupingItem.mustBeEqualPropertyValue
                    };
                })
                .sortBy('value')
                .value();
            return {selectableValues: selectableValues};
        };

        return StatisticsCalculator;
    });
