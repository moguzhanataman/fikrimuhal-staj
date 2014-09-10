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

    function initForCurrentUser() {


        var ccid = getCCID();
        if (!fetchFromServerInProgress && !allCarts[ccid]) {
            console.log("Sunucudan cart güncellemesi yapılmaya başlandı kullanıcıID:", getCCID());
            fetchFromServerInProgress = true;

            fetchCartFromServer().then(function (cartFromServer) {
                allCarts[ccid] = cartFromServer;
                fetchFromServerInProgress = false;
                console.log("Sunucudan cart güncellemesi TAMAMLANDI");
            }).catch(function (e) {
                console.log("Sunucudan cart güncellemesi TAMAMLANDI");
                console.log("sepet serverdan gelmedi");
                fetchFromServerInProgress = false;
            })
        }
    }

    function fetchCartFromServer() {
        var cartURL = config.api.base + "api/customers/" + getCCID() + "/cart";

        return $http({method: 'GET', url: cartURL}).then(function (response) {
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
        console.log("asdfxxx",result);
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
     * TODO: timestampleri karşılaştır
     */
    function cartSync(){
        sentCartToServer();
    }

    function sentCartToServer(){
        var cartURL = config.api.base + "api/customers/" + getCCID() + "/cart";

        return $http({method: 'POST', url: cartURL, data: allCarts[getCCID()]}).success(function (response) {
                return response;
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
