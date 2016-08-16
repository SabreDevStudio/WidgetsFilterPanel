define([
        'lodash'
    ], function (
        _
    ) {
    "use strict";

    var lodash = _.runInContext();

    lodash.mixin({
        /**
         * Selects minimum from all values of object enumerable properties.
         * Returns undefined if there are no enumerable properties
         * @param object
         * @returns {number}
         */
        minOfValues: function(object) {
            var allValues = _.values(object);
            return Math.min.apply(undefined, allValues);
        },
        /**
         * This function does group by groupingProperty and for every calculates also the minimum value of the propertyToGetMinValue.
         * example input: var collection = [
         *      {from: 'LAX', to: 'NYC', numberOfStops: 1, price: 100}
         *      {from: 'LAX', to: 'NYC', numberOfStops: 1, price: 120}
         *      {from: 'LAX', to: 'NYC', numberOfStops: 0, price: 200}
         *  ]
         *
         *  call groupByAndGetCountAndMin(collection, 'numberOfStops', 'price')
         *
         *  output: [
         *      {value: 1, count: 2, min: 100}
         *      {value: 0, count: 1, min: 200}
         *  ]
         *
         *  Please note the format: array is returned, and the value of the groupingProperty is a value of the 'value' key, not the key itself (not a mapping of groupingProperty value into record of count and min).
         *  We have to use this format because otherwise (if we returned mapping of groupingProperty values into min and count) the values of groupingProperty, as being the object keys, would be coerced to String,
         *  which is not desirable for groupingProperty of type other than String.
         *
         */
        groupByAndGetCountAndMin: function(collection, groupingProperty, propertyToGetMinValue, propertyThatMustBeEqualWhenCalculatingMin) {

            function processGroupingKey(acc, groupingKey, next) {
                if (_.isUndefined(acc.keysAcc[groupingKey])) {
                    acc.keysAcc[groupingKey] = groupingKey;
                    acc.valuesAcc[groupingKey] = {min: Infinity, count: 0};
                }
                acc.valuesAcc[groupingKey].count++;
                var nextValue = _.result(next, propertyToGetMinValue);
                var nextValueOfPropertyToBeEqual = _.result(next, propertyThatMustBeEqualWhenCalculatingMin);
                if (propertyThatMustBeEqualWhenCalculatingMin
                    && acc.valuesAcc[groupingKey].mustBeEqualPropertyValue
                    && (acc.valuesAcc[groupingKey].mustBeEqualPropertyValue !== nextValueOfPropertyToBeEqual)) {
                    throw new Error('Error while calculating min value. The property to be equal "' + propertyThatMustBeEqualWhenCalculatingMin + "' while calculating minimum was different across values");
                }
                if (nextValue < acc.valuesAcc[groupingKey].min) {
                    acc.valuesAcc[groupingKey].min = nextValue;
                    acc.valuesAcc[groupingKey].mustBeEqualPropertyValue = nextValueOfPropertyToBeEqual;
                }
                return acc;
            }

            /**
             * The implementation is complex for the reasons described above in method usage comments.
             *
             * We are temporarily storing two mappings (the accumulatorsPair):
             *  1. accumulatorsPair.keysAcc is the mapping of groupingProperty value (object key, as String), into the value itself
             *  2. accumulatorsPair.valuesAcc is the mapping of groupingProperty value (object key, as String), into minimum value and count
             *
             *  Then both maps are merged into one array (matching is done by the both maps keys)
             *
             *  WARN: works for groupingProperty of String and number type. if groupingProperty is any other object type, then in the first method it will be coerced to string (we have to use its value as object key). So in such case make sure groupingProperty type has discriminating toString method.
             *
             *  Supports also groupingProperty accessor returning also lists (not only scalars).
             */

            var accumulatorsPair = collection.reduce(function (acc, next) {
                var groupingKey = _.result(next, groupingProperty);
                if (_.isArray(groupingKey)) { // support for groupingProperty accessor returning list
                    return groupingKey.reduce(function (localAcc, localGroupingKey) {
                        return processGroupingKey(localAcc, localGroupingKey, next);
                    }, acc);
                } else {
                    return processGroupingKey(acc, groupingKey, next);
                }
            }, {keysAcc: {}, valuesAcc: {}});

            var merged = _.map(accumulatorsPair.keysAcc, function (key) {
                return {
                      value: accumulatorsPair.keysAcc[key]
                    , count: accumulatorsPair.valuesAcc[key].count
                    , min: accumulatorsPair.valuesAcc[key].min
                    , mustBeEqualPropertyValue: accumulatorsPair.valuesAcc[key].mustBeEqualPropertyValue
                };
            });

            return merged;
        }
    });

    return lodash;
});