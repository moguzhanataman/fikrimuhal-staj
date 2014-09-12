fikrimuhalStaj.controller('cartCtrl', ['$scope','$state','$ionicSlideBoxDelegate', 'cartService', 'currentCustomerService', function ($scope, $state, $ionicSlideBoxDelegate, cartService, currentCustomerService) {

    try{
        var cartItems = cartService.getCart();
        var totalPrice = numeral(cartService.getTotalPrice()).format('0,0[.]00 $');
        var totalDiscountedPrice = numeral(cartService.getTotalDiscountedPrice()).format('0,0[.]00 $');
        var indexOfItem = 0;

        currentCustomerService.getCustomer().then(function (customer) {
            $scope.currentCustomer = customer;
        });

        /* setTimeOut() index geç alındığı için setTimeOut ile beklendi ionic frameworkün kendi bugu */
        function cartSlideHasChanged(it, index) {
            indexOfItem = cartItems.indexOf(it);

        /* index silme slaytı */
            if (index == 2) {

                if(cartItems[indexOfItem].q > 1){
                    cartItems[indexOfItem].q -= 1;
                    setTimeout(function (){
                        $ionicSlideBoxDelegate.slide(1,1000);
                    }, 0);
                }else{
                    cartItems.splice(indexOfItem, 1);
                }
                cartService.cartSync();
            }

            if (index == 0) {
                cartService.addItemToCart(cartItems[indexOfItem].p, 1);
                setTimeout(function () {
                    $ionicSlideBoxDelegate.slide(1, 1000);
                }, 0)
                cartService.cartSync();

            }

            totalPrice = numeral(cartService.getTotalPrice()).format('0,0[.]00 $');
            totalDiscountedPrice = numeral(cartService.getTotalDiscountedPrice()).format('0,0[.]00 $');
            $scope.cart = {'cartItems': cartItems, 'totalPrice': totalPrice, 'totalDiscountedPrice': totalDiscountedPrice};
        }

        function cartResetter(){
            cartService.cartReset();
            cartItems = [];
            $scope.cart = {'cartItems': cartItems, 'totalPrice': 0, 'totalDiscountedPrice': 0};
            cartService.cartSync();
            $state.go('customerList');
        }


        $scope.cartReset = cartResetter;
        $scope.cartSlideHasChanged = cartSlideHasChanged;
        $scope.message = 'Ürün listesi';
        $scope.sliderState = 1;
        $scope.campaign = { 'name': "anneler günü", 'discount': 159, 'totalAfterDiscount': totalDiscountedPrice };
        $scope.cart = {'cartItems': cartItems, 'totalPrice': totalPrice, 'totalDiscountedPrice': totalDiscountedPrice};


    }

    catch(error){
        if(error instanceof IllegalState){
            console.error("current customer olmadığı için customerListe geri yolluyorum", error);
            $state.go('customerList');

        }
        else{
            throw error;
        }
    }

}]);