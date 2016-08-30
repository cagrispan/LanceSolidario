/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('lanceSolidario.product.product', ['lanceSolidario.product.productResource']).factory('Product', ['productResource', function (productResource) {

        Product.prototype.constructor = Product;
        
        function Product() {

            //identification
            this.id = null;
            this.donorUser = null;
            this.buyerUser = null;

            //Product info
            this.title = null;
            this.description = null;
            this.category = null;
            this.tags = null;
            this.isUsed = null;

            //Image
            this.images = null;

            //history
            this.auctions = null;

            //methods
            this._add = function(){
                return productResource.add(this);
            }
        }

        return Product
    }]);
})(angular);

