fikrimuhalStaj.controller('customerListCtrl', ['$scope' , 'loginService', 'customerService', 'currentCustomerService', '$state' , function ($scope, loginService, customerService, currentCustomerService, $state) {

    // numeral.js nin çalışacağı local değişkenini Türkiye olarak değiştirir default olarak Great Britain'dir
    moment.locale("tr");

    var currentEmployeeId = loginService.loggedinEmployee().id;
    /**
     * Description: Seçilen müşterinin idsini alır ve belirlenen müşteri için oluşturulmuş ürün öneri sayfasına yönlendirir
     * @param: {number} seçilen müşterinin idsi
     */
    function selectCustomer(id) {
        currentCustomerService.setCustomerById(id);
        $state.go('customerDetail');
    }

    /**
    * Description: Serverdan müşteri listesini ister dönen listeyi ranking fonskiyonundan geçirip dizer,
    * Serverdan müşterilerle ilgilenen çalışanları idsi geldiği için çalışanların idleri üzerinden isimlerine ulaşır
    * customerList i scope'a göndermeden önce müşteri ile ilgilenen çalışana göre simge değişkenin değerini belirler
    * ortaya çıkan arrayi ikiye böler(sağ ve sol)
    */
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