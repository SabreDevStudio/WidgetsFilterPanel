define([
    'lodash',
    'moment'
    ],
    function (
    _,
    moment
    ) {
    'use strict';

    return function () {
        return function (value, momentFormat, suffix) {
            if (_.isUndefined(value) || value === null) {
                return '';
            }
            return moment.duration(value, momentFormat).humanize(suffix);
        };
    }    });