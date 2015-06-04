angular.module('starter.NotificationCtrl').controller('Notification2Ctrl', ['$scope', '$state', 'NotificationService', 'CategoryService', 'localStorageService',
    function($scope, $state, NotificationService, CategoryService, localStorageService) {
    	console.log('into Notification2Ctrl');
        
        var encodedlogin = "";
        var notificationtype = "";

        $scope.allCategories = [];
        $scope.showadmin = false;
        $scope.submitSuccess = false;
        $scope.notification = {};
        
        getLocalStorage();

        function getLocalStorage() {
            encodedlogin = localStorageService.get("ls-encoded");
            notificationtype = localStorageService.get("ls-type");
            var admin = localStorageService.get("ls-admin");
            if(admin){
                $scope.showadmin = true;
            }else{
                $scope.showadmin = false;
            }
            console.log("$scope.showadmin",$scope.showadmin);
            loadCategories();
        }

        // Do this when createNotification is a success
        function createNotificationSuccess(success){
            $scope.success = success;
            $scope.submitSuccess = true;
            $state.go('app.notificationfinal');
        }

        // Do this when createUser failed
        function createNotificationError(error){
            $scope.error = error;
        }

        $scope.postNotification = function(isValid){
            if(isValid){
                console.log("$scope.notification.text",$scope.notification.text);
                console.log("$scope.notification.title",$scope.notification.title);
                console.log("$scope.notification.categoryid",$scope.notification.categoryid);
                var result = NotificationService.postNotification(encodedlogin,$scope.notification.title,$scope.notification.text,notificationtype,$scope.notification.categoryid);
                result.success(createNotificationSuccess).error(createNotificationError);
                
            }
                        
        };

        function loadCategories() {
            var result = CategoryService.getCategories(encodedlogin);
            result.success(getCategoriesSuccess).error(getCategoriesError);
        }

        function getCategoriesSuccess(success) {
            console.log("success");
            $scope.allCategories = success;
            console.log($scope.allCategories);
            console.log($scope.allCategories[0]._id);
        }

        function getCategoriesError(error) {
            console.log("error");
            $scope.error = error;
        }
    }
]);