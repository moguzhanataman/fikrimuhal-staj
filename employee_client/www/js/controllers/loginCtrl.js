fikrimuhalStaj.controller('LoginCtrl', [ '$scope', '$state' , 'loginService' , function ($scope, $state, loginService) {

    $scope.checkPasscode = function checkPasscode(employeeId, pass){
        console.log("employee id is", employeeId, "pass is ",pass);
        
        if(loginService.auth(employeeId, pass) == true){
            $state.go('customerList');
        }
    }

    $scope.employees = loginService.employees();
    if(loginService.isAuth()){
        $scope.currentEmployeeId = loginService.loggedinEmployee().id;
    }

}]);

fikrimuhalStaj.controller('passcodeCtrl',['$scope',function($scope){

    var employees = $scope.employees;

    var selectedEmployee = {'id': $scope.currentEmployeeId};
    var pinCounter = 1;
    var currentPasscodeValue = undefined;
    var pins ={
            '1': "2",
            '2': "4",
            '3': "8",
            '4': "5"
        }

    resetPins();

    function combinePins(pinObject) {
        var pass = "" + pinObject[1] + pinObject[2] + pinObject[3] + pinObject[4];
        return pass;
    }

    /* currentPasscodeValue resetleme daha sonrası loginCtrlye lazım */
    function resetPins() {
        pinCounter = 1;
        pins[1] = "";
        pins[2] = "";
        pins[3] = "";
        pins[4] = "";
    }

    function passcodeReady(){
        $scope.checkPasscode(selectedEmployee.id,currentPasscodeValue);
        resetPins();
    }

    function selectEmployee(id) {
        selectedEmployee.id = id;
        resetPins();
    }

    function addPin(number){
        pins[pinCounter++] = number;
        if(pinCounter == 5)
        {
            currentPasscodeValue=combinePins(pins);
            passcodeReady();
        }
    }

    resetPins();

    $scope.employees=employees;
    $scope.selectedEmployee = selectedEmployee; 
    $scope.pins = pins;
    $scope.selectEmployee = selectEmployee;
    $scope.addPin = addPin;

}])