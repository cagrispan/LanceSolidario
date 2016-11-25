/**
 * Created by Aliss on 11/08/2016.
 */
(function (angular) {
    'use strict';
    angular.module('lanceSolidario.image.imageResource', ['utils']).service('imageResource', ['webService', '$q', 'apiToken', function (webService, $q, apiToken) {
        var self = this;

        /*
         * Add a image for a product
         * Documented 25/11/2016
         */
        self.add = function (image, user) {
            var headers = {};
            var endpoint = "";
            var token = apiToken.getApiToken();
            var objectToSend;

            //Validate and Mapping
            objectToSend = angular.copy(image);

            if (token) {
                headers.token = token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }
            if (user && user.facebookId) {
                endpoint = '/users/' + user.facebookId + '/products/' + image.productId + '/images';
            } else {
                return $q.reject({errorMessage: 'FacebookId missing'});
            }

            delete objectToSend.imageId;

            //Make the request
            return webService.add(endpoint, objectToSend, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        /*
         * Remove a image of a product
         * Documented 23/11/2016
         */
        self.remove = function (image, user) {
            var headers = {};
            var endpoint = "";
            var token = apiToken.getApiToken();


            if (token) {
                headers.token = token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }
            if (user && user.facebookId) {
                endpoint = '/users/' + user.facebookId + '/products/' + image.productId + '/images/' + image.imageId;
            } else {
                return $q.reject({errorMessage: 'FacebookId missing'});
            }

            //Make the request
            return webService.remove(endpoint, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        /*
         * List images of a product
         * Documented 23/11/2016
         */
        self.loadImagesByProduct = function (product) {
            var headers = {};
            var endpoint = '';
            var token = apiToken.getApiToken();

            //Validate and Mapping

            //TODO Need to be unified
            if (product && product.facebookId) {
                endpoint = '/users/' + product.facebookId + '/products/' + product.productId + '/images';
            } else {
                if (product && product.userId) {
                    endpoint = '/users/' + product.userId+ '/products/' + product.productId + '/images';
                } else {
                    return $q.reject({errorMessage: 'FacebookId missing'});
                }
            }

            //Make the request
            return webService.read(endpoint, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };
    }])
})(angular);
