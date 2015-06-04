angular.module('starter.StateCtrl').controller('State3Ctrl', ['$scope', '$state', 'StateService', 'UserService', 'localStorageService',
    function($scope, $state, StateService, UserService, localStorageService) {
        console.log('into State3Ctrl');

        $scope.allStates = [];
        $scope.message = "";
        $scope.input = {};
        $scope.feeling = "";

        var encodedlogin = "";
        var feeling = "";
        var catid = "";
        var stateid = "";

        getLocalStorage();

        function getLocalStorage() {
            encodedlogin = localStorageService.get("ls-encoded");
            feeling = localStorageService.get("ls-feeling");
            $scope.feeling=feeling;
            catid = localStorageService.get("ls-catid");
            
            //IMPORTANT include some random messages in the api
            if(feeling=='up'){
                $scope.message="Glad to hear you are doing well! You can talk to me about anything.";
            }
            if(feeling=='down'){
                $scope.message="Sorry to hear you're having a bad moment, talking about it might make you feel a little better.";
            }
        }

        function updateUser() {
            var result = UserService.addStateToUser(encodedlogin,stateid);
            result.success(updateUserSuccess).error(updateUserError);
        }

        function updateUserSuccess(success) {
            $scope.state = success;
            $state.go('app.statefinal');
        }

        function updateUserError(error) {
            $scope.error = error;
        }

        function loadStates() {
            var result = StateService.getStates();
            result.success(getStatesSuccess).error(getStatesError);
        }

        function getStatesSuccess(success) {
            $scope.allStates = success;
            console.log($scope.allStates);
        }

        function getStatesError(error) {
            $scope.error = error;
        }

        function createStateSuccess(success){
            $scope.success = success;
            $scope.submitSuccess = true;
            stateid = $scope.success._id;
            localStorageService.set("ls-stateid", stateid);
            updateUser();
        }

        function createStateError(error){
            $scope.error = error;
        }

        $scope.postState = function(isValid){
            if(isValid){
                var result = StateService.postTextState(encodedlogin,$scope.input.text,catid);
                result.success(createStateSuccess).error(createStateError);
            }
        };
    }
]);