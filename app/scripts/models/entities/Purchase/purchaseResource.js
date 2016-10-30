/**
 * Created by Aliss on 11/08/2016.
 */
(function (angular) {
    'use strict';
    angular.module('lanceSolidario.image.imageResource', ['utils']).service('imageResource', ['webService', '$q', 'apiToken', function (webService, $q, apiToken) {
        var self = this;

        self.loadAll = function (user) {
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
                endpoint = '/users/' + user.facebookId + '/purchases';
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
