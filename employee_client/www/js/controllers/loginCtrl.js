fikrimuhalStaj.controller('LoginCtrl', [ '$scope' , 'loginService' , function ($scope, loginService) {
    
    var employeePromise = loginService.auth();
    console.log("employee", employeePromise);

    employeePromise.then(function (e) {
        $scope.employee = e;
        console.log("sucess oldu", e)
    }).catch(function (e) {
        console.log("hata oldu", e)
    }).finally(function () {
        console.log("finally")
    });
    // create a message to display in our view
    $scope.message = 'Şifreniniz girin!';
    $scope.employee = "bekleniyor";

    $scope.checkPasscode = function checkPasscode(employeeId, pass){
        console.log("employee id is", employeeId, "pass is ",pass);
    }

    $scope.employees = [
                    {'id':1,'photoUrl':"/img/placeholder_large.png"},
                    {'id':2,'photoUrl':"/img/placeholder_large.png"},
                    {'id':3,'photoUrl':"/img/placeholder_large.png"},
                    {'id':4,'photoUrl':"/img/placeholder_large.png"},
                    {'id':5,'photoUrl':"/img/placeholder_large.png"},
                    {'id':6,'photoUrl':"/img/placeholder_large.png"}
                    ];
    $scope.currentEmployeeId = 2;
}]);

fikrimuhalStaj.controller('passcodeCtrl',['$scope',function($scope){

    var employees = $scope.employees;

    var selectedEmployee = {'id': $scope.currentEmployeeId};
    var pinCounter = 1;
    var currentPasscodecurrentPasscodeValue = undefined;
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
        console.log("selectedEmployee.id", selectedEmployee.id)
        console.log("scope selectedEmployee.id", $scope.selectedEmployee);
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