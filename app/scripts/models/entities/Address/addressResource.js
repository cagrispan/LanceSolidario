/**
 * Created by Aliss on 11/08/2016.
 */
(function (angular) {
    'use strict';
    angular.module('lanceSolidario.address.addressResource', ['utils']).service('addressResource', ['webService', '$q', 'facebookAPI', function (webService, $q, facebookAPI) {
        var self = this;

        self.add = function (userId, address) {
            var headers = {};
            var endpoint = "";
            var token = facebookAPI.getAPItoken();
            var addressId = "";
            var objectToSend = {};
            //Validate and Mapping
            objectToSend = angular.copy(email);

            if (token) {
                headers.token = token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (email && email.emailId) {
                headers.token = token;
            } else {
                return $q.reject({errorMessage: 'Address id missing'});
            }


            if (userId) {
                endpoint = String.format('/users/%s/emails/%s', userId, addressId);
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

        self.update = function (userId, email) {
            var headers = {};
            var endpoint = "";
            var token = facebookAPI.getAPItoken();
            var addressId = "";
            var objectToSend = {};
            //Validate and Mapping
            objectToSend = angular.copy(email);

            if (token) {
                headers.token = token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (email && email.emailId) {
                headers.token = token;
            } else {
                return $q.reject({errorMessage: 'Address id missing'});
            }


            if (userId) {
                endpoint = String.format('/users/%s/emails/%s', userId, addressId);
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

        //server.delete('/users/:id/address/:id') //delete address
    }
    ])
})
(angular);
