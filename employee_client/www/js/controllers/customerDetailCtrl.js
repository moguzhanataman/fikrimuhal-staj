fikrimuhalStaj.controller('customerDetailCtrl',[ '$scope', '$state', 'customerService', 'loginService' , function($scope,$state,customerService,loginService) {
    $scope.message = 'Ürün seçin';


    customerService.getProducts().then(function (products) {
        $scope.productList = splitArray(products);
    }).catch(function (e) {
        alert("hata oldu yeniden deneyin");
        $scope.productList =  splitArray(e);
    });

    $scope.deletedProducts = customerService.getDeletedProducts();

    /* TODO  lodash kur lodashle sil */
    function slideHasChanged(product, index, listNo) {
        var listSplit= $scope.productList;

        var indexofProductL = listSplit.left.indexOf(product);
        var indexofProductR = listSplit.right.indexOf(product);

        /* index silme slaytı */
        if (index == 2) {

            if (indexofProductL > -1) {
                listSplit.left.splice(indexofProductL, 1);
            }

            if (indexofProductR > -1) {
                listSplit.right.splice(indexofProductR, 1);
            }
        }

        if(index == 0){

        if (indexofProductL > -1) {
            customerService.addItem(listSplit.left[indexofProductL]);
            listSplit.left.splice(indexofProductL, 1);
        }
        
        if (indexofProductR > -1) {

            customerService.addItem(listSplit.right[indexofProductR]);
            listSplit.right.splice(indexofProductR, 1);
        }

        }
    }

    function deletedItemSlideHasChanged(product, index, listNo) {
        var deletedList= $scope.deletedProducts;

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
    }

}]);