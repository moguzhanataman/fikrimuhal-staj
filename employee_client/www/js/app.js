var fikrimuhalStaj = angular.module('fikrimuhalStaj', ['ionic', 'ngAudio']);
// create the controller and inject Angular's $scope

fikrimuhalStaj.run(['$ionicPlatform','$rootScope', '$state','loginService',function ($ionicPlatform,$rootScope,$state,loginService) {
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
    

    $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){ 
        /*console.log("event change caught toState", toState);
        console.log("event change caught fromState", fromState);
        console.log("event change caught toParams", toParams);
        console.log("event change caught fromParams",fromParams);
        
        if(toState.name != "login" && !loginService.isAuth() ){
            event.preventDefault();
            //$state.go('login');
        }
        */
        // transitionTo() promise will be rejected with 
        // a 'transition prevented' error
    })
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
        ngAudio.play('tockAudio');
    }
});

fikrimuhalStaj.controller('AttendeesCtrl', function ($scope) {

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