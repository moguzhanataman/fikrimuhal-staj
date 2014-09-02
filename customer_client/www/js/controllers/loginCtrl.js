fikrimuhalStajCustomer.controller('loginCtrl',[ '$scope','$state','loginService' ,'customerService', function ($scope,$state,loginService,customerService) {

	function selectUser(id){
    	
    	customerService.setUserID(id);
    	console.log("id is ", id);
    	$state.go('customerInfo');
    }

    $scope.selectUser = selectUser;

    $scope.users = loginService.getUserList();
    console.log($scope.users);
	
}]);