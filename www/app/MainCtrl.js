    angular.module('starter.controllers', [])

    .controller('MainController', function($scope) {
      
      // set the default bootswatch name
      $scope.css = 'dark';
       
      
      // create the list of layout files
      $scope.css = [
        { name: 'dark', url: 'dark' },
        { name: 'light', url: 'light' },
        { name: 'color', url: 'color' }
      ];

    });