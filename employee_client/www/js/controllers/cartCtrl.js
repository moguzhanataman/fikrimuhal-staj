fikrimuhalStaj.controller('cartCtrl', ['$scope', function ($scope) {
    $scope.message = 'Ürün listesi';
    $scope.sliderState = 1;
    $scope.campaign = { 'name': "anneler günü", 'discount': 159, 'totalAfterDiscount': 1800 };
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

    $scope.cart = {'cartItems': mockCartItems, 'totalPrice': 1959};
    $scope.currentCustomer = {'name': "Hakkı Özveren Bayraktaşıyan", 'id': 15 };
}]);

fikrimuhalStaj.controller('SlideController', function ($scope) {

    $scope.currentSlide = 1;

    $scope.slideChanged = function (currSlide) {
        $scope.currentSlide = currSlide;
        console.log('Active Slide=' + $scope.currentSlide);
    }
});