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