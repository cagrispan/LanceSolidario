'use strict';
angular.module('lanceSolidario')
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        //noinspection JSUnresolvedFunction
        $routeProvider
            //Open routes
            .when('/home', {
                templateUrl: 'views/common/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'home'
            })

            .when('/login', {
                templateUrl: 'views/user/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'loginCtrl'
            })

            //Authenticated routes
            .when('/user', {
                templateUrl: 'views/user/dashboard.html',
                controller: 'DashboardCtrl',
                controllerAs: 'dashboardCtrl'
            })

            .when('/user/purchases', {
                templateUrl: 'views/purchase/list.html',
                controller: 'PurchaseListCtrl',
                controllerAs: 'purchaseListCtrl'
            })

            .when('/auctions', {
                templateUrl: 'views/auction/show.html',
            }).when('/user/bids', {
                templateUrl: 'views/bid/list.html',
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
            }).when('/user/auctions', {
                templateUrl: 'views/auction/list.html',
            }).when('/user/auctions/new', {
                templateUrl: 'views/auction/new.html',
                controller: 'NewAuctionCtrl',
                controllerAs: 'auctionCtrl'
            })
            .otherwise({redirectTo: '/home'});
    }]);
