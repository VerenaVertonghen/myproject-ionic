angular.module('starter.AppService', [])
.factory('AppService', ['$http', '$q', '$base64', 'apiUrl',
    function($http, $q, $base64, apiUrl) {
    }
])

/**
 * A simple example service that returns some data.
 */
.factory('ListService', ['$rootscope', '$q', '$cacheFactory', 
    function($rootScope, $q, $cacheFactory) {

    // Use an internal Cache for storing the List and map the operations to manage that from
    // Mobile Cloud SDK Calls
    var cache = $cacheFactory('');
    var options = {
        handleAs: 'JSON'
    };

    return {

        // Return all the Objects for a Given Class
        allCloud: function() {

            // get the Data Service
            var data = IBMData.getService();

            // Create a Defer as this is an async operation
            defer = $q.defer();

            // Clear the Cache with a new set
            cache.remove('items');

            // Retreive a Query instance of type "Item" and issue a find() action on it
            // to retreive all the items (NO PAGING)
            var query = data.Query.ofType("Item");
            query.find().done(function(list) {

                // Place the Items in the Cache
                cache.put('items', list);

                // return the Cache
                defer.resolve(cache.get('items'));

            },function(err){
                console.log(err);
                defer.reject(err);
            });

            // Get the Objects for a particular Type
            return defer.promise;

        },

        // Return the Cached List
        allCache: function() {

            // Return the Cached Items
            return cache.get('items');

        },

        add: function(name) {

            // Manage Defer on the Save
            var defer = $q.defer();

            // get the Data Service
            var data = IBMData.getService();

            // Create a new Item instance and then save it to the cloud
            var item = data.Object.ofType("Item", {"name":name});

            // add the Item to the Cache but we need to replace it when we
            // get a saved copy back
            var items = cache.get('items');

            // Check we have some items
            if (items) {
                cache.get('items').push(item);
            } else {
                defer.reject('no items defined');
            }

            // Save the Class in the Bluemix Cloud
            item.save().then(function(saved) {

                // Replace the Item
                items.forEach(function(item, i) { if (item.get('name') == saved.get('name')) items[i] = saved;});
                defer.resolve(saved);

            },function(err) {
                defer.reject(err);
            });

            // Return a promise for the async operation of save
            return defer.promise;

        },

        put: function(item) {

            // Create a deferred
            var defer = $q.defer();

            // get the Data Service
            var data = IBMData.getService();

            //Get the object with the given id
            data.Object.withId(item.getId()).then(function(item) {

                // Create Data to Update
                var attributes = {
                    name: item.get('name')
                };

                // Update the Contents of the Object
                item.set(attributes);

                // Save the updated items
                return item.save();

            }).done(function(saved) {



                defer.resolve(saved);
            },function(err){
                defer.reject(err);
            });        

            // Return a promise for the async operation of save
            return defer.promise;

        },

        del: function(item) {

            var defer = $q.defer();

            // get the Data Service
            var data = IBMData.getService();

            // Remove the Item from the Cache
            var items = cache.get('items');
            items.splice(items.indexOf(item), 1)

            //Get the object with the given id so we can delete it
            data.Object.withId(item.getId()).then(function(item) {
                // Delete the Item from the Cloud 
                return item.del();
            }).done(function(deleted) {
                // Validated it was deleted
                var isDeleted = deleted.isDeleted();
                if (deleted.isDeleted()) {
                    defer.resolve(deleted);
                } else {
                    defer.reject(err);
                }
            });

            // Remove it
            return defer.promise;

        }
    }
}])

/**
 * A Service that intialises MBaaS
 */
.factory('InitBluemix',['$rootscope','$http','$q',
    function($rootScope, $http, $q) {

        function init() {

            // Create a defer
            var defer = $q.defer();

            // Lets load the Configuration from the bluelist.json file
            $http.get("./config.json").success(function(config) {

                // Initialise the SDK
                IBMBluemix.initialize(config).done(function() {

                    // Let the user no they have logged in and can do some stuff if they require
                    console.log("Sucessful initialisation with Application : " + IBMBluemix.getConfig().getApplicationId());

                    // Initialize the Service
                    var data = IBMData.initializeService();

                    // Let the user no they have logged in and can do some stuff if they require
                    console.log("Sucessful initialisation Data Services " );

                    // Return the Data
                    defer.resolve();

                }, function(response) {
                    // Error
                    console.log("Error:", response);
                    defer.reject(response);
                });

                $rootScope.config = config;;
            });

            return defer.promise;

        };

        return {
            init: function() {
                return init();
            }
        }
}])
;