var fikrimuhalStaj = angular.module('fikrimuhalStaj', ['ionic', 'ngAudio']);
// create the controller and inject Angular's $scope

fikrimuhalStaj.run(['$ionicPlatform', '$rootScope', '$state', 'loginService','productService' , function ($ionicPlatform, $rootScope, $state, loginService,productService) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        // if(window.cordova && window.cordova.plugins.Keyboard) {
        // cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        // }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.overlaysWebView(true);
            StatusBar.styleDefault();
            StatusBar.hide();
            ionic.Platform.fullScreen();
        }
    });


    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
//        console.log("event change caught toState", toState);
//        console.log("event change caught fromState", fromState);
//        console.log("event change caught toParams", toParams);
//        console.log("event change caught fromParams", fromParams);

        if (toState.name != "login" && !loginService.isAuth()) {
            event.preventDefault();
            $state.go('login');
        }

        // transitionTo() promise will be rejected with
        // a 'transition prevented' error
    });

}])

    .config(['$httpProvider','$stateProvider', '$urlRouterProvider' , function ($httpProvider,$stateProvider, $urlRouterProvider, dataInProgressService) {

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
                        controller: 'customerListCtrl'
                    }
                }
            })

            .state('customerDetail', {
                url: '/customerDetail',
                views: {
                    'main': {
                        templateUrl: 'views/customer_detail.html',
                        controller: 'customerDetailCtrl'
                    }
                }
            })
            .state('cart', {
                url: '/cart',
                views: {
                    'main': {
                        templateUrl: 'views/cart.html',
                        controller: 'cartCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');
        $httpProvider.interceptors.push('dataInProgressService');

    }]);

fikrimuhalStaj.controller('MainCtrl', function ($scope, $ionicSideMenuDelegate, ngAudio) {

    $scope.toggleLeft = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };


    $scope.audioClick = function () {
        ngAudio.play('tockAudio');
    }
});


fikrimuhalStaj.factory('dataInProgressService',['$rootScope',function ($rootScope){
    var countDownLatch = 0;
    return {
        'request': function(config) {
            if(countDownLatch == 0){
                $rootScope.dataInProgress = true;
            }
            countDownLatch += 1;
            console.log("requests in progress countDownLatch is ", countDownLatch);
            return config;
        },

        'response': function(response) {
            countDownLatch -= 1;
            if(countDownLatch == 0){
                $rootScope.dataInProgress = false;
            }
            console.log("response has came countDownLatch is ", countDownLatch);
            return response;
        }
    
    }
}]);