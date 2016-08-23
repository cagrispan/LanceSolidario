/**
 * Created by Carlos on 23/07/2016.
 */
angular.module('lanceSolidario')
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        //noinspection JSUnresolvedFunction
        $routeProvider
            .when('/login', {
                templateUrl: 'src/view/login.html'
            })
            .when('/home', {
                templateUrl: 'src/view/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'home'
            }).when('/user', {
                templateUrl: 'src/view/editUser.html',
                controller: 'UserUpdate',
                controllerAs: 'home'
            })
            .otherwise({redirectTo: '/login'});
    }]);