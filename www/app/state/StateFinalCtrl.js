angular.module('starter.StateCtrl').controller('StateFinalCtrl', ['$scope', '$state','$ionicHistory', 'StateService', 'NotificationService', 'UserService', 'localStorageService',
    function($scope, $state, $ionicHistory, StateService, NotificationService, UserService, localStorageService) {
        console.log('into StateFinalCtrl');

        var encodedlogin = "";
        var feeling = "";
        var catid = "";
        var stateid = "";
        var notificationid = "";

        $scope.state = [];
        $scope.notification = [];

        getLocalStorage();

        function getLocalStorage() {
            encodedlogin = localStorageService.get("ls-encoded");
            feeling = localStorageService.get("ls-feeling");
            catid = localStorageService.get("ls-catid");
            stateid = localStorageService.get("ls-stateid");
            loadState();
        }

        function loadState() {
            var result = StateService.getMyState(encodedlogin,stateid);
            result.success(getStateSuccess).error(getStateError);
        }

        function getStateSuccess(success) {
            $scope.state = success;
            //console.log($scope.state);
            loadNotification();
        }

        function getStateError(error) {
            $scope.error = error;
        }

        function loadNotification() {
            var result = NotificationService.getNotificationAdvice(encodedlogin,catid);
            result.success(getNotificationSuccess).error(getNotificationError);
        }

        function getNotificationSuccess(success) {
            $scope.notification = success;
            //console.log(" notification success",success);
            //console.log("$scope.notification._id",$scope.notification._id);
            notificationid = $scope.notification._id;
            addNotificationToUser();
        }

        function getNotificationError(error) {
            $scope.error = error;
        }

        function addNotificationToUser() {
            var result = UserService.addNotificationToUser(encodedlogin,notificationid);
            result.success(addNotificationToUserSuccess).error(addNotificationToUserError);
        }

        function addNotificationToUserSuccess(success) {
            $scope.notificationsuccess = success;
            //console.log("addNotificationToUserSuccess success",success);
        }

        function addNotificationToUserError(error) {
            $scope.error = error;
        }

        $scope.toExpressions = function(){
        	$state.go('app.states');
    	};
    }
]);