fikrimuhalStaj.controller('customerListCtrl', ['$scope' ,'loginService','customerService' , function ($scope, loginService, customerService) {
    
    function setCustomerID(id){
    	customerService.setCustomer(id);
    }

    customerService.getCustomerList().then(function (customerList) {
    	$scope.customerList = splitArray(customerList);
    }).catch(function (e) {
    	$scope.customerList = splitArray(e);
    });

    $scope.setCustomerID = setCustomerID;
    $scope.customerList = {left:[], right:[]};
}]);