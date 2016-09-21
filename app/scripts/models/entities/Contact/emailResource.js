/**
 * Created by Aliss on 11/08/2016.
 */
(function (angular) {
    'use strict';
    angular.module('lanceSolidario.email.emailResource', ['utils']).service('emailResource', ['webService', '$q','facebookAPI', function (webService, $q, facebookAPI) {
        var self = this;

        self.add = function (userId, email) {
            var headers = {};
            var endpoint = "";
            var token = facebookAPI.getAPItoken();
            var emailId = "";
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
                return $q.reject({errorMessage: 'Email id missing'});
            }


            if (userId) {
                endpoint = String.format('/users/%s/emails/%s', userId, emailId);
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
            var emailId = "";
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
                return $q.reject({errorMessage: 'Email id missing'});
            }


            if (userId) {
                endpoint = String.format('/users/%s/emails/%s', userId, emailId);
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

        //server.delete('/users/:id/email/:id') //delete email
    }
    ])
})
(angular);
