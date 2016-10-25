'use strict';
angular.module('lanceSolidario')
    .controller('DashboardCtrl', ['facebookAPI', '$location', function (facebookAPI, $location) {

        var self = this;


        function init() {
            //Useful flags
            self.loading = true;

            if (!facebookAPI.user) {
                $location.path('/login');
            }else{
                self.user = facebookAPI.user;
            }
        }

        /*var successFeedback = function (message) {
        //    alert(message);
        //};

        var failFeedback = function (error) {
            alert('Erro');
            console.log(JSON.stringify(error))
        };*/

        init();
    }]);
