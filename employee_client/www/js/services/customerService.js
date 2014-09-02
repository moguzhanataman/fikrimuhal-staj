var fikrimuhalStaj = angular.module('fikrimuhalStaj');

fikrimuhalStaj.factory('customerService', ['$http', '$q' ,'productService' ,'cartService' ,function customerService($http, $q,productService,cartService) {

    var cachedCustomerList = cached($q, fetchCustomersFromServer);
    var cachedProductList = cached($q, fetchProductsFromServer);
    var getProductsForSelectedCustomers = cachedProductList.promise;
    var currentCustomerID = null;

    var mockProductList= [
        { "id": 5, "name": "Ürün", "price": 601 },
        { "id": 15, "name": "Ürün", "price": 602 },
        { "id": 25, "name": "Ürün", "price": 603 },
        { "id": 35, "name": "Ürün", "price": 604 },
        { "id": 45, "name": "Ürün", "price": 605 },
        { "id": 55, "name": "Ürün", "price": 606 }
    ];

    var mockDeletedProducts = [
        { "id": 65, "name": "Ürün", "price": 607 },
        { "id": 75, "name": "Ürün", "price": 608 }
    ];

    var productListCache = mockProductList;
    var deletedProducts = mockDeletedProducts;

    /**
    * description: serverdan scopedaki müşteri idsini kullaranak serverdan önerilen ürünlerin listesini request eder
    * ve gelen datayı productListCache e yazar
    */
    function fetchProductsFromServer(){
        var productListUrl = config.api.base + "api/customers/" + currentCustomerID + "/products";
        return $http({method: 'GET', url: productListUrl}).then(function (response) {
            var products = productService.getProductsByIds(response.data);
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
        'getProducts':getProductsForSelectedCustomers,
        'setCustomer':currentCustomerSetter,
        'getCustomerList': getCustomerList,
        'getCustomerID':getCurrentCustomerID,
        'updateCustomerList': fetchCustomersFromServer,
        'addItem':updateCart,
        'getDeletedProducts': getDeletedProducts

    }
 }]);