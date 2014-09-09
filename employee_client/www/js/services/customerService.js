var fikrimuhalStaj = angular.module('fikrimuhalStaj');

fikrimuhalStaj.factory('customerService', ['$http', '$q' ,'productService' ,'cartService', 'currentCustomerService' ,function customerService($http, $q,productService,cartService, currentCustomerService) {

    var cachedCustomerList = cached($q, fetchCustomersFromServer);
    // TODO isim değişmeli yanlış yönlendiriyor.
    var cachedProductList = cached($q, fetchProductsFromServer);
    var getProductsForSelectedCustomers = cachedProductList.promise;
    var currentCustomerID = 0;

    var deletedProducts = [];

    /**
    * description: serverdan scopedaki müşteri idsini kullaranak serverdan önerilen ürünlerin listesini request eder
    * ve gelen datayı productListCache e yazar
    */
    function fetchProductsFromServer(){
        var customerId = currentCustomerService.getCustomerId();
        var productListUrl = config.api.base + "api/customers/" + customerId + "/products";
        return $http({method: 'GET', url: productListUrl}).then(function (response) {
            var products = productService.getProductsByIds(response.data)
            console.log("QQQQQQ:::", response.data);
            return products;
        });
    }
    
    /*
    * description: güncel müşteri idsini local scope set eder.
    * @param: {int} id müşteri idsidir
    */
    function currentCustomerSetter(id){
        currentCustomerID = id;
    }

    /**
    * description: local scopedaki müşteri idsini getirir.
    * @return: {int} müşteri idsini döndürür
    */
    function getCurrentCustomerID(){
        return currentCustomerID;
    }

    function getCustomer(id) {
        console.log("TODO");
    }

    /**
     * @param {boolean} updateFromServer first update then return
     * promise'in rejecti cache yolluyor kullanıcıya alert ile bağlantı hatası yeniden deneyin yazacak
     * @returns promise
     */
    var getCustomerList = cachedCustomerList.promise;

    /**
    * description: serverdan ortamda bulunan müşterilerin listesini http request ile alır 
    * @return: {object} müşteri object array döndürür
    */
    function fetchCustomersFromServer(){
        return $http({method: 'GET', url: config.api.urls.customerList}).then(function (response) {
            return response.data.customers;
        });
    }

    /** TODO bu fonksiyon ikinci bir parametre alacak bu parametre kaç adet artırılacağını tutacak
    * description: sepete ürün ekler ve aynı ürün varsa miktarını artırır
    * @param: sepete eklenecek olan objecti alır
    */
    function updateCart(item){
        cartService.addItemToCart(item,1);
    }

    /**
    * Description: önerilen ürünler listesinden silinen ürünlerin olduğu listeyi döndürür
    * @return: {array of object} silinen ürünlerin object arrayini döndürür
    */
    function getDeletedProducts(){
        return deletedProducts;
    }

    return{ 
        'getProducts':getProductsForSelectedCustomers, //
        'setCustomer':currentCustomerSetter,
        'getCustomerList': getCustomerList,
        'getCustomerID':getCurrentCustomerID,
        'getCustomer': getCustomer, //
        'updateCustomerList': fetchCustomersFromServer, // make private
        'addItem':updateCart,       // move to cartService
        'getDeletedProducts': getDeletedProducts // move to cartService

    }

    // ---
    // PRIVATE METHODS
    // ---

    function handleSuccess(response) {

        return( response.data );

    }

    function handleError(response) {

        // The API response from the server should be returned in a
        // nomralized format. However, if the request was not handled by the
        // server (or what not handles properly - ex. server error), then we
        // may have to normalize it on our end, as best we can.
        if (
            ! angular.isObject( response.data ) ||
            ! response.data.message
        ) {

            return( $q.reject( "An unknown error occurred." ) );

        }

        // Otherwise, use expected error message.
        return( $q.reject( response.data.message ) );

    }
 }]);