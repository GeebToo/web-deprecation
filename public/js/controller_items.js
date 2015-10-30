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
                item: item,
                baseScope : $scope
            }
        });
    };
    // Add popup
    $scope.showAdd = function() {
        $mdDialog.show({
            controller: AddDialogController,
            templateUrl: 'partials/create',
            locals: {
                item : {
                    deprecation_date: new Date(moment().format()),
                    unusable_date: new Date(moment().add(6, 'month').format())
                },
                baseScope : $scope
            }
        });
    };
    // Load data
    ItemService
        .getItems()
        .then(function(data){
            var dataCount = data.length;
            for(var index = 0; index < dataCount; index++) {
                addItemCriticity(data[index]);
            }
            $scope.data = data;
            sortItems();
        }, function(err) {
             $scope.err = err;
        });
    /**
     * Sort the items
     */
    function sortItems() {
        switch($scope.sort) {
            case 'rootSort':
                $scope.sortByRoot();
                break;
            case 'appsSort':
                $scope.sortByApps();
                break;
            case 'dateSort':
                $scope.sortByDate();
                break;
        }
    }
    /**
     * Add criticity to the item and parse its date
     */
    function addItemCriticity(item) {
        var itemDeprecationDate = item.deprecation_date;
        var itemUnusableDate = item.unusable_date;
        itemDeprecationDate = moment(itemDeprecationDate);
        itemUnusableDate = moment(itemUnusableDate);
        var now = moment();
        item.deprecated_from = now.diff(itemDeprecationDate, 'days'); // If deprecated 1 month ago: 30 or 31
        var unusableDiff = now.diff(itemUnusableDate, 'days');
        if(unusableDiff < 0) {
            // now is before itemUnusableDate
            item.unusable_in = -unusableDiff;
        } else {
            // now is after itemUnusableDate
            item.unusable_in = 0;
        }
        if(item.unusable_in < 200) {
            // Less than 6 month
            item.criticity = 'low';
        }
        if(item.unusable_in < 90) {
            // Less than 3 month
            item.criticity = 'medium';
        }
        if(item.unusable_in < 30) {
            // Less than 1 month
            item.criticity = 'high';
        }
        item.deprecation_date = itemDeprecationDate.format('L');
        item.unusable_date = itemUnusableDate.format('L');
    }
    /* Dialog Controller is used when showing the item, item is injected by locals */
    function ItemDialogController($scope, $mdDialog, baseScope, item) {
        $scope.item = item;
        $scope.ok = function() {
            $mdDialog.hide();
        };
        $scope.delete = function() {
            ItemService
                .deleteItem($scope.item)
                .then(function(data) {
                    console.log(data);
                    // Todo toast
                    // Todo remove item from list on screen
                    for(var index in baseScope.data) {
                        if(baseScope.data[index]._id == data._id) {
                            baseScope.data.splice(index, 1);
                            break;
                        }
                    }
                    sortItems();
                    $mdDialog.hide();
                }, function(err) {
                    console.log(err);
                    $scope.err = err;
                    $mdDialog.hide();
                });
        }
    };
    function AddDialogController($scope, $mdDialog, baseScope, item) {
        $scope.item = item;
        $scope.belong_items = ['IOS', 'ANDROID', 'WEB'];
        $scope.validate = function() {
            $scope.item.deprecation_date = moment($scope.item.deprecation_date).format(); // Convert dates
            $scope.item.unusable_date = moment($scope.item.unusable_date).format();
            console.log($scope.item);
            ItemService
                .saveItem($scope.item)
                .then(function(data){
                    // Good, item saved, toast
                    var addedElement = data.item;
                    addItemCriticity(addedElement);
                    baseScope.data.push(addedElement);
                    sortItems();
                    $mdDialog.hide();
                }, function(err) {
                    $scope.err = err;
                    $mdDialog.hide();
                });
            };
        $scope.cancel = function() {
            $mdDialog.hide();
        };
    }
});