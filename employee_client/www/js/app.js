var fikrimuhalStaj = angular.module('fikrimuhalStaj', ['ngRoute']);

	// create the controller and inject Angular's $scope

fikrimuhalStaj.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'views/login.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/goCustomerList', {
				templateUrl : 'views/customer_list.html',
				controller  : 'costumerListController'
			})

			// route for the contact page
			.when('/goCustomerDetails', {
				templateUrl : 'views/customer_detail.html',
				controller  : 'customerDetailController'
			})

			.when('/goShoppingCart', {
				templateUrl : 'views/cart.html',
				controller  : 'cartController'
			});
	});

	fikrimuhalStaj.controller('mainController', function($scope) {

		// create a message to display in our view
		$scope.message = 'Şifreniniz girin!';
	});


	fikrimuhalStaj.controller('costumerListController', function($scope) {
		$scope.message = 'Müşteri seçin.';
	});

	fikrimuhalStaj.controller('customerDetailController', function($scope) {
		$scope.message = 'Ürün seçin';
	});

	fikrimuhalStaj.controller('cartController', function($scope) {
		$scope.message = 'Ürün listesi';
	});