fikrimuhalStaj.controller('cartCtrl', ['$scope','$state','$ionicSlideBoxDelegate', 'cartService', 'currentCustomerService', function ($scope, $state, $ionicSlideBoxDelegate, cartService, currentCustomerService) {

    try{
        //throw new IllegalState("asdfa");

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
            $state.go('customerList');
        }


        $scope.cartReset = cartResetter;
        $scope.cartSlideHasChanged = cartSlideHasChanged;
        $scope.message = 'Ürün listesi';
        $scope.sliderState = 0;
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