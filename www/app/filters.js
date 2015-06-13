angular.module("starter.filters", [])
	.filter('upFilter', function () {
		return function(input){
	    var out = [];
	    angular.forEach(input, function(category){
	      if(category.feeling === 'up'){
	        out.push(category);
	      }
	    })
	    return out;
	  };
	 
	})
	.filter('downFilter', function () {
		return function(input){
	    var out = [];
	    angular.forEach(input, function(category){
	      if(category.feeling === 'down'){
	        out.push(category);
	      }
	    })
	    return out;
	  };
	 
	})
	.filter('reverse', function() {
	  return function(items) {
	    return items.slice().reverse();
	  };
	})
	.filter('myfilter', function() {
	   return function( items, name) {
	    var filtered = [];

	    angular.forEach(items, function(item) {

	      if(name == undefined || name == ''){
	        filtered.push(item);
	        }

	      /* only if you want start With*/
	      // else if(item.name_key.substring(0, name.length) !== name){
	      //   filtered.push(item);
	      // }

	      /* if you want contains*/
	      // else if(item.name_key.indexOf(name) < 0 ){
	      //   filtered.push(item);
	      // }

	       /* if you want match full name*/
	       else if(item.name_key !== name ){
	        filtered.push(item);
	      }
	    });

	    return filtered;
	  };
	})
	;
