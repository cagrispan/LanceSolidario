'use strict';
angular.module('lanceSolidario')
    .controller('ProductList', ['Product', 'facebookAPI', '$location', '$q', function (Product, facebookAPI, $location, $q) {

        var self = this;

        function init() {
            //Useful flags
            self.loading =  true;

            if (!facebookAPI.user) {
                $location.path('/login');
            }
            self.user = facebookAPI.user;
            return self.user._loadProducts().then(function(){
                var promisses = [];
                for(var prodIndx in self.user.productList){
                    promisses.push(self.user.productList[prodIndx]._loadAuctions());
                }
                return $q.all(promisses);
            });
        }


        init().then(function(){
            self.loading = false;
        }, function(err){
            failFeedback(err)
        });

        self.stopAuction= function(product){
            alert('yey')
        };

        self.startAuction = function(product){
            alert('yey')
        };

        self.showProduct = function(product){
            alert('yey')
        };

        self.deleteProduct= function(product){
            alert('yey')
        };

        var successFeedback = function (message) {
            alert(message);
        };

        var failFeedback = function (error) {
            console.log('Error: ');
            console.log(JSON.stringify(error))
        };

    }]);
