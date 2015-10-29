app.controller('ItemCtrl', function ($scope, ItemService, $mdDialog) {
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
        var sortedData = {};
        var dataCount = $scope.data.length;
        for(var index = 0; index < dataCount; index++) {
            var deprecatedItem = $scope.data[index];
            var deprecatedGroup = deprecatedItem.unusable_in + '';
            if(sortedData[deprecatedGroup] == undefined) {
                sortedData[deprecatedGroup] = [];
            }
            var itemsArray = sortedData[deprecatedGroup];
            itemsArray.push(deprecatedItem);
            sortedData[deprecatedGroup] = itemsArray;
        }
        $scope.deprecatedItems = sortedData;
    };
    // Item methods
    $scope.showItem = function(item) {
        $mdDialog.show({
            controller: ItemDialogController,
            templateUrl: 'partials/item',
            locals: {
                item: item
            }
        });
    };
    // Add popup
    $scope.showAdd = function() {
        $mdDialog.show({
            controller: AddDialogController,
            templateUrl: 'partials/create'
        });
    };
    // Load data
    ItemService
        .getItems()
        .then(function(data){
            var dataCount = data.length;
            for(var index = 0; index < dataCount; index++) {
                var itemDeprecationDate = data[index].deprecation_date;
                var itemUnusableDate = data[index].unusable_date;
                itemDeprecationDate = moment(itemDeprecationDate);
                itemUnusableDate = moment(itemUnusableDate);
                var now = moment();
                data[index].deprecated_from = now.diff(itemDeprecationDate, 'days'); // If deprecated 1 month ago: 30 or 31
                var unusableDiff = now.diff(itemUnusableDate, 'days');
                if(unusableDiff < 0) {
                    // now is before itemUnusableDate
                    data[index].unusable_in = -unusableDiff;
                } else {
                    // now is after itemUnusableDate
                    data[index].unusable_in = 0;
                }
                if(data[index].unusable_in < 200) {
                    // Less than 6 month
                    data[index].criticity = 'low';
                }
                if(data[index].unusable_in < 90) {
                    // Less than 3 month
                    data[index].criticity = 'medium';
                }
                if(data[index].unusable_in < 30) {
                    // Less than 1 month
                    data[index].criticity = 'high';
                }
                data[index].deprecation_date = itemDeprecationDate.format('L');
                data[index].unusable_date = itemUnusableDate.format('L');
            }
            $scope.data = data;
            $scope.sortByApps();
        }, function(err) {
             $scope.err = err;
        });
    /* Dialog Controller is used when showing the item, item is injected by locals */
    function ItemDialogController($scope, $mdDialog, item) {
        $scope.item = item;
        $scope.ok = function() {
            $mdDialog.hide();
        };
    };
    function AddDialogController($scope, $mdDialog) {
        $scope.validate = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.hide();
        };
    }
});