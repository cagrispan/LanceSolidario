/**
 * Created by Aliss on 11/08/2016.
 */
(function (angular) {
    'use strict';
    angular.module('lanceSolidario.auction.auctionResource', ['utils']).service('auctionResource', ['webService', '$q', 'apiToken', function (webService, $q, apiToken) {
        var self = this;

        self.add = function (auction) {
            var headers = {};
            var endpoint = "";
            var token = apiToken.getApiToken();
            var objectToSend;

            //Validate and Mapping
            objectToSend = angular.copy(auction);

            if (token) {
                headers.token = token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }
            if (auction && auction.facebookId) {
                endpoint = '/users/' + auction.facebookId + '/auctions';
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

        self.update = function (auction) {
            var headers = {};
            var endpoint = "";
            var token = apiToken.getApiToken();
            var auctionId = "";
            var objectToSend;

            //Validate and Mapping
            objectToSend = angular.copy(auction);

            if (token) {
                headers.token = token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (auction && auction.auctionId) {
                auctionId = auction.auctionId;
            } else {

                return $q.reject({errorMessage: 'Auction id missing'});
            }


            if (auction && auction.facebookId) {
                endpoint = '/users/' + auction.facebookId + '/auctions/' + auctionId;
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

        self.loadAuctions = function (user) {
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
                endpoint = '/users/' + user.facebookId + '/auctions';
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
