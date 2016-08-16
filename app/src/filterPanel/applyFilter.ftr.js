define([
    'lodash'
    ],
    function (
    _
    ) {
    'use strict';

    return function($filter) { // http://stackoverflow.com/questions/21491747/apply-formatting-filter-dynamically-in-a-ng-repeat
        return function() {
            // arguments are: [value, filterName, filter_1st_arg, filter_2nd_arg, ....]
            var args = Array.prototype.slice.call(arguments);
            var value = args.shift();
            var filterName = args.shift();
            // if undefined is passed to this factory then it would create a passAllFilter
            if (_.isUndefined(filterName )) {
                filterName = 'passAllFilter';
            }
            var filter = $filter(filterName);
            args.unshift(value);

            return filter.apply(null, args);
        };
    }
    });