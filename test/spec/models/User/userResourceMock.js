/**
 * Created by Aliss on 11/08/2016.
 */

(function (angular) {
    'use strict';
    angular.module('lanceSolidario.user.userResourceMock', []).service('userResource',['$q',function ($q) {
        var self = this;

        self.add = function (user) {
            if (user.facebookId === 'ThisIdExists') {
                return 22;
            } else {
                return !22;
            }
        };

        self.getToken = function (user) {

        };

        self.update = function (user) {

        };

        self.load = function (user) {

        };

        self.loadAddresses = function (user) {

        };

        self.loadEmails = function (user) {

        };

        self.loadTelephones = function (user) {

        };

        self.createOrUpdate = function (user) {

        };

        self.loadProducts = function (user) {

        };

    }])
})(angular);
