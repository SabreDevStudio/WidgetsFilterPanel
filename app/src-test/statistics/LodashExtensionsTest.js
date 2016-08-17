define([
      'lodash'
    , 'statistics/LodashExtensions'
], function (
      _
    , __
) {
    "use strict";

    describe('groupByAndGetCountAndMin', function () {
        it('groupByAndGetCountAndMin', function () {
            var employees = [
                  {name: 'fred', department: 'sales', salary: 200}
                , {name: 'john', department: 'sales', salary: 150}
                , {name: 'anna', department: 'finance', salary: 300}
            ];
            // get number of employees per department and minimum salary per department
            var allGroupings = __.groupByAndGetCountAndMin(employees, 'department', 'salary');

            var groupingItemForSalesDep = _.find(allGroupings, function (item) {
                return item.value === 'sales';
            });
            expect(groupingItemForSalesDep.count).toBe(2);
            expect(groupingItemForSalesDep.min).toBe(150);

            var groupingItemForFinanceDep = _.find(allGroupings, function (item) {
                return item.value === 'finance';
            });
            expect(groupingItemForFinanceDep.count).toBe(1);
            expect(groupingItemForFinanceDep.min).toBe(300);
        });
    });
});