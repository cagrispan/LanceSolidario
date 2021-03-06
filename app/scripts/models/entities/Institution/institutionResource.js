/**
 * Created by Aliss on 11/08/2016.
 */
(function (angular) {
    'use strict';
    angular.module('lanceSolidario.institution.institutionResource', ['utils']).service('institutionResource', ['webService', '$q', 'apiToken', function (webService, $q, apiToken) {
        var self = this;


        /*
         * List all institutions
         * Documented 26/11/2016
         */
        self.loadAll = function () {
            var headers = {};
            var endpoint = '/institutions';
            //Make the request
            return webService.read(endpoint, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };


        /*
         * Load an institution
         * Documented 23/11/2016
         */
        self.load = function (institution) {
            var headers = {};

            if (institution && institution.institutionId) {
                var endpoint = '/institutions/' + institution.institutionId;
            } else {
                return $q.reject({errorMessage: 'institution id missing'});
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
