fikrimuhalStaj.controller('customerListController', function ($scope) {
    $scope.message = 'Müşteri seçin.';
});

fikrimuhalStaj.controller('PostsCtrlAjax', function ($scope, $http) {
    $http({method: 'GET', url: config.api.urls.customerList }).success(function (data) {
        var customerlistL = [];
        var customerlistR = [];

        /* TODO bir listeyi ikiye ayıracak fonksiyon yazılacak */

        for (var i = 0; i <= data.customers.length - 1; i++) {

            if (i % 2 == 0) {
                customerlistL.push(data.customers[i]);
            } else {
                customerlistR.push(data.customers[i]);
            }
        };

        $scope.customerList = {left: customerlistL, right: customerlistR};
    });
})
