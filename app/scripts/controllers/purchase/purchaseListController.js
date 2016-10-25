'use strict';
angular.module('lanceSolidario')
    .controller('PurchaseListCtrl', ['facebookAPI', '$location', '$q', function (facebookAPI, $location, $q) {

        var self = this;

        function init() {
            //Useful flags
            self.loading = true;

            if (!facebookAPI.user) {
                $location.path('/login');
            } else {
                self.user = facebookAPI.user;
            }

            //return self.user._loadPurchases().then(function(){
            //    var promises = [];
            //    for(var prodIndx in self.user.purchaseList){
            //        promises.push(self.user.purchaseList[prodIndx]._loadAuctions());
            //    }
            //    return $q.all(promises);
            //});
        }


        init();
            //.then(function () {
            //    self.loading = false;
            //}, function (err) {
            //    failFeedback(err)
            //});

        //var failFeedback = function (error) {
        //    console.log('Error: ');
        //    console.log(JSON.stringify(error))
        //};

    }]);
