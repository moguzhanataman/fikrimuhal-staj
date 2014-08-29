fikrimuhalStaj.controller('cartCtrl', ['$scope', 'cartService', function ($scope, cartService) {
    var cartItems = cartService.getCart();
    var totalPrice = cartService.getTotalPrice();
    var totalDiscountedPrice = cartService.getTotalDiscountedPrice();

    $scope.message = 'Ürün listesi';
    $scope.sliderState = constant.cartSlider.CURRENT_ITEM;
    $scope.campaign = { 'name': "anneler günü", 'discount': 159, 'totalAfterDiscount': 1800 };

    $scope.cart = {'cartItems': cartItems, 'totalPrice': totalPrice, 'totalDiscountedPrice': totalDiscountedPrice};
    $scope.currentCustomer = {'name': "Hakkı Özveren Bayraktaşıyan", 'id': 15 };
}]);