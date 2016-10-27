'use strict';
angular.module('lanceSolidario')
    .controller('DashboardCtrl', ['facebookAPI', '$location','shareData', function (facebookAPI, $location, shareData) {

        var self = this;


        function init() {
            //Useful flags
            self.loading = true;
            shareData.set($location.path(), 'lastPath');

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
