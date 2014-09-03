fikrimuhalStaj.controller('LoginCtrl', ['$scope', '$state', 'loginService', function ($scope, $state, loginService) {
    // Get employees from api
    loginService.getEmployeeList().then(function (employeeList) {
        $scope.employees = employeeList;
    }).catch(function (e) {
        $scope.employees = e;
    });

    //function checkLastLoggedinEmployee() {
    //    console.log("55555555555");
    //    var lastLoggedinEmployee = loginService.getLastLoggedinEmployee();
    //    console.log(lastLoggedinEmployee);
    //    if (lastLoggedinEmployee && lastLoggedinEmployee.id) {
    //        console.log("55555555555 seçtim");
    //        $scope.selectEmployee(lastLoggedinEmployee.id);
    //    } else {
    //        console.log("111 lastloggedinemployee", lastLoggedinEmployee);
    //    }
    //}


    $scope.checkPasscode = function checkPasscode(employeeId, pass) {
        if (loginService.auth(employeeId, pass) == true) {

            //BUG #STAJA-7 ,
            //$state.go('customerList');
            //START workaround
            setTimeout(function () {
                $state.go('customerList');
            }, 0);
            //END workaround

        } else {
            //Kullanıcı hata sifre girer ise
            $scope.selectedEmployeeId = null;
        }
    };

    //$scope.employees = loginService.getMocks();
    // $scope.employees = loginService.employees();

    if (loginService.isLoggedin()) {
        $scope.selectedEmployeeId = loginService.loggedinEmployee().id;
    }
}]);

fikrimuhalStaj.controller('passcodeCtrl', ['$scope', 'loginService', function ($scope, loginService) {

    var parentScope = $scope.$parent;

    /* bir ust scope dan parent.selectedEmployeeId geliyor,
     Directive e cevrilince buna gerek kalmayacak. */
    /*parent.selectedEmployeeId*/

    var employees = $scope.employees;
    var pinCounter = 1;
    var currentPasscodeValue;
    var pins = {};


    function _combinePins(pinObject) {
        return "" + pinObject[1] + pinObject[2] + pinObject[3] + pinObject[4];
    }

    /* currentPasscodeValue resetleme daha sonrası loginCtrlye lazım */
    function _resetPins() {
        pinCounter = 1;
        pins[1] = "";
        pins[2] = "";
        pins[3] = "";
        pins[4] = "";
    }


    /**
     * En son girilen employee varsa view'ı o employee'nin resmini seçecek
     * şekilde güncelle. Dolayısıyla localStorage silinmediyse yada ilk açılış
     * değilse her zaman bir employee seçili olacak.
     */
    function _initEmployeeList() {
        var lastLoggedinEmployee = loginService.getLastLoggedinEmployee();
        console.log("init employeeList", lastLoggedinEmployee);
        if (lastLoggedinEmployee) {
            selectEmployee(lastLoggedinEmployee.id);
        }
    }

    function passcodeReady() {
        _resetPins();
        $scope.checkPasscode(parentScope.selectedEmployeeId, currentPasscodeValue);
    }

    function selectEmployee(id) {
        parentScope.selectedEmployeeId = id;
        _resetPins();
    }

    function addPin(number) {
        if (parentScope.selectedEmployeeId) {
            pins[pinCounter++] = number;
            if (pinCounter == 5) {
                currentPasscodeValue = _combinePins(pins);
                passcodeReady();
            }
        } else {
            alert("Kullanıcı seçin");
        }
    }

    _resetPins();
    _initEmployeeList();

    // $scope.employees = employees;
//    $scope.selectedEmployee = selectedEmployee;
    $scope.pins = pins;
    $scope.selectEmployee = selectEmployee;
    $scope.addPin = addPin;

}]);