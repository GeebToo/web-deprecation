/**
 * This service fetch the data for a the deprecated items
 * @param {http} http requester
 * @param {q} queue item
 */
app.factory('ItemService', function ($http, $q) {
    var factory = {
        items: [],
        getItems: function () {
            var deferred = $q.defer();
            $http
                    .get('http://localhost:1337/api/deprecated/')
                    .success(function (data, status) {
                        factory.items = data;
                        deferred.resolve(factory.items);
                    })
                    .error(function (data, status) {
                        deferred.reject({status: status});
                    });
            return deferred.promise;
        }
    };
    return factory;
});