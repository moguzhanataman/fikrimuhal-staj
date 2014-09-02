var fikrimuhalStaj = angular.module('fikrimuhalStaj');

fikrimuhalStaj.factory('customerService', ['$http', '$q' ,'productService' ,'cartService' ,function customerService($http, $q,productService,cartService) {

    var cachedCustomerList = cached($q, fetchCustomersFromServer);

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

    //var mockCustomerList = [
    //    {
    //    id: 1,
    //    name: "Ahmet",
    //    photoData: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAMAAABOo35HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCNUY2RkEwRjUzOEQxMUUzQjRFOUM5RDg4RkJDMzY5RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCNUY2RkExMDUzOEQxMUUzQjRFOUM5RDg4RkJDMzY5RCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkI1RjZGQTBENTM4RDExRTNCNEU5QzlEODhGQkMzNjlEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkI1RjZGQTBFNTM4RDExRTNCNEU5QzlEODhGQkMzNjlEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+GDptigAAAGZQTFRF2NjYt7e3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",
    //    checkinTime: 1409061949,
    //    employeeId: 1
    //    },
    //    {
    //    id: 2,
    //    name: "Mehmet",
    //    photoData: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAMAAABOo35HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCNUY2RkEwRjUzOEQxMUUzQjRFOUM5RDg4RkJDMzY5RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCNUY2RkExMDUzOEQxMUUzQjRFOUM5RDg4RkJDMzY5RCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkI1RjZGQTBENTM4RDExRTNCNEU5QzlEODhGQkMzNjlEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkI1RjZGQTBFNTM4RDExRTNCNEU5QzlEODhGQkMzNjlEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+GDptigAAAGZQTFRF2NjYt7e3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",
    //    checkinTime: 1409061949,
    //    employeeId: 1
    //    },
    //    {
    //    id: 3,
    //    name: "Mehmet",
    //    photoData: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAMAAABOo35HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCNUY2RkEwRjUzOEQxMUUzQjRFOUM5RDg4RkJDMzY5RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCNUY2RkExMDUzOEQxMUUzQjRFOUM5RDg4RkJDMzY5RCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkI1RjZGQTBENTM4RDExRTNCNEU5QzlEODhGQkMzNjlEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkI1RjZGQTBFNTM4RDExRTNCNEU5QzlEODhGQkMzNjlEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+GDptigAAAGZQTFRF2NjYt7e3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",
    //    checkinTime: 1409061949,
    //    employeeId: 1
    //    },
    //    {
    //    id: 4,
    //    name: "Mehmet",
    //    photoData: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAMAAABOo35HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCNUY2RkEwRjUzOEQxMUUzQjRFOUM5RDg4RkJDMzY5RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCNUY2RkExMDUzOEQxMUUzQjRFOUM5RDg4RkJDMzY5RCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkI1RjZGQTBENTM4RDExRTNCNEU5QzlEODhGQkMzNjlEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkI1RjZGQTBFNTM4RDExRTNCNEU5QzlEODhGQkMzNjlEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+GDptigAAAGZQTFRF2NjYt7e3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",
    //    checkinTime: 1409061949,
    //    employeeId: 1
    //    }
    //]

    var productListCache = mockProductList;
    var deletedProducts = mockDeletedProducts;

    /**
    * description: çağrıldığı müşteri için önerilen ürünlerin idsini serverdan json olarak almak için
    * fetchProductsFromFromServer fonksiyonunu çağırır bu fonksiyondan dönecek json datası promise ile return eder
    */
    function getProductsForSelectedCustomers(){
        var def = $q.defer();

        fetchProductsFromServer().then(function (value){
                def.resolve(_.cloneDeep(productListCache));
            }).catch(function (){
                def.reject(_.cloneDeep(productListCache));
            })

        return def.promise


    }

    /**
    * description: serverdan scopedaki müşteri idsini kullaranak serverdan önerilen ürünlerin listesini request eder
    * ve gelen datayı productListCache e yazar
    */
    function fetchProductsFromServer(){
        var productListUrl= config.api.base + "api/customers/" +currentCustomerID + "/products" ;
    
        return $http({method: 'GET', url: productListUrl}).success(function(data){
            productListCache = productService.getProductsByIds(data);

        }).error(function (d) {
            console.log("error d", d);
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