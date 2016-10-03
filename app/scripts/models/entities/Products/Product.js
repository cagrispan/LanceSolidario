/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('lanceSolidario.product.product', ['lanceSolidario.product.productResource']).factory('Product', ['Entity', 'productResource', function (Entity, productResource) {

        angular.extend(Product.prototype, Entity.prototype);
        Product.prototype.constructor = Product;

        function Product() {

            this.facebookId = null;
            this.productId = null;
            this.title = null;

            this.description = null;
            this.isUsed = null;
            this.isDeleted = null;

            //Image
            this.images = null;

            //methods
            this._add = function () {
                return productResource.add(this);
            };

            this._update = function () {
                return productResource.update(this);
            }
        }

        return Product
    }
    ])
    ;
})
(angular);

