angular.module("starter.filters", [])
	.filter('upFilter', function () {
		return function(input){
	    var out = [];
	    angular.forEach(input, function(category){
	      if(category.feeling === 'up'){
	        out.push(category)
	      }
	    })
	    return out;
	  }
	 
	})
	.filter('downFilter', function () {
		return function(input){
	    var out = [];
	    angular.forEach(input, function(category){
	      if(category.feeling === 'down'){
	        out.push(category)
	      }
	    })
	    return out;
	  }
	 
	})
	;
