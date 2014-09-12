fikrimuhalStaj.controller('customerListCtrl', ['$scope' , 'loginService', 'customerService', 'currentCustomerService', '$state' , function ($scope, loginService, customerService, currentCustomerService, $state) {

    moment.locale("tr");

    function selectCustomer(id) {
        // customerService.setCustomer(id);
        currentCustomerService.setCustomerById(id);
        $state.go('customerDetail');
    }

    customerService.getCustomerList().then(function (customerList) {
        customerList = _.map(customerList, function(it){
            it.lastUpdateTime = moment(it.lastUpdateTime).fromNow();
            it.shopEnterTime = moment(it.shopEnterTime).fromNow();

            if(!!it.employeeId){
                loginService.getEmployeeById(it.employeeId).then(function(res){
                    it.employeeName = res.name;
                })
            }
            else{
                it.employeeId = false;
            }

            return it;
        })
        $scope.customerList = splitArray(customerList);
    }).catch(function (e) {
        $scope.customerList = splitArray(e);
    });

    $scope.selectCustomer = selectCustomer;
    $scope.customerList = {left: [], right: []};


    // WebSocket
    /*
    var ws = new WebSocket("ws://localhost:9000/api/test/websocket");
    ws.onmessage = function( message ) { console.log( message ); };
    */

}]);