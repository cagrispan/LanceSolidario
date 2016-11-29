/**
 * Created by Aliss on 11/08/2016.
 */
(function (angular) {
    'use strict';
    angular.module('lanceSolidario.email.emailResource', ['utils']).service('emailResource', ['webService', '$q', 'apiToken', function (webService, $q, apiToken) {
        var self = this;

        /*
        * Add an email of an User
        * Documented 26/11/2016
        */
        self.add = function (email) {
            var headers = {};
            var endpoint = "";
            var token = apiToken.getApiToken();
            var objectToSend;

            //Validate and Mapping
            objectToSend = angular.copy(email);

            if (token) {
                headers.token = token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }
            if (email && email.facebookId) {
                endpoint = '/users/'+email.facebookId+'/emails';
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

        self.update = function (email) {
            var headers = {};
            var endpoint = "";
            var token = apiToken.getApiToken();
            var emailId = "";
            var objectToSend;

            //Validate and Mapping
            objectToSend = angular.copy(email);

            if (token) {
                headers.token = token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (email && email.emailId) {
                emailId = email.emailId;
            } else {

                return $q.reject({errorMessage: 'Email id missing'});
            }


            if (email && email.facebookId) {
                endpoint = '/users/'+email.facebookId+'/emails/'+emailId;
            } else {

                return $q.reject({errorMessage: 'FacebookId missing'});
            }

            delete objectToSend._update;
            delete objectToSend._save;
            delete objectToSend._remove;
            delete objectToSend._add;

            //Make the request
            return webService.update(endpoint, objectToSend, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };

        /*
         * Remove email of an User
         * Documented 26/11/2016
         */
        self.remove = function (email) {
            var headers = {};
            var endpoint = "";
            var token = apiToken.getApiToken();
            var emailId = "";
            var objectToSend;

            //Validate and Mapping
            objectToSend = angular.copy(email);

            if (token) {
                headers.token = token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (email && email.emailId) {
                emailId = email.emailId;
            } else {

                return $q.reject({errorMessage: 'email id missing'});
            }


            if (email && email.facebookId) {
                endpoint = '/users/'+email.facebookId+'/emails/'+emailId;
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
         * List the emails of an User
         * Documented 25/11/2016
         */
        self.loadEmailsByUser = function (user) {
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



        //server.delete('/users/:id/email/:id') //delete email
    }
    ])
})
(angular);
