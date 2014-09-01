var fikrimuhalStaj = angular.module('fikrimuhalStaj');

fikrimuhalStaj.factory('productService',['$http', '$q' , function ($http,q) {

    var mockProductList= [
        { "id": 1, "name": "Ürün", "price": 601 },
        { "id": 15, "name": "Ürün", "price": 602 },
        { "id": 2, "name": "Ürün", "price": 603 },
        { "id": 35, "name": "Ürün", "price": 604 },
        { "id": 3, "name": "Ürün", "price": 605 },
        { "id": 55, "name": "Ürün", "price": 606 }
    ];

    var productListCache = mockProductList;


    function getProductById(id) {
        return _.find(productListCache, { 'id': id});
    }

    function getProductsByIds(idArray){
        /*var curriedContains = _.curry(_.contains)
        var containsId = curriedContains(productListCache)*/
        console.log("111111111", idArray);
        var containsId = function (product){
            return _.contains(idArray,product.id);
        }

        var result =_.filter(productListCache,containsId);

        console.log("2222222",result);
        console.log("3333333",productListCache);
        return result;
    }

    function fetchProductsFromServer(){
        var productListUrl= config.api.base + "api/products";
        console.log("customers url", productListUrl)
        
        return $http({method: 'GET', url: productListUrl}).success(function(data){
            productListCache = data;
            console.log("1111111111",productListCache)
        }).error(function (d) {
            console.log("error d", d);
        });
    }

    return {
        'fetchFromServer': fetchProductsFromServer,
        'getProductById': getProductById,
        'getProductsByIds': getProductsByIds
    };
}]);
