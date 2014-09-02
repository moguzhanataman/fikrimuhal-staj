fikrimuhalStajCustomer.controller('baseCtrl',[ '$scope',function ($scope) {

	    $scope.toggleLeft = function () {
        $ionicSideMenuDelegate.toggleLeft();
        console.log(storageService.get("a"));
    };

}]);