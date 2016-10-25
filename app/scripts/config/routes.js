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

            //Profile
            .when('/user/edit', {
                templateUrl: 'views/user/edit.html',
                controller: 'UserUpdate',
                controllerAs: 'userCtrl'
            })
            .when('/user/edit/address', {
                templateUrl: 'views/user/edit_address.html',
                controller: 'AddressUpdate',
                controllerAs: 'addressCtrl'
            })
            .when('/user/edit/contact', {
                templateUrl: 'views/user/edit_contact.html',
                controller: 'ContactUpdate',
                controllerAs: 'contactCtrl'
            })

            //Dashboard
            .when('/user', {
                templateUrl: 'views/user/dashboard.html',
                controller: 'DashboardCtrl',
                controllerAs: 'dashboardCtrl'
            })

            //Products
            .when('/user/products', {
                templateUrl: 'views/product/list.html',
                controller: 'ProductListCtrl',
                controllerAs: 'productCtrl'
            })

            .when('/user/products/new', {
                templateUrl: 'views/product/new.html',
                controller: 'NewProductCtrl',
                controllerAs: 'productCtrl'
            })

            .when('/user/products/detail', {
                templateUrl: 'views/product/edit.html',
                controller: 'ProductDetailCtrl',
                controllerAs: 'productCtrl'
            })

            //Auctions
            .when('/auctions/detail', {
                templateUrl: 'views/auction/show.html',
                controller: 'AuctionDetailCtrl',
                controllerAs: 'auctionDetailCtrl'
            })

            .when('/user/purchases', {
                templateUrl: 'views/purchase/list.html',
                controller: 'PurchaseListCtrl',
                controllerAs: 'purchaseListCtrl'
            })


            .when('/user/bids', {
                templateUrl: 'views/bid/list.html',
                controller: 'BidList',
                controllerAs: 'bidCtrl'
            })
            .when('/user/auctions', {
                templateUrl: 'views/auction/list.html'
            })
            .when('/user/auctions/new', {
                templateUrl: 'views/auction/new.html',
                controller: 'NewAuctionCtrl',
                controllerAs: 'auctionCtrl'
            })
            .otherwise({redirectTo: '/home'});
    }]);
