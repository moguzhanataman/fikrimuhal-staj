fikrimuhalStaj.controller('customerDetailController', function ($scope) {
    $scope.message = 'Ürün seçin';
    var list = [
        { "id": 5, "description": "Ürün", "fiyat": 601 },
        { "id": 15, "description": "Ürün", "fiyat": 602 },
        { "id": 25, "description": "Ürün", "fiyat": 603 },
        { "id": 35, "description": "Ürün", "fiyat": 604 },
        { "id": 45, "description": "Ürün", "fiyat": 605 },
        { "id": 55, "description": "Ürün", "fiyat": 606 }
    ];

    var productCart = [
        {}
    ];

    /* TODO bir listeyi ikiye ayıracak fonksiyon yazılacak */

    var listL = [];
    var listR = [];

    for (var i = 0; i <= list.length - 1; i++) {

        if (i % 2 == 0) {
            listL.push(list[i]);
        } else {
            listR.push(list[i]);
        }
    }
    ;

    $scope.sliderState = 1;
    $scope.productList = {left: listL, right: listR};

    /* TODO  lodash kur lodashle sil */
    function slideHasChanged(product, index, listNo) {
        console.log(" id ", product.id, " index ", index);

        /* This if  */
        if (index == 2) {

            var indexofProductL = listL.indexOf(product);
            console.log("indexofProductL", indexofProductL);

            if (indexofProductL > -1) {
                listL.splice(indexofProductL, 1);
            }

            var indexofProductR = listR.indexOf(product);
            console.log("indexofProductR", indexofProductR);

            if (indexofProductR > -1) {
                listR.splice(indexofProductR, 1);
            }
        }

        if (index == 0) {

        }
    }

    $scope.slideHasChanged = slideHasChanged;
});fikrimuhalStaj.controller('customerDetailController', function ($scope) {
    $scope.message = 'Ürün seçin';
    var list = [
        { "id": 5, "description": "Ürün", "fiyat": 601 },
        { "id": 15, "description": "Ürün", "fiyat": 602 },
        { "id": 25, "description": "Ürün", "fiyat": 603 },
        { "id": 35, "description": "Ürün", "fiyat": 604 },
        { "id": 45, "description": "Ürün", "fiyat": 605 },
        { "id": 55, "description": "Ürün", "fiyat": 606 }
    ];

    var productCart = [
        {}
    ];

    /* TODO bir listeyi ikiye ayıracak fonksiyon yazılacak */

    var listL = [];
    var listR = [];

    for (var i = 0; i <= list.length - 1; i++) {

        if (i % 2 == 0) {
            listL.push(list[i]);
        } else {
            listR.push(list[i]);
        }
    }
    ;

    $scope.sliderState = 1;
    $scope.productList = {left: listL, right: listR};

    /* TODO  lodash kur lodashle sil */
    function slideHasChanged(product, index, listNo) {
        console.log(" id ", product.id, " index ", index);

        /* This if  */
        if (index == 2) {

            var indexofProductL = listL.indexOf(product);
            console.log("indexofProductL", indexofProductL);

            if (indexofProductL > -1) {
                listL.splice(indexofProductL, 1);
            }

            var indexofProductR = listR.indexOf(product);
            console.log("indexofProductR", indexofProductR);

            if (indexofProductR > -1) {
                listR.splice(indexofProductR, 1);
            }
        }

        if (index == 0) {

        }
    }

    $scope.slideHasChanged = slideHasChanged;
});