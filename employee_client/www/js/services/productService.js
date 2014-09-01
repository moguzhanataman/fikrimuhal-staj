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

    /**
    * Description: Verilen id ye göre ürün bulur 
    * @param: {int} ürün id si alır
    * @return: {object} eğer verilen id'de ürün varsa ürünü object olarak yoksa undefined olarak döner
    */
    function getProductById(id) {
        return _.find(productListCache, { 'id': id});
    }

    /**
    * Description: Aldığı idArray'indeki idleri kullanarak serverdan alınmış olan ürün listesi içerisinden
    * ürünleri bulur ve bu ürünleri object arrayi olarak döndürür.
    * @param: {object} bulunacak olan ürünleri idlerini bir object arrayi halinde alır
    * @return: {array of object} Bulunan ürünler bir object arrayi halinde döndürülür eğer bulunamazsa undefined döner
    */
    function getProductsByIds(idArray){
        var containsId = function (product){
            return _.contains(idArray,product.id);
        };

        var result =_.filter(productListCache,containsId);
        return result;
    }

    function fetchProductsFromServer(){
        var productListUrl= config.api.base + "api/products";
        
        return $http({method: 'GET', url: productListUrl}).success(function(data){
            productListCache = data;
        }).error(function (d) {
            console.log("hata oldu", d);
        });
    }

    return {
        'fetchFromServer': fetchProductsFromServer,
        'getProductById': getProductById,
        'getProductsByIds': getProductsByIds
    };
}]);
