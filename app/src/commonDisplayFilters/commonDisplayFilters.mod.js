define([
        'angular',
        'commonDisplayFilters/makeMomentAndFormat.ftr',
        'commonDisplayFilters/makeMomentDurationAndFormat.ftr'
    ],
    function (
        angular,
        makeMomentAndFormatFitler,
        makeMomentDurationAndFormatFitler
) {
        'use strict';

        return angular.module('WidgetsFilterPanel.commonDisplayFilters', [])
            .filter('makeMomentAndFormat', makeMomentAndFormatFitler)
            .filter('makeMomentDurationAndFormat', makeMomentDurationAndFormatFitler)
    }
);