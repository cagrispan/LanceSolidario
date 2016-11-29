/**
 * Created by Aliss on 11/08/2016.
 */
(function (angular) {
    'use strict';
    angular.module('lanceSolidario.address.addressResource', ['utils']).service('addressResource', ['webService', '$q', 'apiToken', function (webService, $q, apiToken) {
        var self = this;

        /*
         * Add a new Address for an User
         * Documented 26/11/2016
         */
        self.add = function (address) {
            var headers = {};
            var endpoint = "";
            var token = apiToken.getApiToken();
            var objectToSend;

            //Validate and Mapping
            objectToSend = angular.copy(address);

            if (token) {
                headers.token = token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }
            if (address && address.facebookId) {
                endpoint = '/users/'+address.facebookId+'/addresses';
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

        /*
         * Update an Address for an User
         * Documented 26/11/2016
         */
        self.update = function (address) {
            var headers = {};
            var endpoint = "";
            var token = apiToken.getApiToken();
            var addressId = "";
            var objectToSend;

            //Validate and Mapping
            objectToSend = angular.copy(address);

            if (token) {
                headers.token = token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (address && address.addressId) {
                addressId = address.addressId;
            } else {

                return $q.reject({errorMessage: 'Address id missing'});
            }


            if (address && address.facebookId) {
                endpoint = '/users/'+address.facebookId+'/addresses/'+addressId;
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

        /*
         * Remove an Address of an User
         * Documented 26/11/2016
         */
        self.remove = function (address) {
            var headers = {};
            var endpoint = "";
            var token = apiToken.getApiToken();
            var addressId = "";
            var objectToSend;

            //Validate and Mapping
            objectToSend = angular.copy(address);

            if (token) {
                headers.token = token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (address && address.addressId) {
                addressId = address.addressId;
            } else {

                return $q.reject({errorMessage: 'Address id missing'});
            }


            if (address && address.facebookId) {
                endpoint = '/users/'+address.facebookId+'/addresses/'+addressId;
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
         * List the addresses of an User
         * Documented 26/11/2016
         */
        self.loadAddressesByUser= function (user) {
            var headers = {};
            var endpoint = '';
            //Validate and Mapping
            if (user && user.token) {
                headers.token = user.token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (user && user.facebookId) {
                endpoint = '/users/'+user.facebookId+'/addresses';
            } else {
                return $q.reject({errorMessage: 'FacebookId missing'});
            }

            //Make the request
            return webService.read(endpoint, headers).then(
                function (resolve) {
                    return resolve.data.addresses;
                }
            );
        };

        //server.delete('/users/:id/address/:id') //delete address
    }
    ])
})
(angular);
