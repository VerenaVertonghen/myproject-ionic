angular.module('starter.StateCtrl').controller('StateCtrl', ['$scope', '$state', '$stateParams', 'StateService', 'CategoryService', 'localStorageService',
    function($scope, $state, $stateParams, StateService, CategoryService, localStorageService) {
        console.log('into StateCtrl');

        $scope.state = [];

        var encodedlogin = "";

        getLocalStorage();

        function getLocalStorage() {
            encodedlogin = localStorageService.get("ls-encoded");
            loadState();
        }

        function loadState() {
        	console.log("$stateParams.stateId",$stateParams.stateId);
            var result = StateService.getState(encodedlogin,$stateParams.stateId);
            result.success(getStateSuccess).error(getStateError);
        }

        function getStateSuccess(success) {
            $scope.state = success;
            console.log(" state success",success);
        }

        function getStateError(error) {
            $scope.error = error;
        }
    }
]);