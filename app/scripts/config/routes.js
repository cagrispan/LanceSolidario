'use strict';
angular.module('lanceSolidario')
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        //noinspection JSUnresolvedFunction
        $routeProvider
            .when('/login', {
                templateUrl: 'views/user/login.html'
            })
            .when('/home', {
                templateUrl: 'views/commom/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'home'
            }).when('/user', {
                templateUrl: 'views/user/edit.html',
                controller: 'UserUpdate',
                controllerAs: 'home'
            }).when('/products', {
                templateUrl: 'views/product/list.html'
            }).when('/products/new', {
                templateUrl: 'views/product/new.html'
            })
            .otherwise({redirectTo: '/login'});
    }]);
