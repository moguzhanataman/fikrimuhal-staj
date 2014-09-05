var fikrimuhalStaj = angular.module('fikrimuhalStaj');

fikrimuhalStaj.factory('cartService', function loginService() {
    var mockCartItems = [
        {'id': 5, 'name': "kazak", 'price': 100, 'amount': 1,   'discountedAmount': 90},
        {'id': 415, 'name': "kazak", 'price': 100, 'amount': 2, 'discountedAmount': 80},
        {'id': 435, 'name': "kazak", 'price': 100, 'amount': 3, 'discountedAmount': 700},
        {'id': 455, 'name': "kazak", 'price': 100, 'amount': 4, 'discountedAmount': 600},
        {'id': 456, 'name': "kazak", 'price': 100, 'amount': 5, 'discountedAmount': 500},
        {'id': 4545, 'name': "kazak", 'price': 100, 'amount': 1,'discountedAmount': 400},
        {'id': 458, 'name': "kazak", 'price': 100, 'amount': 1, 'discountedAmount': 300},
        {'id': 459, 'name': "kazak", 'price': 100, 'amount': 1, 'discountedAmount': 200},
        {'id': 451, 'name': "kazak", 'price': 100, 'amount': 1, 'discountedAmount': 100},
        {'id': 453, 'name': "kazak", 'price': 100, 'amount': 1, 'discountedAmount': 1100}
    ];

    var cartItems = [];
    var cartItems = mockCartItems;

    /**
    * description: o anki sepeti döndürür
    * @return: {array of object} sepetin deep copy edilmiş halini döndürür
    */
    function getCart() {
        return cartItems;
    }

    /**
    * description: sepetin toplam tutarını hesaplar
    * @return {int} sepetin toplam tutarını döndürür
    */
    function getTotalPrice() {
        return _.map(cartItems, function (item) {
            return item.price * item.amount;
        }).reduce(function (sum, price) {
            return sum + price;
        });
    }

    /**
    * description: toplam indirimi hesaplar
    * @return: toplam indirimi hesaplar
    */
    function getTotalDiscountedPrice () {
        return _.map(cartItems, 'discountedAmount').reduce(function (sum, price) {
            return sum + price;
        })
    }

    /**
    * Description: Sepete bir ürün eklemek, azaltmak, çoğaltmayı veya çıkarmayı sağlar
    * @param: item {object} İşlem görecek olan ürün
    * @param: amountTOAdd {int} Değişim miktarı + veya - olabilir  ancak 0 olmamalı
    */
    function changeQuantity(item , amountToAdd){
        var foundItem = _.find(cartItems,{id:item.id});
        
        if(foundItem){
            foundItem.amount += amountToAdd;
        }
        else{
        	cartItems.push(item);
        	item.amount = amountToAdd || 0;
        }
    }

    /**
    * Description: sepeti sıfırlamayı sağlar
    */
    function cartReset(){
    	cartItems = [];

    }

    return {
        'getCart': getCart,
        'getTotalPrice': getTotalPrice,
        'getTotalDiscountedPrice': getTotalDiscountedPrice,
        'addItemToCart': changeQuantity,
        'cartReset': cartReset
    };
});
