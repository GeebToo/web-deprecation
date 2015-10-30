/**
 * This service fetch the data for a the deprecated items
 * @param {http} http requester
 * @param {q} queue item
 */
app.factory('ItemService', function ($http, $q) {
    var factory = {
        items: [],
        result: {},
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
        },
        saveItem: function(item) {
            var deferred = $q.defer();
            $http
                    .post('http://localhost:1337/api/deprecated/', item)
                    .success(function (data, status) {
                        factory.result = {'status': status, 'item': data};
                        deferred.resolve(factory.result);
                    })
                    .error(function (data, status) {
                        deferred.reject({status: status});
                    });
            return deferred.promise;
        },
        deleteItem: function(item) {
             var deferred = $q.defer();
             $http
                    .delete('http://localhost:1337/api/deprecated/'+ item._id)
                    .success(function (data, status) {
                        deferred.resolve();
                    })
                    .error(function (data, status) {
                        deferred.reject({status: status});
                    });
            return deferred.promise;           
        }
    };
    return factory;
});