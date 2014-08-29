fikrimuhalStaj.controller('cartCtrl', ['$scope', 'cartService', function ($scope, cartService) {
    var cartItems = cartService.getCart();
    var totalPrice = cartService.getTotalPrice();

    $scope.message = 'Ürün listesi';
    $scope.sliderState = 1;
    $scope.campaign = { 'name': "anneler günü", 'discount': 159, 'totalAfterDiscount': 1800 };

    $scope.cart = {'cartItems': cartItems, 'totalPrice': totalPrice};
    $scope.currentCustomer = {'name': "Hakkı Özveren Bayraktaşıyan", 'id': 15 };
}]);

fikrimuhalStaj.controller('SlideController', function ($scope) {

    $scope.currentSlide = 1;

    $scope.slideChanged = function (currSlide) {
        $scope.currentSlide = currSlide;
        console.log('Active Slide=' + $scope.currentSlide);
    }
});