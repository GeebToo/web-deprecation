app.controller('ItemCtrl', function ($scope, ItemService) {
    // Initialize values to make loading fluid
    $scope.sort = 'rootSort';
    $scope.data = {};
    $scope.deprecatedItems = {};
    // Declare functions
    $scope.sortByRoot = function() {
        $scope.sort = 'rootSort';
        var sortedData = {};
        var dataCount = $scope.data.length;
        for(var index = 0; index < dataCount; index++) {
            var deprecatedItem = $scope.data[index];
            var deprecatedGroup = deprecatedItem.deprecated_item.group + '';
            if(sortedData[deprecatedGroup] == undefined) {
                sortedData[deprecatedGroup] = [];
            }
            var itemsArray = sortedData[deprecatedGroup];
            itemsArray.push(deprecatedItem);
            sortedData[deprecatedGroup] = itemsArray;
        }
        $scope.deprecatedItems = sortedData;
    };
    $scope.sortByApps = function() {
        $scope.sort = 'appsSort';
        var sortedData = {};
        var dataCount = $scope.data.length;
        for(var index = 0; index < dataCount; index++) {
            var deprecatedItem = $scope.data[index];
            var deprecatedGroup = deprecatedItem.belongs_to + '';
            if(sortedData[deprecatedGroup] == undefined) {
                sortedData[deprecatedGroup] = [];
            }
            var itemsArray = sortedData[deprecatedGroup];
            itemsArray.push(deprecatedItem);
            sortedData[deprecatedGroup] = itemsArray;
        }
        $scope.deprecatedItems = sortedData;
    };
    $scope.sortByDate = function() {
        $scope.sort = 'dateSort';
        alert('date');
    }
    // Load data
    ItemService
        .getItems()
        .then(function(data){
            var dataCount = data.length;
            for(var index = 0; index < dataCount; index++) {
                var itemDeprecationDate = data[index].deprecation_date;
                var itemUnusableDate = data[index].unusable_date;
                data[index].deprecation_date = moment(itemDeprecationDate).fromNow();
                data[index].unusable_date = moment(itemUnusableDate).fromNow();
            }
            $scope.data = data;
            $scope.sortByApps();
        }, function(err) {
             $scope.err = err;
        });
});