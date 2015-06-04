angular.module('starter.NotificationCtrl').controller('Notification1Ctrl', ['$scope', '$state', 'NotificationService', 'localStorageService',
    function($scope, $state, NotificationService, localStorageService) {
    	console.log('into Notification1Ctrl');
        
        $scope.allNotifications = [];
        $scope.notification = {};
        
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
            var result = NotificationService.getNotifications(encodedlogin);
            result.success(getNotificationsSuccess).error(getNotificationsError);
        }

        function getNotificationsSuccess(success) {
            $scope.allNotifications = success;
        }

        function getNotificationsError(error) {
            $scope.error = error;
        }

        $scope.nextStep = function(){
            console.log("nextStep");
            console.log("$scope.notification.type",$scope.notification.type)
            if($scope.notification.type){
                localStorageService.set("ls-type", $scope.notification.type);
                $state.go('app.notification2');
            }else{
                alert("You have not selected a type.");
            }  
        };
    }
]);