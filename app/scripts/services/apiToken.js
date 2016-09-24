'use strict';
angular.module('utils')
    .service('apiToken', [ function () {

        var self = this;

        this.updateApiToken = function (token) {
            this.token = token;
        };

        this.getApiToken = function () {
            return this.token;
        };


    }]);
