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
            return function (value, momentFormat) {
                if (_.isUndefined(value) || value === null) {
                    return '';
                }
                return moment(value).format(momentFormat);
            };
        }
    });