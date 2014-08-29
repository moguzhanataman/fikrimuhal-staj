var fikrimuhalStaj = angular.module('fikrimuhalStaj');

fikrimuhalStaj.factory('productService', function () {

    var mockProducts = [
        {'id': 5, 'name': "kazak", 'price': 100},
    ];

    var products = mockProducts;


    function getProduct (id) {
        return getProducts([id])[0]
    }

    function getProducts(idArray) {
        return [];
    }

    return {
        'fetchFromServer': TODO,
        'listProducts': TODO,
        'getProduct': getProduct,
        'getProducts': getProducts
    };
});
