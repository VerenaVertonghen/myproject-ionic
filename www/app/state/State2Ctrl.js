angular.module('starter.StateCtrl').controller('State2Ctrl', ['$scope', '$state', 'StateService', 'CategoryService','UserService', 'localStorageService',
    function($scope, $state, StateService, CategoryService, UserService, localStorageService) {
        console.log('into State2Ctrl');
        
        $scope.allCategories = [];
        $scope.showup = false;
        $scope.showdown = false;
        $scope.submitSuccess = false;
        $scope.categoryid = {};
        
        var encodedlogin = "";
        var feeling = "";
        var stateid = "";

        getLocalStorage();

        function getLocalStorage() {
            encodedlogin = localStorageService.get("ls-encoded");
            feeling = localStorageService.get("ls-feeling");
            loadCategories();
        }

        function updateUser() {
            var result = UserService.addStateToUser(encodedlogin,stateid);
            result.success(updateUserSuccess).error(updateUserError);
        }

        function updateUserSuccess(success) {
            $scope.state = success;
            $state.go('app.statefinal');

            //$state.go($state.cur'app.statefinal');
        }

        function updateUserError(error) {
            $scope.error = error;
        }

        function loadCategories() {
            var result = CategoryService.getCategories(encodedlogin);
            result.success(getCategoriesSuccess).error(getCategoriesError);

            if(feeling == 'up'){
                $scope.showup = true;
                $scope.showdown = false;
            }
            if(feeling == 'down'){
                $scope.showdown = true;
                $scope.showup = false;
            }
        }

        function getCategoriesSuccess(success) {
            $scope.allCategories = success;
            console.log($scope.allCategories);
        }

        function getCategoriesError(error) {
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

        $scope.postState = function(){
            if($scope.categoryid.id){
                localStorageService.set("ls-catid", $scope.categoryid.id);
                var result = StateService.postState(encodedlogin,$scope.categoryid.id);
                result.success(createStateSuccess).error(createStateError);
            }else{
                alert("You have not selected a feeling.");
            }
        };

        $scope.nextStep = function(){
            if($scope.categoryid.id){
                localStorageService.set("ls-catid", $scope.categoryid.id);
                $state.go('app.state3');
            }else{
                alert("You have not selected a feeling.");
            }
        };
    }
]);