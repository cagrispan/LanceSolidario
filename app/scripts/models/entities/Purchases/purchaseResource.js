/**
 * Created by Aliss on 11/08/2016.
 */
(function (angular) {
    'use strict';
    angular.module('lanceSolidario.purchase.purchaseResource', ['utils']).service('purchaseResource', ['webService', '$q', 'apiToken', function (webService, $q, apiToken) {
        var self = this;

        self.update = function (purchase, user) {
            var headers = {};
            var endpoint = "";
            var token = apiToken.getApiToken();
            var purchaseId = "";
            var objectToSend;

            //Validate and Mapping
            objectToSend = angular.copy(purchase);

            if (token) {
                headers.token = token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (purchase && purchase.purchaseId) {
                purchaseId = purchase.purchaseId;
            } else {

                return $q.reject({errorMessage: 'purchase id missing'});
            }


            if (user && user.facebookId) {
                endpoint = '/users/'+user.facebookId+'/purchases/'+purchaseId;
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

        self.load = function (purchase) {
            var headers = {};
            var endpoint = '';
            var token = apiToken.getApiToken();

            //Validate and Mapping
            if (token) {
                headers.token = token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (purchase && purchase.facebookId) {
                endpoint = '/users/' + purchase.facebookId + '/purchases/' + purchase.purchaseId ;
            } else {
                return $q.reject({errorMessage: 'Id missing'});
            }

            //Make the request
            return webService.read(endpoint, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        self.loadAll = function (user) {
            var headers = {};
            var endpoint = '';
            var token = apiToken.getApiToken();

            //Validate and Mapping
            if (token) {
                headers.token = token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }


            if (user && user.facebookId) {
                endpoint = '/users/' + user.facebookId + '/purchases';
            } else {
                return $q.reject({errorMessage: 'FacebookId missing'});
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
