fikrimuhalStaj.controller('cartCtrl', ['$scope','$ionicSlideBoxDelegate', 'cartService', function ($scope, $ionicSlideBoxDelegate, cartService) {

    var cartItems = cartService.getCart();
    var totalPrice = cartService.getTotalPrice();
    var totalDiscountedPrice = cartService.getTotalDiscountedPrice();
    var indexOfItem = 0;

    /* setTimeOut() index geç alındığı için setTimeOut ile beklendi ionic frameworkün kendi bugu */
    function cartSlideHasChanged(it, index) {
        indexOfItem = cartItems.indexOf(it);

    /* index silme slaytı */
        if (index == constant.cartSlider.REMOVE_ITEM) {

            if(cartItems[indexOfItem].amount > 1){
                cartItems[indexOfItem].amount -= 1;
                setTimeout(function (){
                    $ionicSlideBoxDelegate.slide(0,1000);
                },0 )

            }else{
                cartItems.splice(indexOfItem, 1);
            }
        }

        totalPrice = cartService.getTotalPrice();
        totalDiscountedPrice = cartService.getTotalDiscountedPrice();
        $scope.cart = {'cartItems': cartItems, 'totalPrice': totalPrice, 'totalDiscountedPrice': totalDiscountedPrice};
    }

    function cartResetter(){
        cartService.cartReset();
        cartItems = [];
        $scope.cart = {'cartItems': cartItems, 'totalPrice': 0, 'totalDiscountedPrice': 0};
    }


    $scope.cartReset = cartResetter;
    $scope.cartSlideHasChanged = cartSlideHasChanged;
    $scope.message = 'Ürün listesi';
    $scope.sliderState = 0;
    $scope.campaign = { 'name': "anneler günü", 'discount': 159, 'totalAfterDiscount': 1800 };

    $scope.cart = {'cartItems': cartItems, 'totalPrice': totalPrice, 'totalDiscountedPrice': totalDiscountedPrice};
    $scope.currentCustomer = {'name': "Hakkı Özveren Bayraktaşıyan", 'id': 15 };
}]);