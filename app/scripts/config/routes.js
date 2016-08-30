/**
 * Created by Carlos on 23/07/2016.
 */
angular.module('lanceSolidario')
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        //noinspection JSUnresolvedFunction
        $routeProvider
            .when('/login', {
                templateUrl: 'views/login.html'
            })
            .when('/home', {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'home'
            }).when('/user', {
                templateUrl: 'views/editUser.html',
                controller: 'UserUpdate',
                controllerAs: 'home'
            })
            .otherwise({redirectTo: '/login'});
    }]);