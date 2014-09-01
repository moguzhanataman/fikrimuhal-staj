fikrimuhalStaj.controller('customerDetailCtrl',[ '$scope', '$state', 'customerService', 'loginService' , function($scope,$state,customerService,loginService) {
    $scope.message = 'Ürün seçin';
    
    customerService.getProducts().then(function (products) {

        $scope.productList = splitArray(products);

    }).catch(function (e) {
        alert("hata oldu yeniden deneyin");
        $scope.products = splitArray(e);
    });

    $scope.deletedProducts = customerService.getDeletedProducts();


    /* TODO  lodash kur lodashle sil */
    function slideHasChanged(product, index, listNo) {
        var listSplit= $scope.productList;
        console.log(" id ", product.id, " index ", index);

        var indexofProductL = listSplit.left.indexOf(product);
        var indexofProductR = listSplit.right.indexOf(product);

        /* index silme slaytı */
        if (index == 2) {
            console.log("indexofProductL", indexofProductL);

            if (indexofProductL > -1) {
                listSplit.left.splice(indexofProductL, 1);
            }

            console.log("indexofProductR", indexofProductR);

            if (indexofProductR > -1) {
                listSplit.right.splice(indexofProductR, 1);
            }
        }

        if(index == 0){
            console.log("index 0 girdi");

        /* TODO ekleme yazılacak */
        if (indexofProductL > -1) {
            console.log("left ten ", listSplit.left[indexofProductL]);
            customerService.addItem(listSplit.left[indexofProductL]);
            listSplit.left.splice(indexofProductL, 1);
        }
        
        if (indexofProductR > -1) {
            console.log("right ten ", listSplit.right[indexofProductR]);
            customerService.addItem(listSplit.right[indexofProductR]);
            listSplit.right.splice(indexofProductR, 1);
        }

        }
    }


    $scope.sliderState = 1;
    $scope.slideHasChanged = slideHasChanged;
    $scope.goToCart = function goToCart(){ 
        $state.go('cart');
    }

}]);