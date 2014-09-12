fikrimuhalStaj.controller('customerDetailCtrl',[ '$scope', '$state', 'customerService', 'loginService', 'currentCustomerService','cartService', function($scope,$state,customerService,loginService,currentCustomerService,cartService) {

    var deletedList= customerService.getDeletedProducts();
   

    function init() {
        /* Şu an ki kullanıcı için sepeti initiliaze eder */
        cartService.initCart();

        currentCustomerService.getCustomer().then(function (customer) {
            $scope.currentCustomer = customer;
        });

        customerService.getProducts().then(function (products) {
            $scope.productList = splitArray(products);

            console.log("PRODUCT:::", products);
        }).catch(function (e) {
            $scope.productList = splitArray(e);
        });

    }

    /* TODO  lodash kur lodashle sil */
    function slideHasChanged(product, index, listNo) {
        var listSplit= $scope.productList;

        var indexofProductL = listSplit.left.indexOf(product);
        var indexofProductR = listSplit.right.indexOf(product);

        /* index silme slaytı */
        if (index == 2) {

            if (indexofProductL > -1) {
                deletedList.reverse();
                deletedList.push(listSplit.left[indexofProductL]);
                deletedList.reverse();
                listSplit.left.splice(indexofProductL, 1);
            }

            if (indexofProductR > -1) {
                deletedList.reverse();
                deletedList.push(listSplit.right[indexofProductR]);
                deletedList.reverse();
                listSplit.right.splice(indexofProductR, 1);
            }
            console.log("deleted", deletedList);
        }

        /* sepete ekleme*/
        if(index == 0){

            if (indexofProductL > -1) {
                customerService.addItem(listSplit.left[indexofProductL]);
                cartService.cartSync();
                listSplit.left.splice(indexofProductL, 1);
            }
            
            if (indexofProductR > -1) {
                customerService.addItem(listSplit.right[indexofProductR]);
                cartService.cartSync();
                listSplit.right.splice(indexofProductR, 1);
            }

        }
    }

    function deletedItemSlideHasChanged(product, index, listNo) {

        var indexofProduct = deletedList.indexOf(product);

        /* index silme slaytı */
        if (index == 2) {
            deletedList.splice(indexofProduct, 1);
        }

        if(index == 0){
            customerService.addItem(deletedList[indexofProduct]);
            deletedList.splice(indexofProduct, 1);
        }
    }


    $scope.sliderState = 1;
    $scope.deletedItemSlideHasChanged = deletedItemSlideHasChanged;
    $scope.slideHasChanged = slideHasChanged;
    $scope.goToCart = function goToCart(){ 
        $state.go('cart');
    };
    $scope.deletedProducts = deletedList;
    $scope.message = 'Ürün seçin';
    numeral.language('tr');
    $scope.deneme = 5;
    $scope.deneme2=numeral(1236.235).format('0,0[.]00 $');

    init();

}]);