app.controller('CreateCtrl', function ($scope, ItemService) {
    // Initialize values to make loading fluid
    $scope.belong_items = ['IOS', 'ANDROID', 'WEB'];
    $scope.item = {
        deprecation_date: moment().format(),
        unusable_date: moment().add(6, 'month').format()
    };
    $scope.saveItem = function(){
        console.log($scope.item);
    };
});