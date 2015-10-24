app.controller('ItemCtrl', function ($scope, ItemService) {
    // Initialize values to make loading fluid
    $scope.deprecatedItems = [];
    // Load data
    ItemService
        .getItems()
        .then(function(data){
            var sortedData = {};
            var dataCount = data.length;
            for(var index = 0; index < dataCount; index++) {
                var deprecatedItem = data[index];
                var deprecatedGroup = deprecatedItem.deprecated_item.group + '';
                if(sortedData[deprecatedGroup] == undefined) {
                    sortedData[deprecatedGroup] = [];
                }
                var itemsArray = sortedData[deprecatedGroup];
                itemsArray.push(deprecatedItem);
                sortedData[deprecatedGroup] = itemsArray;
            }
            $scope.deprecatedItems = sortedData;
        }, function(err) {
             $scope.err = err;
        });
});