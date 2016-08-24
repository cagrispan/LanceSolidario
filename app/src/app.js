'use strict';
//TODO:Define global variables config
var globalConfig = {"backendBasePath":"http://10.41.1.57:7780"};

// Declare app level module which depends on views, and components
angular.module('lanceSolidario', [
    'ngRoute',
    'utils',
    'lanceSolidario.version',
    'lanceSolidario.user',
    'lanceSolidario.product'
]);
