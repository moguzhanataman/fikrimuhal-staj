var fikrimuhalStaj = angular.module('fikrimuhalStaj');

fikrimuhalStaj.factory('productService', ['$http', '$q', 'storageService' , function ($http, $q, storageService) {
    var cachedProductList = cached($q, fetchProductsFromServer, storageService, "products");
    /**
     * Function
     * @return {cachePromise}
     */
    var getAllProducts = cachedProductList.promise;

    /**
     * Description: Verilen id ye göre ürün bulur
     * @param: {int} ürün id si alır
     * @return: {object} eğer verilen id'de ürün varsa ürünü object olarak yoksa undefined olarak döner
     */
    function getProductById(id) {
        return _.find(cachedProductList.list, {'id': id});
    }

    /**
     * Description: Aldığı idArray'indeki idleri kullanarak serverdan alınmış olan ürün listesi içerisinden
     * ürünleri bulur ve bu ürünleri promis içinde object arrayi olarak döndürür.
     * @param: {object} bulunacak olan ürünleri idlerini bir object arrayi halinde alır
     * @return: {promise} Bulunan ürünler promis içinde bir object arrayi halinde döndürülür eğer bulunamazsa undefined döner
     */
    function getProductsByIds(idArray) {

        function containsId(product) {
            return _.contains(idArray, product.id);
        }

        return getAllProducts(false).then(function (products) {
            return _.filter(products, containsId);
        })
    }

    function fetchProductsFromServer() {
        return $http({method: 'GET', url: config.api.urls.productList}).then(function (response) {
            return response.data.products;
        });
    }


    return {
        'fetchFromServer': getAllProducts, // @deprecated fetchProductsFromServer private function olmalı
        'getProductById': getProductById,
        'getProductsByIds': getProductsByIds,
        'getAllProducts': getAllProducts
    };
}]);
