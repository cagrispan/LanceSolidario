/**
 * Created by Aliss on 11/08/2016.
 */
(function (angular) {
    'use strict';
    angular.module('lanceSolidario.telephone.telephoneResource', ['utils']).service('telephoneResource', ['webService', '$q', 'apiToken', function (webService, $q, apiToken) {
        var self = this;

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

        //server.delete('/users/:id/telephone/:id') //delete telephone
    }
    ])
})
(angular);
