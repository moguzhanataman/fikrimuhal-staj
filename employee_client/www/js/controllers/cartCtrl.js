fikrimuhalStaj.controller('cartCtrl', ['$scope', 'cartService', function ($scope, cartService) {
    var cartItems = cartService.getCart();
    var totalPrice = cartService.getTotalPrice();
    var totalDiscountedPrice = cartService.getTotalDiscountedPrice();
    var indexOfItem = 0;

    function cartSlideHasChanged(it, index) {
        indexOfItem = cartItems.indexOf(it);

    /* index silme slaytı */
        if (index == 1) {
            if(cartItems[indexOfItem].amount != 1){
                cartItems[indexOfItem].amount -= 1;
                $scope.sliderState = 0;
            }else{
                cartItems.splice(indexOfItem, 1);
            }
        }
    }

    function cartResetter(){
        cartService.cartReset();
        cartItems = [];
        $scope.cart = [];
    }


    $scope.cartReset = cartResetter;
    $scope.cartSlideHasChanged = cartSlideHasChanged;
    $scope.message = 'Ürün listesi';
    $scope.sliderState = 0;
    $scope.campaign = { 'name': "anneler günü", 'discount': 159, 'totalAfterDiscount': 1800 };

    $scope.cart = {'cartItems': cartItems, 'totalPrice': totalPrice, 'totalDiscountedPrice': totalDiscountedPrice};
    $scope.currentCustomer = {'name': "Hakkı Özveren Bayraktaşıyan", 'id': 15 };
}]);