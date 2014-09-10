fikrimuhalStaj.controller('cartCtrl', ['$scope','$state','$ionicSlideBoxDelegate', 'cartService', 'currentCustomerService', function ($scope, $state, $ionicSlideBoxDelegate, cartService, currentCustomerService) {

    try{
        var cartItems = cartService.getCart();
        var totalPrice = cartService.getTotalPrice();
        var totalDiscountedPrice = cartService.getTotalDiscountedPrice();
        var indexOfItem = 0;

        currentCustomerService.getCustomer().then(function (customer) {
            $scope.currentCustomer = customer;
        });

        /* setTimeOut() index geç alındığı için setTimeOut ile beklendi ionic frameworkün kendi bugu */
        function cartSlideHasChanged(it, index) {
            indexOfItem = cartItems.indexOf(it);
            console.log("index", index);

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
            }

            if (index == 0) {
                cartService.addItemToCart(cartItems[indexOfItem], 1);
                setTimeout(function () {
                    $ionicSlideBoxDelegate.slide(1, 1000);
                }, 0)
            }

            totalPrice = cartService.getTotalPrice();
            totalDiscountedPrice = cartService.getTotalDiscountedPrice();
            $scope.cart = {'cartItems': cartItems, 'totalPrice': totalPrice, 'totalDiscountedPrice': totalDiscountedPrice};
        }

        function cartResetter(){
            cartService.cartReset();
            cartItems = [];
            $scope.cart = {'cartItems': cartItems, 'totalPrice': 0, 'totalDiscountedPrice': 0};
            $state.go('customerList');
        }


        $scope.cartReset = cartResetter;
        $scope.cartSlideHasChanged = cartSlideHasChanged;
        $scope.message = 'Ürün listesi';
        $scope.sliderState = 1;
        $scope.campaign = { 'name': "anneler günü", 'discount': 159, 'totalAfterDiscount': 1800 };

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