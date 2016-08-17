## Overview
This is angular module providing generic configurable widget of filter panel. Typically displayed on the left of the product list.
Enables to configure wide array of filters, for example filtering by price (displayed as range slider) or by discrete values (like product features, displayed as checkboxes).

## Usage
See demo-www.

1. bower install http://git.sabre.com/scm/smp/widgetsfilterpanel.git
2. make sure angular 1.3 is available in the page (included earlier, or provided by module loader). Make sure module loader provides angular to this module (like requirejs module shims)
3. include this module: 'WidgetsFilterPanel' in the dependency list of your application module.
3b. include this module css in your application css (css bundle)
4. create and configure filter widget: use directives filterPanel and valuesFilter. Typically encapsulate them into your custom directive, specific to your domain model.
For example (directive template):
       <filter-panel>
                <values-filter type="discrete" label="Number of stops" filterable-property-name="numberOfStops" values-display-filter="humanizeNumberOfStops"></values-filter>

                <values-filter type="rangeMonetaryAmount" label="Price" filterable-property-name="price" can-filter-only-on-max-value="true"></values-filter>
       </filter-panel>
Unfortunately your domain knowledge is in these directives configuration. In the future filters should boot dynamically from domain model description that you will provide configuring this module (or configuring filterService, or while providing first model objects array to filter).
5. in your product list directive link function (or controller) inject service 'filterService'. Call:
    - filterService.configure(), for example
                    filterService.configure(
                        {
                            pricePropertyAmountAccessor: 'amount',
                            pricePropertyAmountForPriceFrom: 'price.amount', // you can use lodash _.result style access paths
                            pricePropertyCurrencyForPriceFrom: 'price.currency'
                        }
                    );
    - filterService.onFilterChange: register callback that will be called on any filters change (move slider, uncheck checkbox).
        Your callback will be passed the new filtering function (predicate). Typically you apply this callback to your displayed product items. for example:
                    filterService.onFilterChange(function (filteringFn) {
                            scope.filteredItems = items.filter(filteringFn);
                    });
    - filterService.updateFiltersState: call it for every new list of products, to make filters reinitialize their bounds for the new list of products. Typically called after getting new product list from web service

## Build & development

npm install

bower install

Run `grunt` for building