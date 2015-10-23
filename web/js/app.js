var app = angular.module('deprecatedWebApp', ['ngRoute']);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home, List all the items
    .when('/', 			    {templateUrl: 'partials/list.html', controller: 'ItemCtrl'})
    // Items
    .when('/item', 		  {templateUrl: 'partials/item.html', controller: 'ItemCtrl'})
    // Yeah 404
    .otherwise('/404', 	{templateUrl: 'partials/404.html', 	controller: 'ItemCtrl'});
}]);