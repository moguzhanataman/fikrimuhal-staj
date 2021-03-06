var fikrimuhalStaj = angular.module('fikrimuhalStaj');

fikrimuhalStaj.factory('cartService', ['currentCustomerService', '$http', 'productService', function cartService(currentCustomerService, $http, productService) {
    var fetchFromServerInProgress = false;

    /**
     * @returns {*} current customer id
     */
    function getCCID() {

        return currentCustomerService.getCustomerId();
    }

    var allCarts = {};
    var cartId = 0;

    /**
    * Description: Güncel müşteriye  göre sepeti oluşturur.
    */
    function initForCurrentUser() {


        var ccid = getCCID();
        if (!fetchFromServerInProgress && !allCarts[ccid]) {
            fetchFromServerInProgress = true;

            fetchCartFromServer().then(function (cartFromServer) {
                allCarts[ccid] = cartFromServer;
                fetchFromServerInProgress = false;
            }).catch(function (e) {
                fetchFromServerInProgress = false;
            })
        }
    }

    /**
    * Description: Güncel müşteriye ait olan sepeti varsa serverdan ister ve döndürür
    * @returns: {object} müşterinin sepetini obje olarak döndürür
    */ 
    function fetchCartFromServer() {
        var cartURL = config.api.base + "api/customers/" + getCCID() + "/cart";

        return $http({method: 'GET', url: cartURL}).then(function (response) {
            cartId = response.data.id;
            return _.map(response.data.itemList, function (i) {
                i.p = productService.getProductById(i.p);
                return i;
            });
        });
    }

    /**
     * description: o anki sepeti döndürür
     * @return: {array of object} sepetin deep copy edilmiş halini döndürür
     */
    function getCart() {

        var ccid = getCCID();

        if (!ccid) {
            throw new IllegalState("Current Customer ID gelmedi");
        } else {

            if (fetchFromServerInProgress) {
                console.error("FIXME! Sunucudan cart güncellemesi yapılırken 'getCart()' çağrıldı. Bu servisin döndürdügü cart hatalı olabilir! ")
            }

            if (!allCarts[ccid]) {
                allCarts[ccid] = [];
            }

            return allCarts[ccid];
        }
    }

    /**
     * description: sepetin toplam tutarını hesaplar
     * @return {int} sepetin toplam tutarını döndürür
     */
    function getTotalPrice() {
        var result = _.reduce(getCart(), function (sum, item) {
            sum += item.p.price * item.q;
            return sum
        }, 0)

        return result;
    }

    /**
     * description: toplam indirimi hesaplar
     * @return: toplam indirimi hesaplar
     */
    function getTotalDiscountedPrice() {
        var result = _.reduce(getCart(), function (sum, item) {
            sum += (item.p.discountedPrice || item.p.price) * item.q;
            return sum;
        }, 0)
        return result;
    }

    /**
     * foundItem = {p ,q}
     * Description: Sepete bir ürün eklemek, azaltmak, çoğaltmayı veya çıkarmayı sağlar
     * @param: item {object} İşlem görecek olan ürün
     * @param: amountTOAdd {int} Değişim miktarı + veya - olabilir  ancak 0 olmamalı
     */
    function changeQuantity(item, amountToAdd) {
        var foundItem = _.find(getCart(), {"p": {id: item.id}});

        if (foundItem) {
            foundItem.q += amountToAdd;
        }
        else {
            foundItem = {"p": item, "q": amountToAdd || 0};
            getCart().push(foundItem);
        }
    }

    /**
     * Description: sepeti sıfırlamayı sağlar
     */
    function cartReset() {
        delete allCarts[getCCID()];
    }

    /**
     * Description: Bu fonksion serverdaki ve clienttaki cartları karşılaştırarak sepetleri senkronize eder
     */
    function cartSync(){
        sentCartToServer();
    }

    /**
    * Description: Güncel müşteriye ait olan sepeti servera gönderir
    */
    function sentCartToServer(){
        var cartURL = config.api.base + "api/customers/" + getCCID() + "/cart";
        var a = true;
        var deneme = _.map(getCart(),function (it){
            return {"p": it.p.id, "q": it.q};
        })
        var tempData = {"id":cartId, "cid": getCCID(), "itemList":deneme}
        return $http({ method: 'POST', url: cartURL, data: angular.toJson(tempData) }).success(function (response) {
                return response;
            }).error(function(er){
                console.log("postta hata var", er);
                return er;
            });
    }

    return {
        'initCart': initForCurrentUser,
        'getCart': getCart,
        'getTotalPrice': getTotalPrice,
        'getTotalDiscountedPrice': getTotalDiscountedPrice,
        'addItemToCart': changeQuantity,
        'cartSync': cartSync,
        'cartReset': cartReset
    };
}]);
