var fikrimuhalStaj = angular.module('fikrimuhalStaj');

fikrimuhalStaj.factory('cartService',['currentCustomerService', '$http', '$q', function cartService(currentCustomerService, $http, $q) {

    var ccid = 0;
    /**
     * @returns {*} current customer id
     */
    function getCCID() {
        return currentCustomerService.getCustomerId();
    }

    var allCarts = {};

    function getCartFromServer(){
        var defered = $q.defer();
        var tempCart = {};
        getCart();

        fetchCartFromServer().then( function(item){
            tempCart = item;
            console.log("tempCart", tempCart);
            defered.resolve(tempCart);
        }).catch( function (e) {
            defered.reject(e);
        });

        return defered.promise;
    }

    function init(){
        getCartFromServer().then(function(item){
            return item;
        }).catch(function (e){
            console.error(e);
            return e;
        })
    }

    function fetchCartFromServer(){
        var cartURL = config.api.base + "api/customers/" + ccid + "/cart";
        return $http({method: 'GET', url: cartURL}).then(function (response) {
            return response.data;
        });
    }

    /**
     * description: o anki sepeti döndürür
     * @return: {array of object} sepetin deep copy edilmiş halini döndürür
     */
    function getCart() {

        ccid = getCCID();   

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
            sum += item.p.price * item.q;
            return sum
        }, 0)
    }

    /**
     * description: toplam indirimi hesaplar
     * @return: toplam indirimi hesaplar
     */
    function getTotalDiscountedPrice() {
        return _.reduce(getCart(), function (sum, item) {
            return sum + item.p.discountedPrice * item.q;
        }, 0)
    }

    /**
     * foundItem = {p ,q}
     * Description: Sepete bir ürün eklemek, azaltmak, çoğaltmayı veya çıkarmayı sağlar
     * @param: item {object} İşlem görecek olan ürün
     * @param: amountTOAdd {int} Değişim miktarı + veya - olabilir  ancak 0 olmamalı
     */
    function changeQuantity(item, amountToAdd){
        var foundItem = _.find(getCart(), {"p":{id: item.id}});

        if (foundItem) {
            foundItem.q += amountToAdd;
        }
        else {
            foundItem = {"p":item,"q": amountToAdd || 0};
            getCart().push(foundItem);
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
