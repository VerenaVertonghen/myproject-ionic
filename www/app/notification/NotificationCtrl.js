angular.module('starter.NotificationCtrl').controller('NotificationCtrl', ['$scope', '$state', '$stateParams', 'NotificationService', 'localStorageService',
    function($scope, $state, $stateParams, NotificationService, localStorageService) {
    	console.log('into NotificationCtrl');
        
        $scope.notification = [];

        var encodedlogin = "";

        getLocalStorage();

        function getLocalStorage() {
            encodedlogin = localStorageService.get("ls-encoded");
            loadNotification();
        }

        function loadNotification() {
        	console.log("$stateParams.notificationId",$stateParams.notificationId);
            var result = NotificationService.getNotification(encodedlogin,$stateParams.notificationId);
            result.success(getNotificationSuccess).error(getNotificationError);
        }

        function getNotificationSuccess(success) {
            $scope.notification = success;
            console.log(" notification success",success);
        }

        function getNotificationError(error) {
            $scope.error = error;
        }
    }
]);