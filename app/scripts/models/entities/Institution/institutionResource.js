/**
 * Created by Aliss on 11/08/2016.
 */
(function (angular) {
    'use strict';
    angular.module('lanceSolidario.institution.institutionResource', ['utils']).service('institutionResource', ['webService', '$q', 'apiToken', function (webService, $q, apiToken) {
        var self = this;

        self.loadAll = function () {
            var headers = {};
            var endpoint ='/institutions';
            //Make the request
            return webService.read(endpoint, headers).then(
                function (resolve) {
                    return resolve.data;
                }
            );
        };
    }])
})(angular);
