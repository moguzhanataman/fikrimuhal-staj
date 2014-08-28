fikrimuhalStaj.controller('LoginCtrl', [ '$scope' , 'loginService' , function ($scope, loginService) {
    
    console.log("main controller called");

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

}]);

fikrimuhalStaj.controller('passcodeCtrl',['$scope',function($scope){

    $scope.employees = [
                            {'id':1,'photoUrl':"/img/placeholder_large.png"},
                            {'id':2,'photoUrl':"/img/placeholder_large.png"},
                            {'id':3,'photoUrl':"/img/placeholder_large.png"},
                            {'id':4,'photoUrl':"/img/placeholder_large.png"},
                            {'id':5,'photoUrl':"/img/placeholder_large.png"},
                            {'id':6,'photoUrl':"/img/placeholder_large.png"}
    ];

    $scope.selectedEmployeeId = 3; 

    $scope.passcode = {
        'pins':{
            '1': "",
            '2': "",
            '3': "",
            '4': ""
        },
        'value': "1234"
    }
    resetPins();
    $scope.selectEmployee = function(id) {
        $scope.selectedEmployeeId = id;
        resetPins();
    }
    $scope.addPin = function(number) {
        $scope.passcode.pins[$scope.pinCounter++] = number;
        if($scope.pinCounter == 5)
        {
            checkPasscode(combinePins($scope.passcode.pins));
        }
    }

    function checkPasscode(pass) {
        if(pass == $scope.passcode.value) {
            alert("Şifre Doğru!!!");
        } else {
            alert("Şifre Yanlış Pinler sıfırlanıyor" + pass);
            resetPins();
        }
    }
    function combinePins(pinObject) {
        var pass = "" + pinObject[1] + pinObject[2] + pinObject[3] + pinObject[4];
        return pass;
    }
    function resetPins() {
        $scope.pinCounter = 1;
        $scope.passcode.pins[1] = "";
        $scope.passcode.pins[2] = "";
        $scope.passcode.pins[3] = "";
        $scope.passcode.pins[4] = "";
    }

}])