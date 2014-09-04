fikrimuhalStaj.controller('customerListCtrl', ['$scope' ,'loginService','customerService', 'currentCustomerService' , function ($scope, loginService, customerService, currentCustomerService) {
    
    function setCustomerID(id){
    	// customerService.setCustomer(id);
        currentCustomerService.setCustomerById(id);
    }

    customerService.getCustomerList().then(function (customerList) {
    	$scope.customerList = splitArray(customerList);
    }).catch(function (e) {
    	$scope.customerList = splitArray(e);
    });

    $scope.setCustomerID = setCustomerID;
    $scope.customerList = {left:[], right:[]};

}]);