var fikrimuhalStaj = angular.module('fikrimuhalStaj');

fikrimuhalStaj.factory('productService',['$http', '$q', 'storageService' , function ($http, $q, storageService) {
    var cachedProductList = cached($q, fetchProductsFromServer, storageService, "products", true);
    var getAllProducts = cachedProductList.promise;

    /**
    * Description: Verilen id ye göre ürün bulur 
    * @param: {int} ürün id si alır
    * @return: {object} eğer verilen id'de ürün varsa ürünü object olarak yoksa undefined olarak döner
    */
    function getProductById(id) {
        return _.find(cachedProductList.list, {'id': id} );
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

        var result =_.filter(cachedProductList.list, containsId);
        return result;
    }

    function fetchProductsFromServer(){
        return $http({method: 'GET', url: config.api.urls.productList}).then(function(response){
            console.log("fetch product from server:", response.data);
            return response.data;
        });
    }

    return {
        'fetchFromServer': fetchProductsFromServer,
        'getProductById': getProductById,
        'getProductsByIds': getProductsByIds,
        'getAllProducts': getAllProducts
    };
}]);
