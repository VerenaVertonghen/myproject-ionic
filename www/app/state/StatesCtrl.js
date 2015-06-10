angular.module('starter.StateCtrl').controller('StatesCtrl', ['$scope', '$state', 'StateService', 'CategoryService', 'UserService', 'localStorageService',
    function($scope, $state, StateService, CategoryService, UserService, localStorageService) {
        console.log('into StatesCtrl');

        $scope.allStates = [];
        $scope.allCategories = [];
        $scope.showadmin = false;
        
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
            loadStates();
            loadCategories();
        }

        function loadStates() {
            var result = StateService.getMyStates(encodedlogin);
            result.success(getStatesSuccess).error(getStatesError);
        }

        function getStatesSuccess(success) {
            $scope.allStates = success;
            //console.log($scope.allStates);
        }

        function getStatesError(error) {
            $scope.error = error;
        }

        function loadCategories() {
            var result = CategoryService.getCategories(encodedlogin);
            result.success(getCategoriesSuccess).error(getCategoriesError);
        }

        function getCategoriesSuccess(success) {
            $scope.allCategories = success;
            //console.log($scope.allCategories);
        }

        function getCategoriesError(error) {
            $scope.error = error;
        }

        function removeAllExpressions() {
            var result = UserService.removeExpressions(encodedlogin);
            result.success(removeAllExpressionsSuccess).error(removeAllExpressionsError);
        }

        function removeAllExpressionsSuccess(success) {
            $scope.allExpressionsSuccess = success;
            console.log("remove success",success);
            $state.go('app.states');
        }

        function removeAllExpressionsError(error) {
            $scope.error = error;
            //console.log("remove error",error);
        }

        $scope.expressFeelings = function(){
            $state.go('app.state1');
        };

        $scope.removeExpressions = function(){
            removeAllExpressions();
        };
    }
]);