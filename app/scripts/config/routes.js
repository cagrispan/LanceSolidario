'use strict';
angular.module('lanceSolidario')
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        //noinspection JSUnresolvedFunction
        $routeProvider
            .when('/login', {
                templateUrl: 'views/user/login.html'
            }).when('/about', {
                templateUrl: 'views/common/about.html'
            }).when('/partners', {
                templateUrl: 'views/common/partners.html'
            }).when('/us', {
                templateUrl: 'views/common/us                                                                               .html'
            }).when('/home', {
                templateUrl: 'views/common/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'home'
            }).when('/auctions', {
                templateUrl: 'views/auction/list.html',
            }).when('/auctions/template', {
                templateUrl: 'views/auction/show.html',
            }).when('/user', {
                templateUrl: 'views/user/dashboard.html',
            }).when('/user/biddings', {
                templateUrl: 'views/bidding/list.html',
                controller: 'BidList',
                controllerAs: 'bidCtrl'
            }).when('/user/edit', {
                templateUrl: 'views/user/edit.html',
                controller: 'UserUpdate',
                controllerAs: 'userCtrl'
            }).when('/user/edit/address', {
                templateUrl: 'views/user/edit_address.html',
                controller:'AddressUpdate',
                controllerAs:'addressCtrl'
            }).when('/user/edit/contact', {
                templateUrl: 'views/user/edit_contact.html',
                controller:'ContactUpdate',
                controllerAs:'contactCtrl'
            }).when('/user/products', {
                templateUrl: 'views/product/list.html',
                controller: 'ProductList',
                controllerAs: 'productCtrl'
            }).when('/user/products/new', {
                templateUrl: 'views/product/new.html',
                controller: 'ProductNew',
                controllerAs: 'productCtrl'
            }).when('/user/purchases', {
                templateUrl: 'views/purchase/list.html',
            }).when('/user/purchases/template', {
                templateUrl: 'views/purchase/edit.html',
            }).when('/user/auctions', {
                templateUrl: 'views/auction/list.html',
            }).when('/user/auctions/new', {
                templateUrl: 'views/auction/new.html',
                controller: 'NewAuctionCtrl',
                controllerAs: 'auctionCtrl'
            })
            .otherwise({redirectTo: '/home'});
    }]);
