'use strict';
angular.module('lanceSolidario')
.controller('View1Ctrl',  ['webService', function(webService) {

    var view1 = this;



    webService.read('/users').then(function(result){
        view1.users = result.data;
    });

    view1.msg = 'Hello';
    console.log('view1');
}]);