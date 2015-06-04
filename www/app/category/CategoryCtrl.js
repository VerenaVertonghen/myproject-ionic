angular.module('starter.CategoryCtrl', []).controller('CategoryCtrl', ['$scope', '$state', 'CategoryService', 'localStorageService',
    function($scope, $state, CategoryService, localStorageService) {
        console.log('into CategoryCtrl');
        
        $scope.allCategories = [];
        
        var encodedlogin = "";

        loadCategories();

        function getLocalStorage() {
            encodedlogin = localStorageService.get("ls-encoded");
            loadUser();
        }

        function loadCategories() {
            var result = CategoryService.getCategories(encodedlogin);
            result.success(getCategoriesSuccess).error(getCategoriesError);
        }

        function getCategoriesSuccess(success) {
            $scope.allCategories = success;
            console.log($scope.allCategories);
        }

        function getCategoriesError(error) {
            $scope.error = error;
        }
    }
]);