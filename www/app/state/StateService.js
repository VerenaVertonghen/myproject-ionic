angular.module('starter.StateService', []).factory('StateService', ['$http', '$q', '$base64', 'apiUrl',
    function($http, $q, $base64, apiUrl) {
        return {
            getStates: getStates,
            getMyStates: getMyStates,
            postState: postState,
            postTextState: postTextState,
            getMyState: getMyState,
            getState: getState
        };

        function getStates($encodedLogin) {
            console.log("into Service getStates");
            console.log("apiUrl", apiUrl);

            var request = $http({
                method: "get",
                url: apiUrl + "/states",
                headers: {
                    'Authorization': 'Basic ' + $encodedLogin
                }
            });
            return request;
        }

        function getState($encodedLogin,$stateid) {
            console.log("into Service getStates");
            console.log("apiUrl", apiUrl);

            var request = $http({
                method: "get",
                url: apiUrl + "/states/" + $stateid,
                headers: {
                    'Authorization': 'Basic ' + $encodedLogin
                }
            });
            return request;
        }

        function getMyState($encodedLogin,$stateid) {
            console.log("into Service getMyState");
            console.log("apiUrl", apiUrl);

            var request = $http({
                method: "get",
                url: apiUrl + "/states/" + $stateid,
                headers: {
                    'Authorization': 'Basic ' + $encodedLogin
                }
            });
            return request;
        }

        function getMyStates($encodedLogin) {
            console.log("into Service getMyStates");
            console.log("apiUrl", apiUrl);
            console.log("$encodedLogin", $encodedLogin);

            var request = $http({
                method: "get",
                url: apiUrl + "/mystates",
                headers: {
                    'Authorization': 'Basic ' + $encodedLogin
                }
            });
            return request;
        }

        function postState($encodedLogin,$categoryid) {
            console.log("into Service postState");
            console.log("apiUrl", apiUrl);
            console.log("encodedLogin",$encodedLogin);
            console.log("categoryid",$categoryid);

            var request = $http({
                method: "post",
                url: apiUrl + "/states",
                headers: {
                    'Authorization': 'Basic ' + $encodedLogin
                },
                data: {
                    'category':$categoryid
                }
            });
            return request;
        }

        function postTextState($encodedLogin,$text,$categoryid) {
            console.log("into Service postTextState");
            console.log("apiUrl", apiUrl);
            console.log("encodedLogin",$encodedLogin);
            console.log("text",$text);
            console.log("categoryid",$categoryid);

            var request = $http({
                method: "post",
                url: apiUrl + "/states",
                headers: {
                    'Authorization': 'Basic ' + $encodedLogin
                },
                data: {
                    'text':$text,
                    'category':$categoryid
                }
            });
            return request;
        }
    }
]);