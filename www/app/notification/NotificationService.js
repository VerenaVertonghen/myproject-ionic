angular.module('starter.NotificationService', []).factory('NotificationService', ['$http', '$q', '$base64', 'apiUrl',
    function($http, $q, $base64, apiUrl) {
        return {
            getNotifications: getNotifications,
            postNotification: postNotification,
            getNotification: getNotification,
            editNotification: editNotification,
            deleteNotification: deleteNotification,
            getNotificationAdvice: getNotificationAdvice,
            getMyNotifications: getMyNotifications
        };

        function getMyNotifications($encodedLogin) {
            console.log("into Service getMyNotifications");
            console.log("apiUrl", apiUrl);
            console.log("$encodedLogin", $encodedLogin);

            var request = $http({
                method: "get",
                url: apiUrl + "/mynotifications",
                headers: {
                    'Authorization': 'Basic ' + $encodedLogin
                }
            });
            return request;
        }

        function getNotification($encodedLogin,$notificationid) {
            console.log("into Service getStates");
            console.log("apiUrl", apiUrl);
            
            var request = $http({
                method: "get",
                url: apiUrl + "/notifications/" + $notificationid,
                headers: {
                    'Authorization': 'Basic ' + $encodedLogin
                }
            });
            return request;
        }

        function getNotifications($encodedLogin) {
            console.log("into Service getStates");
            console.log("apiUrl", apiUrl);
            
            var request = $http({
                method: "get",
                url: apiUrl + "/notifications",
                headers: {
                    'Authorization': 'Basic ' + $encodedLogin
                }
            });
            return request;
        }

        function postNotification($encodedLogin,$title,$text,$type,$categoryid) {
            console.log("into Service postNotification");
            console.log("apiUrl", apiUrl);
            console.log("encodedLogin",$encodedLogin);
            console.log("title",$title);
            console.log("text",$text);
            console.log("type",$type);
            
            var request = $http({
                method: "post",
                url: apiUrl + "/notifications",
                headers: {
                    'Authorization': 'Basic ' + $encodedLogin
                },
                data: {
                    'title':$title,
                    'text':$text,
                    'type':$type,
                    'category':$categoryid
                }
            });
            return request;
        }

        function editNotification($encodedLogin,$notificationid,$title,$type,$text) {
            console.log("into Service editNotification");
            console.log("apiUrl", apiUrl);
            
            var request = $http({
                method: "put",
                url: apiUrl + "/notifications/" + $notificationid,
                headers: {
                    'Authorization': 'Basic ' + $encodedLogin
                },
                data: {
                    'title':$title,
                    'type':$type,
                    'text':$text
                }
            });
            return request;
        }

        function deleteNotification($encodedLogin,$notificationid) {
            console.log("into Service deleteNotification");
            console.log("apiUrl", apiUrl);
            
            var request = $http({
                method: "delete",
                url: apiUrl + "/notifications/" + $notificationid,
                headers: {
                    'Authorization': 'Basic ' + $encodedLogin
                }
            });
            return request;
        }

        function getNotificationAdvice($encodedLogin,$categoryid) {
            console.log("into Service getNotificationAdvice");
            console.log("apiUrl", apiUrl);
            console.log("$categoryid",$categoryid);
            
            var request = $http({
                method: "get",
                url: apiUrl + "/notificationsbycategory/"+ $categoryid +"/type/advice",
                headers: {
                    'Authorization': 'Basic ' + $encodedLogin
                }
            });
            return request;
        }
    }
]);