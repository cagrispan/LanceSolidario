'use strict';
angular.module('lanceSolidario')
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        //noinspection JSUnresolvedFunction
        $routeProvider

            // ---------------- Open routes ----------------

            //404
            .when('/404', {
                templateUrl: '404.html'
            })

            //Institutional
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

            //Auctions
            .when('/auctions', {
                templateUrl: 'views/auction/list.html'
            })
            .when('/auctions/:auctionId', {
                templateUrl: 'views/auction/show.html',
                controller: 'AuctionDetailCtrl',
                controllerAs: 'auctionDetailCtrl'
            })


            //---------------- Authenticated routes ----------------


            //Dashboard
            .when('/user', {
                templateUrl: 'views/user/dashboard.html',
                controller: 'DashboardCtrl',
                controllerAs: 'dashboardCtrl'
            })

            //Profile
            .when('/user/profile', {
                templateUrl: 'views/user/edit.html',
                controller: 'UserUpdate',
                controllerAs: 'userCtrl'
            })
            .when('/user/address', {
                templateUrl: 'views/user/edit_address.html',
                controller: 'AddressUpdate',
                controllerAs: 'addressCtrl'
            })
            .when('/user/contact', {
                templateUrl: 'views/user/edit_contact.html',
                controller: 'ContactUpdate',
                controllerAs: 'contactCtrl'
            })

            //Products
            .when('/user/products', {
                templateUrl: 'views/product/list.html',
                controller: 'ProductListCtrl',
                controllerAs: 'productCtrl'
            })
            .when('/user/products/add', {
                templateUrl: 'views/product/new.html',
                controller: 'NewProductCtrl',
                controllerAs: 'productCtrl'
            })
            .when('/user/products/:productId', {
                templateUrl: 'views/product/edit.html',
                controller: 'ProductDetailCtrl',
                controllerAs: 'productCtrl'
            })

            //Purchases
            .when('/user/purchases', {
                templateUrl: 'views/purchase/list.html',
                controller: 'PurchaseListCtrl',
                controllerAs: 'purchaseListCtrl'
            })
            .when('/user/purchases/:purchaseId', {
                templateUrl: 'views/purchase/edit.html'
            })

            //Auctions
            .when('/user/auctions/add', {
                templateUrl: 'views/auction/new.html',
                controller: 'NewAuctionCtrl',
                controllerAs: 'auctionCtrl'
            })

            //Bids
            .when('/user/bids', {
                templateUrl: 'views/bid/list.html',
                controller: 'BidList',
                controllerAs: 'bidCtrl'
            })

            .otherwise({redirectTo: '/404'});
    }]);
