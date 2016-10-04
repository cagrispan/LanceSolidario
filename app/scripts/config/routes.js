'use strict';
angular.module('lanceSolidario')
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        //noinspection JSUnresolvedFunction
        $routeProvider
            .when('/login', {
                templateUrl: 'views/user/login.html'
            })
            .when('/home', {
                templateUrl: 'views/common/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'home'
            }).when('/user', {
                templateUrl: 'views/user/dashboard.html',
            }).when('/user/edit', {
                templateUrl: 'views/user/edit.html',
                controller: 'UserUpdate',
                controllerAs: 'userCtrl'
            }).when('/user/edit/address', {
                templateUrl: 'views/user/edit_address.html',
            }).when('/products', {
                templateUrl: 'views/product/list.html',
            }).when('/products/new', {
                templateUrl: 'views/product/new.html',
                controller: 'NewProductCtrl',
                controllerAs: 'productCtrl'
            }).when('/auctions', {
                templateUrl: 'views/auction/list.html',
            }).when('/auctions/new', {
                templateUrl: 'views/auction/new.html',
                controller: 'NewAuctionCtrl',
                controllerAs: 'auctionCtrl'
            })
            .otherwise({redirectTo: '/home'});
    }]);
