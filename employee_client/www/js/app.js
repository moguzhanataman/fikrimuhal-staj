var fikrimuhalStaj = angular.module('fikrimuhalStaj', ['ionic'/*,'ngRoute'*/]);

	// create the controller and inject Angular's $scope

fikrimuhalStaj.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('login', {
	    url: "/login",
		    views:{
			    'main':{
				    templateUrl: "views/login.html",
				    controller: 'mainController'
		    }
	    }
    })


    // Each tab has its own nav history stack:

    .state('customerList', {
      url: '/customerList',
      views: {
        'main': {
          templateUrl: 'views/customer_list.html',
          controller: 'customerListController'
        }
      }
    })

    .state('customerDetail', {
      url: '/customerDetail',
      views: {
        'main': {
          templateUrl: 'views/customer_detail.html',
          controller: 'customerDetailController'
        }
      }
    })
    .state('cart', {
      url: '/cart',
      views: {
        'main': {
          templateUrl: 'views/cart.html',
          controller: 'cartController'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
/*
fikrimuhalStaj.config(function(/*$routeProvider) {
		/*$routeProvider

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
*/
	fikrimuhalStaj.controller('mainController', function($scope) {

		// create a message to display in our view
		$scope.message = 'Şifreniniz girin!';
		console.log("main cotroller logger")
	});


	fikrimuhalStaj.controller('customerListController', function($scope) {
		$scope.message = 'Müşteri seçin.';
		console.log("customer list controller logger")
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
