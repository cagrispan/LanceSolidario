/**
 * Created by Aliss on 11/08/2016.
 */
(function (angular) {
    'use strict';
    angular.module('lanceSolidario.telephone.telephoneResource', ['utils']).service('telephoneResource', ['webService', '$q', 'apiToken', function (webService, $q, apiToken) {
        var self = this;

        /*
         * Add a telephone for an User
         * Documented 26/11/2016
         */
        self.add = function (telephone) {
            var headers = {};
            var endpoint = "";
            var token = apiToken.getApiToken();
            var objectToSend;

            //Validate and Mapping
            objectToSend = angular.copy(telephone);

            if (token) {
                headers.token = token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }
            if (telephone && telephone.facebookId) {
                endpoint = '/users/'+telephone.facebookId+'/telephones';
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

        self.update = function (telephone) {
            var headers = {};
            var endpoint = "";
            var token = apiToken.getApiToken();
            var telephoneId = "";
            var objectToSend;

            //Validate and Mapping
            objectToSend = angular.copy(telephone);

            if (token) {
                headers.token = token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (telephone && telephone.telephoneId) {
                telephoneId = telephone.telephoneId;
            } else {

                return $q.reject({errorMessage: 'Telephone id missing'});
            }


            if (telephone && telephone.facebookId) {
                endpoint = '/users/'+telephone.facebookId+'/telephones/'+telephoneId;
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
         * Remove telephone of an User
         * Documented 26/11/2016
         */
        self.remove = function (telephone) {
            var headers = {};
            var endpoint = "";
            var token = apiToken.getApiToken();
            var telephoneId = "";
            var objectToSend;

            //Validate and Mapping
            objectToSend = angular.copy(telephone);

            if (token) {
                headers.token = token;
            } else {
                return $q.reject({errorMessage: 'Access token missing'});
            }

            if (telephone && telephone.telephoneId) {
                telephoneId = telephone.telephoneId;
            } else {

                return $q.reject({errorMessage: 'telephone id missing'});
            }


            if (telephone && telephone.facebookId) {
                endpoint = '/users/'+telephone.facebookId+'/telephones/'+telephoneId;
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
         * List telephonee of an User
         * Documented 26/11/2016
         */
        self.loadTelephonesByUser = function (user) {
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

        //server.delete('/users/:id/telephone/:id') //delete telephone
    }
    ])
})
(angular);
