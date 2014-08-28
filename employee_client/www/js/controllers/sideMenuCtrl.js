fikrimuhalStaj.controller('sideMenuCtrl', ['loginService','$scope',function (loginService,$scope) {
	
	$scope.logout =function logout(){
		loginService.logout();
		//$state.go('login');
	}

}])