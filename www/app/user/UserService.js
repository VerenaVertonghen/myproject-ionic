angular.module('starter.UserService', []).factory('UserService', ['$http', '$q', '$base64', 'apiUrl', 'welcomeNotificationId',
    function($http, $q, $base64, apiUrl, welcomeNotificationId) {
        return {
            getUser: getUser,
            createUser: createUser,
            updateUserState: updateUserState,
            addStateToUser: addStateToUser,
            addNotificationToUser: addNotificationToUser
        };

        function getUser($encodedLogin) {
            console.log("into Service getUser");
            console.log("$encodedLogin");
            console.log($encodedLogin);

            var request = $http({
                method: "get",
                url: apiUrl + "/myprofile",
                headers: {
                    // 'Host': 'http://cosycare.eu-gb.mybluemix.net/',
                    'Authorization': 'Basic ' + $encodedLogin
                }
            });
            return request;
        }

        function addStateToUser($encodedLogin,$stateid) {
            console.log("into Service addStateToUser");
            console.log("apiUrl", apiUrl);
            console.log("encodedLogin",$encodedLogin);
            console.log("stateid",$stateid);

            var request = $http({
                method: "post",
                url: apiUrl + "/addstatetouser",
                headers: {
                    'Authorization': 'Basic ' + $encodedLogin
                },
                data: {
                    'state':$stateid
                }
            });
            return request;
        }

        function addNotificationToUser($encodedLogin,$notificationid) {
            console.log("into Service addNotificationToUser");
            console.log("apiUrl", apiUrl);
            console.log("encodedLogin",$encodedLogin);
            console.log("notificationid",$notificationid);

            var request = $http({
                method: "post",
                url: apiUrl + "/addnotificationtouser",
                headers: {
                    'Authorization': 'Basic ' + $encodedLogin
                },
                data: {
                    'notification':$notificationid
                }
            });
            return request;
        }

        function createUser($email,$firstname,$lastname,$password) {
            console.log("into Service createUser");

            var request = $http({
                method: "post",
                url: apiUrl + "/signup",
                data: { 
                    "firstname": $firstname,
                    "lastname": $lastname,
                    "password": $password,
                    "email": $email,
                    "notifications": [
                        welcomeNotificationId
                    ]
                }
            });
            return request;
        }

        function updateUserState($encodedLogin,$stateid) {
            console.log("into Service updateUserState");
            console.log("$encodedLogin",$encodedLogin);
            console.log("$stateid",$stateid);

            var request = $http({
                method: "put",
                url: apiUrl + "/updateprofile",
                headers: {
                    'Authorization': 'Basic ' + $encodedLogin
                },
                data: { 
                    "state": $stateid
                }
            });
            return request;
        }
    }
]);