'use strict';
angular.module('utils')
    .service('distanceAPI', [ 'GoogleDistanceAPI', function (GoogleDistanceAPI) {

        var self = this;

        this.get = function (origin, destination) {
            origin = origin.replace('-','');
            destination = destination.replace('-','');
            var args = {
                origins: [origin],
                destinations: [destination]
            };

            return GoogleDistanceAPI
                .getDistanceMatrix(args)
                .then(function (distanceMatrix) {
                    return distanceMatrix;
                });
        };

        this.getApiToken = function () {
            return self.token;
        };


    }]);
