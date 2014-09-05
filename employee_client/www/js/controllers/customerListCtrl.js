fikrimuhalStaj.controller('customerListCtrl', ['$scope' , 'loginService', 'customerService', 'currentCustomerService', '$state' , function ($scope, loginService, customerService, currentCustomerService, $state) {

    function selectCustomer(id) {
        // customerService.setCustomer(id);
        currentCustomerService.setCustomerById(id);
        $state.go('customerDetail');
    }

    customerService.getCustomerList().then(function (customerList) {
        $scope.customerList = splitArray(customerList);
    }).catch(function (e) {
        $scope.customerList = splitArray(e);
    });

    $scope.selectCustomer = selectCustomer;
    $scope.customerList = {left: [], right: []};

}]);