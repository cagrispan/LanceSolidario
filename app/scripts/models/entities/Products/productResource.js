/**
 * Created by Aliss on 11/08/2016.
 */
(function (angular) {
    'use strict';
    angular.module('lanceSolidario.product.productResource', ['utils']).service('productResource', ['webService', '$q', 'apiToken', function (webService, $q, apiToken) {
        var self = this;


        /*
         * Add a new product
         * Documented 25/11/2016
         */
        self.add = function (product) {
            var headers = {};
            var endpoint = "";
            var token = apiToken.getApiToken();
            var objectToSend;

            //Validate and Mapping
            objectToSend = angular.copy(product);

            if (token) {
                headers.token = token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }
            if (product && product.facebookId) {
                endpoint = '/users/'+product.facebookId+'/products';
            } else {
                return $q.reject({errorMessage: 'FacebookId missing'});
            }

            delete objectToSend.productId;
            delete objectToSend.auctionList;
            delete objectToSend.imageList;
            delete objectToSend.status;

            //Make the request
            return webService.add(endpoint, objectToSend, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        /*
         * Update information of a product
         * Documented 23/11/2016
         */
        self.update = function (product) {
            var headers = {};
            var endpoint = "";
            var token = apiToken.getApiToken();
            var productId = "";
            var objectToSend;

            //Validate and Mapping
            objectToSend = angular.copy(product);

            if (token) {
                headers.token = token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (product && product.productId) {
                productId = product.productId;
            } else {

                return $q.reject({errorMessage: 'product id missing'});
            }


            if (product && product.facebookId) {
                endpoint = '/users/'+product.facebookId+'/products/'+productId;
            } else {

                return $q.reject({errorMessage: 'FacebookId missing'});
            }

            delete objectToSend.auctionList;
            delete objectToSend.imageList;
            delete objectToSend.status;

            //Make the request
            return webService.update(endpoint, objectToSend, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        /*
         * Load information of a product
         * Documented 23/11/2016
         */
        self.load = function (product) {
            var headers = {};
            var endpoint = '';
            var token = apiToken.getApiToken();

            //Validate and Mapping
            if (token) {
                headers.token = token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (product && product.facebookId) {
                endpoint = '/users/' + product.facebookId + '/products/' + product.productId ;
            } else {
                return $q.reject({errorMessage: 'facebookId missing'});
            }

            //Make the request
            return webService.read(endpoint, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        /*
         * List products by User
         * Documented 23/11/2016
         */
        self.loadProductsByUser = function (user) {
            var headers = {};
            var endpoint = '';

            //Validate and Mapping
            if (user && user.token) {
                headers.token = user.token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (user && user.facebookId) {
                endpoint = '/users/'+user.facebookId+'/products';
            } else {
                return $q.reject({errorMessage: 'FacebookId missing'});
            }

            //Make the request
            return webService.read(endpoint, headers).then(
                function (resolve) {
                    return resolve.data.products;
                }
            );
        };

        /*
         * Load information of a product
         * Documented 23/11/2016
         */
        self.loadProductsByAuction = function (auction) {
            var headers = {};
            var endpoint = '';
            var token = apiToken.getApiToken();

            //Validate and Mapping


            if (auction && auction.auctionId) {
                endpoint = '/auctions/' + auction.auctionId + '/products';
            } else {
                return $q.reject({errorMessage: 'AuctionId missing'});
            }

            //Make the request
            return webService.read(endpoint, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        //server.delete('/users/:id/product/:id') //delete product
    }
    ])
})
(angular);
