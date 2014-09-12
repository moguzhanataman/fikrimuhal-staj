fikrimuhalStaj.controller('customerListCtrl', ['$scope' , 'loginService', 'customerService', 'currentCustomerService', '$state' , function ($scope, loginService, customerService, currentCustomerService, $state) {

    moment.locale("tr");

    var currentEmployeeId = loginService.loggedinEmployee().id;

    function selectCustomer(id) {
        // customerService.setCustomer(id);
        currentCustomerService.setCustomerById(id);
        $state.go('customerDetail');
    }

    customerService.getCustomerList().then(function (customerList) {
        var c_5 = 20000;
        customerList = _.map(customerList, function(it){
            it.lastUpdateTime = moment(it.lastUpdateTime).fromNow();
            it.shopEnterTime = moment(it.shopEnterTime).fromNow();

            if(!!it.employeeId){
                loginService.getEmployeeById(it.employeeId).then(function(res){
                    it.employeeName = res.name;
                })
            }
                       
            it.employeeStatusIcons = {
                "locked": it.employeeId && (it.employeeId != currentEmployeeId),
                "unlocked": it.employeeId == currentEmployeeId
            };

            var w_5;

            if(it.employeeId == currentEmployeeId){
                w_5 = 1;
            }
            else if( it.employeeId == undefined){
                w_5 = 0.90;
            }else{
                w_5 = 0.1;
            }
            
            it.rank = it.rank + c_5 * w_5;
            return it;
        })

        customerList = _.sortBy(customerList, function(customer){
            return -customer.rank;
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