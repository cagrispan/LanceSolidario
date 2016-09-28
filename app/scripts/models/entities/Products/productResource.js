/**
 * Created by Aliss on 11/08/2016.
 */
(function (angular) {
    'use strict';
    angular.module('lanceSolidario.product.productResource', ['utils']).service('productResource', ['webService', '$q', 'apiToken', function (webService, $q, apiToken) {
        var self = this;

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

            //Make the request
            return webService.add(endpoint, objectToSend, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

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

            //Make the request
            return webService.update(endpoint, objectToSend, headers).then(
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
