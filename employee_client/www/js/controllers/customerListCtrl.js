fikrimuhalStaj.controller('customerListCtrl', ['$scope' ,'loginService','customerService' , function ($scope, loginService, customerService) {
    
    function setCustomerID(id){
    	customerService.setCustomer(id);
    }

    /* TODO alert için release öncesi custom bir fonksiyon yazılacak */
    customerService.getCustomerList().then(function (customerList) {
    	$scope.customerList = splitArray(customerList);
    }).catch(function (e) {
    	$scope.customerList = splitArray(e);
    });

    $scope.setCustomerID = setCustomerID;
    $scope.customerList = {left:[], right:[]};
}]);