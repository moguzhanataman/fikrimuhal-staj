fikrimuhalStaj.controller('customerListCtrl', ['$scope' ,'loginService','customerService' , function ($scope, loginService, customerService) {
    
    function setCustomerID(id){
    	customerService.setCustomer(id);
    }

    /* TODO alert için release öncesi custom bir fonksiyon yazılacak */
    customerService.getCustomerList(true).then(function (customerList) {

    	$scope.customerList = splitArray(customerList);

    }).catch(function (e) {
        alert("hata oldu yeniden deneyin");
    	$scope.customerList = splitArray(e);
    });

    $scope.setCustomerID = setCustomerID;
    $scope.customerList = {left:[], right:[]};
}]);