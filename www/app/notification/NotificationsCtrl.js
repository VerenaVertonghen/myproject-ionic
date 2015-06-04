angular.module('starter.NotificationCtrl').controller('NotificationsCtrl', ['$scope', '$state', 'NotificationService', 'localStorageService',
    function($scope, $state, NotificationService, localStorageService) {
    	console.log('into NotificationsCtrl');
        
        $scope.allNotifications = [];
        
        var encodedlogin = "";
        // var admin = false;
        $scope.showadmin = false;
        
        getLocalStorage();

        function getLocalStorage() {
            encodedlogin = localStorageService.get("ls-encoded");
            var admin = localStorageService.get("ls-admin");
            if(admin){
                $scope.showadmin = true;
            }else{
                $scope.showadmin = false;
            }
            console.log("$scope.showadmin",$scope.showadmin);

            loadNotifications();

        }

        function loadNotifications() {
            var result = NotificationService.getMyNotifications(encodedlogin);
            result.success(getNotificationsSuccess).error(getNotificationsError);
        }

        function getNotificationsSuccess(success) {
            $scope.allNotifications = success;
            console.log("success",success);
        }

        function getNotificationsError(error) {
            $scope.error = error;
        }


        $scope.createNotification = function(){
            $state.go('app.notification1');
        };
    }
]);