angular.module('starter.StateCtrl').controller('State1Ctrl', ['$scope', '$state', 'StateService', 'localStorageService',
    function($scope, $state, StateService, localStorageService) {
        console.log('into State1Ctrl');
        
        $scope.allStates = [];

        $scope.nextStep = function(feeling){
            console.log("nextStep");
            console.log("feeling",feeling);
            localStorageService.set("ls-feeling", feeling);
            $state.go('app.state2');
        };
    }
]);