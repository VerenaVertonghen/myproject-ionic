angular.module('starter.NotificationCtrl').controller('NotificationsCtrl', ['$scope', '$state', 'NotificationService', 'UserService', 'localStorageService',
    function($scope, $state, NotificationService, UserService, localStorageService) {
    	console.log('into NotificationsCtrl');
        
        $scope.allNotifications = [];
        $scope.showadmin = false;

        $scope.reverse = function(array) {
            var copy = [].concat(array);
            return copy.reverse();
        }
        
        var encodedlogin = "";
        
        getLocalStorage();

        function getLocalStorage() {
            encodedlogin = localStorageService.get("ls-encoded");
            var admin = localStorageService.get("ls-admin");
            if(admin){
                $scope.showadmin = true;
            }else{
                $scope.showadmin = false;
            }
            //console.log("$scope.showadmin",$scope.showadmin);
            loadNotifications();

        }

        function loadNotifications() {
            var result = NotificationService.getMyNotifications(encodedlogin);
            result.success(getNotificationsSuccess).error(getNotificationsError);
        }

        function getNotificationsSuccess(success) {
            $scope.allNotifications = success;
            console.log("allNotifications",$scope.allNotifications);
        }

        function getNotificationsError(error) {
            $scope.error = error;
        }

        function removeAllNotifications() {
            var result = UserService.removeNotifications(encodedlogin);
            result.success(removeAllNotificationsSuccess).error(removeAllNotificationsError);
        }

        function removeAllNotificationsSuccess(success) {
            $scope.allNotificationsSuccess = success;
            //console.log("remove success",success);
            $state.go('app.notifications');
        }

        function removeAllNotificationsError(error) {
            $scope.error = error;
            //console.log("remove error",error);
        }

        $scope.createNotification = function(){
            $state.go('app.notification1');
        };

        $scope.removeNotifications = function(){
            removeAllNotifications();
        };
    }
]);