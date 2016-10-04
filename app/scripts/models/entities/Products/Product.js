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
            };

            this._listByAuction = function (auction) {
                var productListtoReturn = [];
                return productResource.loadProductsByAuction(auction).then(function (response) {
                    var productList = [];
                    var facebookId = '';

                    if(response.products){  productList = response.products;}
                    if(auction.facebookId){  facebookId = auction.facebookId;}
                    else if(response.facebookId){  facebookId = response.facebookId;}

                    if (productList && productList[0]) {
                        var product;
                        for (var i in productList) {
                            product = new Product();
                            product._set(productList[i]);
                            product.facebookId = facebookId;
                            productListtoReturn.push(product);
                        }
                    }
                    return productListtoReturn;
                });
            }
        }

        return Product
    }
    ])
    ;
})
(angular);

