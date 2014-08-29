fikrimuhalStaj.controller('customerDetailCtrl',[ '$scope', '$state', 'customerService', 'loginService' , function($scope,$state,customerService,loginService) {
    $scope.message = 'Ürün seçin';
    
    var list = customerService.getProducts();

    $scope.sliderState = 1;

    $scope.productList = splitArray(list);

    /* TODO  lodash kur lodashle sil */
    function slideHasChanged(product, index, listNo) {
        var listSplit= $scope.productList;
        console.log(" id ", product.id, " index ", index);

        /* index silme slaytı */
        if (index == 2) {

            var indexofProductL = listSplit.left.indexOf(product);
            console.log("indexofProductL", indexofProductL);

            if (indexofProductL > -1) {
                listSplit.left.splice(indexofProductL, 1);
            }

            var indexofProductR = listSplit.right.indexOf(product);
            console.log("indexofProductR", indexofProductR);

            if (indexofProductR > -1) {
                listSplit.right.splice(indexofProductR, 1);
            }
        }

        if (index == 0) {

            

        }
    }

    $scope.slideHasChanged = slideHasChanged;

    $scope.goToCart = function goToCart(){ 
        $state.go('cart');
    }


}]);