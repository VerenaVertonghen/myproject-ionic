angular.module('starter.UserCtrl').controller('RegisterCtrl', ['$scope', '$state','UserService',
    function($scope, $state, UserService) {
        console.log('into RegisterCtrl');

        $scope.inputType = 'password';
        $scope.user = {};
        $scope.usermessage = false;
        $scope.registererror = false;
        $scope.registersuccess = false;

        var email = '';
        var firstname = '';
        var lastname = '';
        var password = '';

        // Do this when createUser is a success
        function createUserSuccess(success){
            $scope.success = success;
            $scope.usermessage = false;
            $scope.registererror = false;
            $scope.registersuccess = true;
        }

        // Do this when createUser failed
        function createUserError(error){
            $scope.error = error;
            $scope.usermessage = false;
            $scope.registersuccess = false;
            $scope.registererror = true;
        }

        function getUserSuccess(success) {
            $scope.singleUser = success;
            $scope.usermessage = false;
            $scope.registererror = false;
            $scope.usermessage = true;
        }

        function getUserError(error) {
            $scope.error = error;
            var result = UserService.createUser(email, firstname, lastname, password);
            result.success(createUserSuccess).error(createUserError);
            //$state.go('login');
        }

        // Register
        $scope.register = function(isValid) {
            if (isValid) {
                var result = UserService.getUserByEmail($scope.user.email);
                result.success(getUserSuccess).error(getUserError);
                email = $scope.user.email;
                firstname = $scope.user.firstname;
                lastname = $scope.user.lastname;
                password = $scope.user.password;

                // var result = UserService.createUser($scope.user.email, $scope.user.firstname, $scope.user.lastname, $scope.user.password);
                // result.success(createUserSuccess).error(createUserError);
                // $state.go('login');
            }
        };

        // Go to Login
        $scope.toLogin = function() {
            $state.go('login');
        };

        // Hide & show password function
        $scope.hideShowPassword = function() {
            if ($scope.inputType == 'password') $scope.inputType = 'text';
            else $scope.inputType = 'password';
        };
    }
]);