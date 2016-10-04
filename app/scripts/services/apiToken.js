'use strict';
angular.module('utils')
    .service('apiToken', [ function () {

        var self = this;

        this.updateApiToken = function (token) {
            self.token = token;
        };

        this.getApiToken = function () {
            return self.token;
        };


    }]);
