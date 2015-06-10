angular.module('starter.controllers', [])
.controller('AppCtrl', ['$scope', '$ionicModal', '$timeout',
    function($scope, $ionicModal, $timeout) {
    
    $scope.css = 'dark';
      
    $scope.styles = [
        { name: 'Dark', url: 'dark' },
        { name: 'Light', url: 'light' },
        { name: 'Color', url: 'color' }
    ];

    console.log("$scope.css",$scope.css);
    console.log("$scope.styles",$scope.styles);

    }
]);