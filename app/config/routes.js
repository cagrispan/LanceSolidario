/**
 * Created by Carlos on 23/07/2016.
 */
angular.module('lanceSolidario')
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'view/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'login'
            })
            .when('/home', {
                templateUrl: 'view/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'home'
            })
            .otherwise({redirectTo: '/home'});
    }]);