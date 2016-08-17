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
            var duration = moment.duration(value, momentFormat);
            if (duration.asMilliseconds() === 0) {
                return 0; // patching moment duration corner case when for duration of 0 it humanizes as 'a few seconds'
            }
            return duration.humanize(suffix);
        };
    }    });