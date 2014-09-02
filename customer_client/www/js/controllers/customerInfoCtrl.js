fikrimuhalStajCustomer.controller('customerInfoCtrl',[ '$scope', '$state', 'customerService', 'loginService' , function($scope,$state,customerService,loginService) {
	function parser(){

		console.log("value is", $scope.uuidValue, $scope.majorValue, $scope.minorValue, $scope.idValue);
	}

	$scope.uuidValue = 'DA5336AE-2042-453A-A57F-F80DD34DFCD9';
	$scope.majorValue = 5;
	$scope.minorValue = 1000;
	$scope.idValue = 'beaconAtTheMacBooks';

	$scope.sender=parser;

}]);
