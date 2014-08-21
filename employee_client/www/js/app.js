var fikrimuhalStaj = angular.module('fikrimuhalStaj', ['ngRoute','ngTouch']);

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
		var list = [
			{ "id":5, "description":"Ürün", "fiyat":601 },
			{ "id":15, "description":"Ürün", "fiyat":602 },
			{ "id":25, "description":"Ürün", "fiyat":603 },
			{ "id":35, "description":"Ürün", "fiyat":604 },
			{ "id":45, "description":"Ürün", "fiyat":605 },
			{ "id":55, "description":"Ürün", "fiyat":606 }
		];

		var listL = [];
		var listR = [];

		for (var i = 0; i <= list.length - 1 ; i++) {
			 
			if (i % 2 == 0){
				listL.push(list[i]);
			}else{
			 listR.push(list[i]);
			}
		};

		$scope.productList = {left:listL, right:listR};
		console.log(list.length);
	});

	fikrimuhalStaj.controller('cartController', function($scope) {
		$scope.message = 'Ürün listesi';
	});

	fikrimuhalStaj.controller('SlideController', function($scope) {
  
	  $scope.currentSlide = 1;
	  
	  $scope.slideChanged = function(currSlide) {
	    $scope.currentSlide = currSlide;
	    console.log('Active Slide=' + $scope.currentSlide);
	  }
	});

