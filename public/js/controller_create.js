app.config(function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
        return moment(date).format('YYYY/MM/DD');
    };
}).controller('CreateCtrl', function ($scope, ItemService) {
    // Initialize values to make loading fluid
    $scope.belong_items = ['IOS', 'ANDROID', 'WEB'];
    $scope.item = {
        deprecation_date: new Date(moment().format()),
        unusable_date: new Date(moment().add(6, 'month').format())
    };
    $scope.saveItem = function(){
        $scope.item.deprecation_date = moment($scope.item.deprecation_date).format(); // Convert dates
        $scope.item.unusable_date = moment($scope.item.unusable_date).format();
        console.log($scope.item);
        ItemService
            .saveItem($scope.item)
            .then(function(data){
                // Dialog, add another or go to list
                console.log(data);
            }, function(err) {
                $scope.err = err;
            });
    };
});