fikrimuhalStaj.controller('customerListCtrl', ['$scope', 'loginService', function ($scope, loginService) {
    $scope.message = 'Müşteri seçin.';
    console.log(loginService.loggedinEmployee());
}]);

fikrimuhalStaj.controller('PostsCtrlAjax', function ($scope, $http) {
    $http({method: 'GET', url: config.api.urls.customerList }).success(function (data) {

        $scope.customerList = splitArray(data.customers);
    });
});
