/**
 * Created by Aliss on 11/08/2016.
 */
(function (angular) {
    'use strict';
    angular.module('lanceSolidario.user.userResource', ['utils']).service('userResource', ['webService', '$q', function (webService, $q) {
        var self = this;

        /*
         * Update access Token of an User, if the user does not exist, a new one will be created
         * Documented 25/11/2016
         */
        self.getToken = function (user) {
            //Config
            var endpoint = '/auth';
            var headers = {};
            //Validate
            if (user && user.facebookId) {
                headers.facebookId = user.facebookId;
            } else {
                return $q.reject({errorMessage: 'facebookId missing'});
            }
            //Make the request
            return webService.add(endpoint, user, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        /*
         * Update the information of an User
         * Documented 25/11/2016
         */
        self.createOrUpdate = function (user) {
            var headers = {};
            var endpoint = "";
            var objectToSend = "";
            //Validate and Mapping
            objectToSend = angular.copy(user);

            if (user && user.token) {
                headers.token = user.token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (user && user.facebookId) {
                endpoint = '/users/'+user.facebookId;
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
         * Load information of an User
         * Documented 25/11/2016
         */
        self.load = function (user) {
            var headers = {};
            var endpoint = "";

            //Validate and Mapping
            if (user && user.token) {
                headers.token = user.token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (user && user.facebookId) {
                endpoint = '/users/'+ user.facebookId;
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

        self.loadPublicInformation = function (user) {
            var headers = {};
            var endpoint = "";

            //Validate and Mapping
            if (user && user.facebookId) {
                endpoint = '/users/'+ user.facebookId;
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


        // Address

        self.loadAddresses = function (user) {
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

        // Emails
        self.loadEmails = function (user) {
            var headers = {};
            var endpoint = '';
            //Validate and Mapping
            if (user && user.token) {
                headers.token = user.token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (user && user.facebookId) {
                endpoint = '/users/'+user.facebookId+'/emails' ;
            } else {
                return $q.reject({errorMessage: 'FacebookId missing'});
            }

            //Make the request
            return webService.read(endpoint, headers).then(
                function (resolve) {
                    return resolve.data.emails;
                }
            );
        };

        //Telephones
        self.loadTelephones = function (user) {
            var headers = {};
            var endpoint = '';

            //Validate and Mapping
            if (user && user.token) {
                headers.token = user.token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (user && user.facebookId) {
                endpoint = '/users/'+user.facebookId+'/telephones';
            } else {
                return $q.reject({errorMessage: 'FacebookId missing'});
            }

            //Make the request
            return webService.read(endpoint, headers).then(
                function (resolve) {
                    return resolve.data.telephones;
                }
            );
        };
    }
    ])
})
(angular);
