var fikrimuhalStaj = angular.module('fikrimuhalStaj');

fikrimuhalStaj.factory('customerService', ['$http', '$q' , function customerService($http, $q) {
    console.log("customerService  initialized");

    var mockProductList = [
        { "id": 5, "description": "Ürün", "fiyat": 601 },
        { "id": 15, "description": "Ürün", "fiyat": 602 },
        { "id": 25, "description": "Ürün", "fiyat": 603 },
        { "id": 35, "description": "Ürün", "fiyat": 604 },
        { "id": 45, "description": "Ürün", "fiyat": 605 },
        { "id": 55, "description": "Ürün", "fiyat": 606 }
    ];

    var productList = mockProductList;

    function TODO () { 
    }

    function getProducts(){
        return _.cloneDeep(productList);
    }

    return{ 
    	'TODO':TODO,
        'getProducts':getProducts
    }
 }]);