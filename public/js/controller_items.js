app.controller('ItemCtrl', function ($scope, ItemService) {
    // Initialize values to make loading fluid
    $scope.deprecatedItems = [];
    // Load data
    ItemService
        .getItems()
        .then(function(data){
            $scope.deprecatedItems = data;
        }, function(err) {
             $scope.err = err;
        });
});