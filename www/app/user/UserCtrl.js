angular.module('starter.UserCtrl')
.config(function($provide) {
    $provide.decorator('$state', function($delegate)
    {
        $delegate.go = function(to, params, options)
        {
            return $delegate.transitionTo(to, params, angular.extend(
            {
                reload: true,
                inherit: true,
                relative: $delegate.$current
            }, options));
        };
        return $delegate;
    });
})
.controller('UserCtrl', ['$scope', '$state', 'UserService', 'StateService', 'localStorageService','$base64',
    function($scope, $state, UserService, StateService, localStorageService,$base64) {
        console.log('into UserCtrl');
        
        $scope.singleUser = [];
        $scope.allStates = [];
        $scope.showadmin = false;
        
        var encodedlogin = "";
        
        getLocalStorage();


        function getLocalStorage() {
            encodedlogin = localStorageService.get("ls-encoded");
            loadUser();
            //loadStates();
            var admin = localStorageService.get("ls-admin");
            if(admin){
                $scope.showadmin = true;
            }else{
                $scope.showadmin = false;
            }
        }

        function loadUser() {
            var result = UserService.getUser(encodedlogin);
            result.success(getUserSuccess).error(getUserError);
        }

        function getUserSuccess(success) {
            $scope.singleUser = success;
        }

        function getUserError(error) {
            $scope.error = error;
        }

        // function loadStates() {
        //     var result = StateService.getMyStates(encodedlogin);
        //     result.success(getStatesSuccess).error(getStatesError);
        // }

        // function getStatesSuccess(success) {
        //     $scope.allStates = success;
        // }

        // function getStatesError(error) {
        //     $scope.error = error;
        // }

        // Logout
        $scope.logout = function() {
            localStorageService.clearAll();
            $state.go('login');
        };

        // Go to the first step to express your feelings
        $scope.expressFeelings = function(){
            $state.go('app.state1');
        };
    }
    ]);