/**
 * Created by Aliss on 11/08/2016.
 */
(function (angular) {
    'use strict';
    angular.module('lanceSolidario.bid.bidResource', ['utils']).service('bidResource', ['webService', '$q', 'apiToken', function (webService, $q, apiToken) {
        var self = this;

        self.add = function (bid) {
            var headers = {};
            var endpoint = "";
            var token = apiToken.getApiToken();
            var objectToSend;

            //Validate and Mapping
            objectToSend = angular.copy(bid);

            if (token) {
                headers.token = token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }
            if (bid && bid.facebookId) {
                endpoint = '/users/' + bid.facebookId + '/bids';
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

        self.update = function (bid) {
            var headers = {};
            var endpoint = "";
            var token = apiToken.getApiToken();
            var bidId = "";
            var objectToSend;

            //Validate and Mapping
            objectToSend = angular.copy(bid);

            if (token) {
                headers.token = token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (bid && bid.bidId) {
                bidId = bid.bidId;
            } else {

                return $q.reject({errorMessage: 'Bid id missing'});
            }


            if (bid && bid.facebookId) {
                endpoint = '/users/' + bid.facebookId + '/bids/' + bidId;
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

        self.loadBidsByUser = function (user) {
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
                endpoint = '/users/' + user.facebookId + '/bids';
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
