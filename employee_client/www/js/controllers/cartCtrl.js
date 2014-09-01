fikrimuhalStaj.controller('cartCtrl', ['$scope', 'cartService', function ($scope, cartService) {
    var cartItems = cartService.getCart();
    var totalPrice = cartService.getTotalPrice();
    var totalDiscountedPrice = cartService.getTotalDiscountedPrice();
    var indexOfItem = 0;

    function cartSlideHasChanged(it, index) {
        indexOfItem = cartItems.indexOf(it);
        console.log(" id ", it.id, " index ", index);

    /* index silme slaytı */
        if (index == 1) {
            cartItems.splice(indexOfItem, 1);
            console.log("cart is", cartItems);
        }
    }

    $scope.cartSlideHasChanged = cartSlideHasChanged;
    $scope.message = 'Ürün listesi';
    $scope.sliderState = 0;
    $scope.campaign = { 'name': "anneler günü", 'discount': 159, 'totalAfterDiscount': 1800 };

    $scope.cart = {'cartItems': cartItems, 'totalPrice': totalPrice, 'totalDiscountedPrice': totalDiscountedPrice};
    $scope.currentCustomer = {'name': "Hakkı Özveren Bayraktaşıyan", 'id': 15 };
}]);