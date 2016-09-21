'use strict';
var globalConfig = {backendBasePath:'http://172.20.245.6:7780'};//{'backendBasePath':'http://10.41.1.57:7780'};
angular.module('utils')
    .service('webService', ['$http', '$q',  function ($http, $q) {
        //TODO:Define global variables config
        var baseUrl = globalConfig.backendBasePath;
        //'http://localhost:7780';
        this.read = function (endpoint, headers) {
            headers['Content-Type'] = 'application/json';
            var req = {
                method: 'GET',
                url: baseUrl + endpoint,
                headers: headers
            };

            return request(req);
        };

        this.add = function (endpoint, params, headers) {
            headers['Content-Type'] = 'application/json';
            var req = {
                method: 'POST',
                url: baseUrl + endpoint,
                headers: headers,
                data: params
            };

            return request(req);
        };


        this.update = function (endpoint, params, headers) {
            headers['Content-Type'] = 'application/json';
            var req = {
                method: 'PUT',
                url: baseUrl + endpoint,
                headers: headers,
                data: params
            };

            return request(req);

        };

        this.remove = function (endpoint, headers) {
            headers['Content-Type'] = 'application/json';
            var req = {
                method: 'DELETE',
                url: baseUrl + endpoint,
                headers: headers
            };

            return request(req);

        };

        var request = function (req) {
            var d = new $q.defer();

            $http(req).success(function (data, status, headers, config) {
                d.resolve({
                    data: data,
                    status: status,
                    headers: headers,
                    config: config
                });
            }).error(function (data, status, headers, config) {
                //$log.error('Request to endpoint ' + endpoint + ' failed');
                d.reject({
                    data: data,
                    status: status,
                    headers: headers,
                    config: config
                });
            });

            var promise = d.promise;
            return promise;
        };
    }]);
