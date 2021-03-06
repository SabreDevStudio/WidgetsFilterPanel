function sampleApp() {
    var app = angular.module("sampleApp", ['WidgetsFilterPanel'])
        .controller("sampleAppCtrl", [
            '$scope',
            'filterServiceFactory',
            function(scope, filterServiceFactory) {
                var items = [
                    {
                        price: {
                            amount: 240,
                            currency: "USD"
                        },
                        numberOfStops: 0
                    },
                    {
                        price: {
                            amount: 300,
                            currency: "USD"
                        },
                        numberOfStops: 1
                    },
                    {
                        price: {
                            amount: 130,
                            currency: "USD"
                        },
                        numberOfStops: 3
                    }
                ];

                scope.filteredItems = items;

                var filterService = filterServiceFactory.newInstance('some-widgets-app');

                filterService.configure(
                    {
                        pricePropertyAmountAccessor: 'amount',
                        pricePropertyAmountForPriceFrom: 'price.amount',
                        pricePropertyCurrencyForPriceFrom: 'price.currency'
                    }
                );

                filterService.onFilterChange(function (filteringFn) {
                    scope.filteredItems = items.filter(filteringFn);
                });

                // simulate time on fetching model data from webservice - to let value filters register their definitions
                setTimeout(function () {
                    filterService.updateFiltersState(items);
                }, 100);

                scope.$on('$destroy', function () {
                    filterService.destroy();
                })

            }])
        .filter('humanizeNumberOfStops', function () {
            return function (stops) {
                return stops + " stops";
            }
        })
        .filter('someCustomCurrencyFilter', function () {
            return function (amount, currency) {
                return amount + ' ' + '$';
            }
        })

    angular.element(document).ready(function () {
        angular.bootstrap(document, ['sampleApp'], {
            strictDi: true
        });
    });

}
