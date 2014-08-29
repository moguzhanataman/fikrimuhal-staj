var fikrimuhalStaj = angular.module('fikrimuhalStaj');

fikrimuhalStaj.factory('cartService', function loginService() {
    var mockCartItems = [
        {'id': 5, 'name': "kazak", 'price': 100, 'amount': 1, 'subPrice': 9100, 'discountedPrice': 90},
        {'id': 415, 'name': "kazak", 'price': 100, 'amount': 2, 'subPrice': 8100, 'discountedPrice': 80},
        {'id': 435, 'name': "kazak", 'price': 100, 'amount': 3, 'subPrice': 7100, 'discountedPrice': 700},
        {'id': 455, 'name': "kazak", 'price': 100, 'amount': 4, 'subPrice': 6100, 'discountedPrice': 600},
        {'id': 456, 'name': "kazak", 'price': 100, 'amount': 5, 'subPrice': 5100, 'discountedPrice': 500},
        {'id': 4545, 'name': "kazak", 'price': 100, 'amount': 1, 'subPrice': 4100, 'discountedPrice': 400},
        {'id': 458, 'name': "kazak", 'price': 100, 'amount': 1, 'subPrice': 3100, 'discountedPrice': 300},
        {'id': 459, 'name': "kazak", 'price': 100, 'amount': 1, 'subPrice': 2100, 'discountedPrice': 200},
        {'id': 451, 'name': "kazak", 'price': 100, 'amount': 1, 'subPrice': 1100, 'discountedPrice': 100},
        {'id': 453, 'name': "kazak", 'price': 100, 'amount': 1, 'subPrice': -100, 'discountedPrice': 1100}
    ];
    var cartItems = mockCartItems;

    function TODO () {
        console.log("Not Implemented Yet");
    }

    function getCart() {
        return cartItems;
    }

    function getTotalPrice() {
        return _.map(cartItems, function (item) {
            return item.price * item.amount;
        }).reduce(function (sum, price) {
            return sum + price;
        });
    }

    return {
        'getCart': getCart,
        'getTotalPrice': getTotalPrice,
        'getDiscountedPrice': TODO
    };
});
