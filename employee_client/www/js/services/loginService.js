var app = angular.module('fikrimuhalStaj');

app.factory('loginService',['$http', '$q' ,function loginService($http,$q) {
	console.log("loginService  initialized");
	function updateEmployee (argument) {
		// body...
	}

	function auth(password){

	var deferred = $q.defer();

	$http({method: 'GET', url: config.api.urls.customerList }).success(function(data){
		var customerlistL = [];
		var customerlistR = [];

		/* TODO bir listeyi ikiye ayıracak fonksiyon yazılacak */

		for (var i = 0; i <= data.customers.length - 1 ; i++) {
			 
			if (i % 2 == 0){
				customerlistL.push(data.customers[i]);
			}else{
			 customerlistR.push(data.customers[i]);
			}
		};

		var customerList = {left:customerlistL, right:customerlistR};
		deferred.resolve(customerList);
		console.log("customerList", customerList);
	}).error(function (d) {
		console.log("error d", d);
		deferred.reject("hata oldu");
	});

		console.log("auth has been called");
		return deferred.promise;
	}
	return {
		auth:auth,
		update:updateEmployee
	}
}])