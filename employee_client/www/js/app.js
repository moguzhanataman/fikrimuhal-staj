var fikrimuhalStaj = angular.module('fikrimuhalStaj', ['ionic', 'ngAudio']);
// create the controller and inject Angular's $scope

fikrimuhalStaj.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        // if(window.cordova && window.cordova.plugins.Keyboard) {
        // cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        // }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('login', {
                url: "/login",
                views: {
                    'main': {
                        templateUrl: "views/login.html",
                        controller: 'LoginCtrl'
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
            })
            .state('attendees', {
                url: "/attendees",
                views: {
                    'main': {
                        templateUrl: "views/attendees.html",
                        controller: "AttendeesCtrl"
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');

        /* Access-Control-Allow-Origin hatasını düzeltmek için konuldu releasede kaldırılacak*/
        /* TODO releseade kalkacak*/

    }]);

fikrimuhalStaj.controller('MainCtrl', function ($scope, $ionicSideMenuDelegate,ngAudio) {
    $scope.attendees = [
        { firstname: 'Nicolas', lastname: 'Cage' },
        { firstname: 'Jean-Claude', lastname: 'Van Damme' },
        { firstname: 'Jean-Claude', lastname: 'Van Damme' },
        { firstname: 'Jean-Claude', lastname: 'Van Damme' },
        { firstname: 'Jean-Claude', lastname: 'Van Damme' },
        { firstname: 'Jean-Claude', lastname: 'Van Damme' },
        { firstname: 'Jean-Claude', lastname: 'Van Damme' },
        { firstname: 'Jean-Claude', lastname: 'Van Damme' },
        { firstname: 'Jean-Claude', lastname: 'Van Damme' },
        { firstname: 'Jean-Claude', lastname: 'Van Damme' },
        { firstname: 'Jean-Claude', lastname: 'Van Damme' },
        { firstname: 'Jean-Claude', lastname: 'Van Damme' },
        { firstname: 'Jean-Claude', lastname: 'Van Damme' },
        { firstname: 'Jean-Claude', lastname: 'Van Damme' },
        { firstname: 'Jean-Claude', lastname: 'Van Damme' },
        { firstname: 'Jean-Claude', lastname: 'Van Damme' },
        { firstname: 'Jean-Claude', lastname: 'Van Damme' },
        { firstname: 'Keanu', lastname: 'Reeves' },
        { firstname: 'Steven', lastname: 'Seagal' }
    ];

    $scope.toggleLeft = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };


    $scope.audioClick = function() {
        console.log("audioClick");
        ngAudio.play('tockAudio');
    }
});

fikrimuhalStaj.controller('LoginCtrl', [ '$scope' , 'loginService' , function ($scope, loginService) {
    console.log("main controller called");
    var employeePromise = loginService.auth();
    console.log("employee", employeePromise);
    employeePromise.then(function (e) {
        $scope.employee = e;
        console.log("sucess oldu", e)
    }).catch(function (e) {
        console.log("hata oldu", e)
    }).finally(function () {
        console.log("finally")
    });
    // create a message to display in our view
    $scope.message = 'Şifreniniz girin!';
    $scope.employee = "bekleniyor";

}]);


fikrimuhalStaj.controller('customerListController', function ($scope) {
    $scope.message = 'Müşteri seçin.';
});


fikrimuhalStaj.controller('customerDetailController', function ($scope) {
    $scope.message = 'Ürün seçin';
    var list = [
        { "id": 5, "description": "Ürün", "fiyat": 601 },
        { "id": 15, "description": "Ürün", "fiyat": 602 },
        { "id": 25, "description": "Ürün", "fiyat": 603 },
        { "id": 35, "description": "Ürün", "fiyat": 604 },
        { "id": 45, "description": "Ürün", "fiyat": 605 },
        { "id": 55, "description": "Ürün", "fiyat": 606 }
    ];

    var productCart = [
        {}
    ];

    /* TODO bir listeyi ikiye ayıracak fonksiyon yazılacak */

    var listL = [];
    var listR = [];

    for (var i = 0; i <= list.length - 1; i++) {

        if (i % 2 == 0) {
            listL.push(list[i]);
        } else {
            listR.push(list[i]);
        }
    }
    ;

    $scope.sliderState = 1;
    $scope.productList = {left: listL, right: listR};

    /* TODO  lodash kur lodashle sil */
    function slideHasChanged(product, index, listNo) {
        console.log(" id ", product.id, " index ", index);

        /* This if  */
        if (index == 2) {

            var indexofProductL = listL.indexOf(product);
            console.log("indexofProductL", indexofProductL);

            if (indexofProductL > -1) {
                listL.splice(indexofProductL, 1);
            }

            var indexofProductR = listR.indexOf(product);
            console.log("indexofProductR", indexofProductR);

            if (indexofProductR > -1) {
                listR.splice(indexofProductR, 1);
            }
        }

        if (index == 0) {

        }
    }

    $scope.slideHasChanged = slideHasChanged;
});

fikrimuhalStaj.controller('cartController', function ($scope) {
    $scope.message = 'Ürün listesi';
    $scope.sliderState = 1;
    $scope.campaign = { 'name': "anneler günü", 'discount': 159, 'totalAfterDiscount': 1800 }
    var mockCartItems = [
    					{'id':5, 'name':"kazak", 'price':100, 'amount':1,'subPrice':9100,'discountedPrice':90},
    					{'id':415, 'name':"kazak", 'price':100, 'amount':2,'subPrice':8100,'discountedPrice':80},
    					{'id':435, 'name':"kazak", 'price':100, 'amount':3,'subPrice':7100,'discountedPrice':700},
    					{'id':455, 'name':"kazak", 'price':100, 'amount':4,'subPrice':6100,'discountedPrice':600},
    					{'id':456, 'name':"kazak", 'price':100, 'amount':5,'subPrice':5100,'discountedPrice':500},
    					{'id':4545, 'name':"kazak", 'price':100, 'amount':1,'subPrice':4100,'discountedPrice':400},
    					{'id':458, 'name':"kazak", 'price':100, 'amount':1,'subPrice':3100,'discountedPrice':300},
    					{'id':459, 'name':"kazak", 'price':100, 'amount':1,'subPrice':2100,'discountedPrice':200},
    					{'id':451, 'name':"kazak", 'price':100, 'amount':1,'subPrice':1100,'discountedPrice':100},
    					{'id':453, 'name':"kazak", 'price':100, 'amount':1,'subPrice':-100,'discountedPrice':1100},
						];

    $scope.cart = {'cartItems':mockCartItems, 'totalPrice' : 1959};
    $scope.currentCustomer = {'name': "Hakkı Özveren Bayraktaşıyan", 'id': 15 };
});

fikrimuhalStaj.controller('SlideController', function ($scope) {

    $scope.currentSlide = 1;

    $scope.slideChanged = function (currSlide) {
        $scope.currentSlide = currSlide;
        console.log('Active Slide=' + $scope.currentSlide);
    }
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

    .controller('AttendeesCtrl', function ($scope) {

        $scope.activity = [];
        $scope.arrivedChange = function (attendee) {
            var msg = attendee.firstname + ' ' + attendee.lastname;
            msg += (!attendee.arrived ? ' has arrived, ' : ' just left, ');
            msg += new Date().getMilliseconds();
            $scope.activity.push(msg);
            if ($scope.activity.length > 3) {
                $scope.activity.splice(0, 1);
            }
        };

    });