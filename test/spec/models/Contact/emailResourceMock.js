/**
 * Created by Aliss on 11/08/2016.
 */

(function (angular) {
    'use strict';
    angular.module('lanceSolidario.email.emailResourceMock', []).service('emailResource', ['$q', function ($q) {
        var self = this;

        self.add = function (email) {
        };

        self.update = function (email) {
        };

        self.remove = function (email) {
        };

    }])
})(angular);
