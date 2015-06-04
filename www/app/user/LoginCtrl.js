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
.controller('LoginCtrl', ['$scope', '$state', 'UserService', 'localStorageService','$base64',
    function($scope, $state, UserService, localStorageService,$base64) {
        console.log('into LoginCtrl');
        
        $scope.user = {};
        $scope.loginError = false;
        $scope.inputType = 'password';

        var encodedlogin = "";

        //localStorageService.clearAll();

        //encodedlogin = localStorageService.get('ls-encoded');

        //console.log("before localStorageService.get('ls-encoded')",encodedlogin);

        // Do this when getUser is a success
        function getUserSuccess(success) {
            $scope.singleUser = success;

            console.log("$scope.singleUser.role",$scope.singleUser.role);
            if($scope.singleUser.role === "admin"){
                localStorageService.set("ls-admin", true);    
            } else{
                localStorageService.set("ls-admin", false);  
            }
            localStorageService.set("ls-encoded", encodedlogin);
            console.log("after localStorageService.get('ls-encoded')",encodedlogin);
            $state.go('app.profile');
        }

        // Do this when getUser failed
        function getUserError(error) {
            console.log(error);
            $scope.error = error;
            $scope.loginError = true;
            $state.go('login');
        }

        // Login 
        $scope.login = function(user) {
            console.log('into login');
            console.log('username');
            console.log('password');
            console.log(user.username);
            console.log(user.password);
            // $scope.loginError = false;
            encodedlogin = $base64.encode(user.username + ":" + user.password);
            console.log("encodedlogin");
            console.log(encodedlogin);
            var result = UserService.getUser(encodedlogin);
            result.success(getUserSuccess).error(getUserError);
        };

        // Go to register
        $scope.toRegister = function() {
            $scope.loginError = false;
            $state.go('register');
        }

        // Hide & show password
        $scope.hideShowPassword = function() {
            if ($scope.inputType == 'password') $scope.inputType = 'text';
            else $scope.inputType = 'password';
        };
    }
    ]);