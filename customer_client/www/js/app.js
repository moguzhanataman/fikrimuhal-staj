var fikrimuhalStajCustomer = angular.module('fikrimuhalStajCustomer', ['ionic', 'ngAudio']);
// create the controller and inject Angular's $scope

fikrimuhalStajCustomer.run(['$ionicPlatform', '$rootScope', '$state', function ($ionicPlatform, $rootScope, $state) {
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

    /* Bu kısım kullanıcının login olmadan girmesini engellemek için yazılmıştır şifre ile girilmesi gerekmesi halinde kullanılmaya hazırdır.
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
    });*/

}])

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
                        controller: 'loginCtrl'
                    }
                }
            })
            // Each tab has its own nav history stack:

            .state('customerInfo', {
                url: '/customerInfo',
                views: {
                    'main': {
                        templateUrl: 'views/customer_info.html',
                        controller: 'customerInfoCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');

        /* Access-Control-Allow-Origin hatasını düzeltmek için konuldu releasede kaldırılacak*/
        /* TODO releseade kalkacak*/

    }]);
