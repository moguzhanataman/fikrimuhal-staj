var fikrimuhalStaj = angular.module('fikrimuhalStaj', ['ionic']);
	// create the controller and inject Angular's $scope

fikrimuhalStaj.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    // if(window.cordova && window.cordova.plugins.Keyboard) {
      // cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    // }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider){

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

  /* Access-Control-Allow-Origin hatasını düzeltmek için konuldu releasede kaldırılacak*/ /* TODO releseade kalkacak*/

}]);

fikrimuhalStaj.controller('mainController', [ '$scope' ,'loginService' , function($scope,loginService) {
	console.log("main controller called");
	var employeePromise= loginService.auth();
	console.log("employee", employeePromise);
	employeePromise.then(function ( e ){
		$scope.employee = e ;
		console.log("sucess oldu", e )
	}).catch(function ( e ){
		console.log("hata oldu", e )
	}).finally(function (){
		console.log("finally")
	})
	// create a message to display in our view
	$scope.message = 'Şifreniniz girin!';
	$scope.employee = "bekleniyor";

}]);


fikrimuhalStaj.controller('customerListController', function($scope) {
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

	var productCart= [{}];

	/* TODO bir listeyi ikiye ayıracak fonksiyon yazılacak */

	var listL = [];
	var listR = [];

	for (var i = 0; i <= list.length - 1 ; i++) {
		 
		if (i % 2 == 0){
			listL.push(list[i]);
		}else{
		 listR.push(list[i]);
		}
	};

	$scope.sliderState = 1;
	$scope.productList = {left:listL, right:listR};

	/* TODO  lodash kur lodashle sil */
	function slideHasChanged(product,index,listNo){
		console.log(" id " , product.id , " index " , index);

		/* This if  */
		if(index == 2){

			var indexofProductL = listL.indexOf(product);
			console.log("indexofProductL", indexofProductL);
			
			if (indexofProductL > -1 ) {
				listL.splice(indexofProductL,1);
			}

			var indexofProductR = listR.indexOf(product);
			console.log("indexofProductR", indexofProductR);
			
			if (indexofProductR > -1) {
				listR.splice(indexofProductR,1);
			}
		}

		if (index == 0)
		{

		}
	}
	$scope.slideHasChanged = slideHasChanged;
});

fikrimuhalStaj.controller('cartController', function($scope) {
	$scope.message = 'Ürün listesi';
	$scope.sliderState = 1;
});

fikrimuhalStaj.controller('SlideController', function($scope) {

  $scope.currentSlide = 1;
  
  $scope.slideChanged = function(currSlide) {
    $scope.currentSlide = currSlide;
    console.log('Active Slide=' + $scope.currentSlide);
  }
});

fikrimuhalStaj.controller('PostsCtrlAjax', function($scope, $http) {
	$http({method: 'GET', url: config.api.urls.customerList }).success(function(data)
	{
		var customerlistL = [];
		var customerlistR = [];

		/* TODO bir listeyi ikiye ayıracak fonksiyon yazılacak */

		for (var i = 0; i <= data.customers.length - 1 ; i++) {
			 
			if (i % 2 == 0){
				customerlistL.push(data.customers[i]);
			}else{
			 customerlistR.push(data.customers[i]);
			}
		};

		$scope.customerList = {left:customerlistL, right:customerlistR};
	});
})


function MainCtrl($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeftSideMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
};
}
