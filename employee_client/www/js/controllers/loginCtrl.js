fikrimuhalStaj.controller('LoginCtrl', [ '$scope', '$state' , 'loginService', function ($scope, $state, loginService) {

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

    $scope.employees = loginService.employees();

    if (loginService.isLoggedin()) {
        $scope.selectedEmployeeId = loginService.loggedinEmployee().id;
    }

}]);

fikrimuhalStaj.controller('passcodeCtrl', ['$scope', function ($scope) {
    var parentScope = $scope.$parent;

    /* bir ust scope dan parent.selectedEmployeeId geliyor,
    Directive e cevrilince buna gerek kalmayacak. */
    /*parent.selectedEmployeeId*/

    var employees = $scope.employees;
    var pinCounter = 1;
    var currentPasscodeValue;
    var pins = {};


    function combinePins(pinObject) {
        return "" + pinObject[1] + pinObject[2] + pinObject[3] + pinObject[4];
    }

    /* currentPasscodeValue resetleme daha sonrası loginCtrlye lazım */
    function resetPins() {
        pinCounter = 1;
        pins[1] = "";
        pins[2] = "";
        pins[3] = "";
        pins[4] = "";
    }

    function passcodeReady() {
        resetPins();
        $scope.checkPasscode(parentScope.selectedEmployeeId, currentPasscodeValue);
    }

    function selectEmployee(id) {
        parentScope.selectedEmployeeId = id;
        resetPins();
    }

    function addPin(number) {
        if (parentScope.selectedEmployeeId) {
            pins[pinCounter++] = number;
            if (pinCounter == 5) {
                currentPasscodeValue = combinePins(pins);
                passcodeReady();
            }
        } else{
            alert("Kullanıcı seçin")
        }
    }

    resetPins();

    $scope.employees = employees;
//    $scope.selectedEmployee = selectedEmployee;
    $scope.pins = pins;
    $scope.selectEmployee = selectEmployee;
    $scope.addPin = addPin;

}]);