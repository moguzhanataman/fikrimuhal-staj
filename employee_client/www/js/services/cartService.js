var fikrimuhalStaj = angular.module('fikrimuhalStaj');

fikrimuhalStaj.factory('cartService',['currentCustomerService', function cartService(currentCustomerService) {

    /**
     * @returns {*} current customer id
     */
    function getCCID() {
        return currentCustomerService.getCustomerId();
    }

    var allCarts = {};

    /**
     * description: o anki sepeti döndürür
     * @return: {array of object} sepetin deep copy edilmiş halini döndürür
     */
    function getCart() {

        var ccid = getCCID();

        if (!ccid) {
            throw new IllegalState("Current Customer ID gelmedi");
        }


        if (!allCarts[ccid]) {
            allCarts[ccid] = [];
        }

        return allCarts[ccid];
    }

    /**
     * description: sepetin toplam tutarını hesaplar
     * @return {int} sepetin toplam tutarını döndürür
     */
    function getTotalPrice() {
        return _.reduce(getCart(), function (sum, item) {
            sum += item.price * item.amount;
            return sum
        }, 0)
    }

    /**
     * description: toplam indirimi hesaplar
     * @return: toplam indirimi hesaplar
     */
    function getTotalDiscountedPrice() {
        return _.reduce(getCart(), function (sum, item) {
            return sum + item.discountedPrice * item.amount;
        }, 0)
    }

    /**
     * Description: Sepete bir ürün eklemek, azaltmak, çoğaltmayı veya çıkarmayı sağlar
     * @param: item {object} İşlem görecek olan ürün
     * @param: amountTOAdd {int} Değişim miktarı + veya - olabilir  ancak 0 olmamalı
     */
    function changeQuantity(item, amountToAdd) {
        var foundItem = _.find(getCart(), {id: item.id});

        if (foundItem) {
            foundItem.amount += amountToAdd;
        }
        else {
            getCart().push(item);
            item.amount = amountToAdd || 0;
        }
    }

    /**
     * Description: sepeti sıfırlamayı sağlar
     */
    function cartReset() {
        delete allCarts[getCCID()];
    }

    return {
        'getCart': getCart,
        'getTotalPrice': getTotalPrice,
        'getTotalDiscountedPrice': getTotalDiscountedPrice,
        'addItemToCart': changeQuantity,
        'cartReset': cartReset
    };
}]);
