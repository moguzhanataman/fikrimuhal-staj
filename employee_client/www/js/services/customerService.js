var fikrimuhalStaj = angular.module('fikrimuhalStaj');

fikrimuhalStaj.factory('customerService', ['$http', '$q' , function customerService($http, $q) {
    console.log("customerService  initialized");

    function TODO () { 
    }

    return{ 
    	'TODO':TODO
    }
 }]);