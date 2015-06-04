/* Custom model/view elements can be created 
and are called directives.
---------------------------------------------------------------*/

(function(angular) {
  "use strict";

  angular.module("starter.directives", [])
    .directive("ngEquals", function() {
      var directive = { };

      directive.restrict = 'A';
      directive.require = 'ngModel';
      directive.scope = {
      original: '=ngEquals'
      };

      directive.link = function(scope, elm, attrs, ngModel) {
      console.log("into directive");
      ngModel.$parsers.unshift(function(value) {
        console.log("into unshift");
        console.log("into value", value);
        console.log("into scope.original", scope.original);
        ngModel.$setValidity('equals', scope.original === value);
        console.log(scope.original === value);
        return value;
      });
      };

      return directive; 
      })
    .directive("ngFiltered", function() {
      var directive = { };

      directive.restrict = 'A';
      directive.require = 'ngModel';
      directive.scope = {
      filter: '&ngFiltered'
      };

      directive.link = function(scope, elm, attrs, ngModel) {
      ngModel.$parsers.unshift(function(value) {
        var result = scope.filter({
          $value: value
        });
        if (typeof result.then === "function") {
          result.then(function(result) {
            ngModel.$setValidity('filtered', result);
          });
        } else {
          ngModel.$setValidity('filtered', result);
        }
        return value;
      });
      };

      return directive;
    })
      
;}(angular));