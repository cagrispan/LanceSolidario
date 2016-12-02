/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('lanceSolidario.image.image', ['lanceSolidario.image.imageResource'])
        .factory('Image', ['imageResource', 'Entity', function (imageResource, Entity) {

            angular.extend(Image.prototype, Entity.prototype);
            Image.prototype.constructor = Image;

            function Image() {

                /*
                 Id
                 */
                this.imageId = null;

                /*
                 Product Object
                 */
                this.productId = null;

                /*
                 Base64
                 */
                this.base64 = null;

                /*
                 Methods
                 */

                /*
                 * Add a image for a product
                 * Documented 25/11/2016
                 */
                this._add = function (user) {
                    return imageResource.add(this, user);
                };

                /*
                 * Remove a image of a product
                 * Documented 23/11/2016
                 */
                this._remove = function (user) {
                    return imageResource.remove(this, user);
                };


            }

            /*
             * List images of a product
             * Documented 23/11/2016
             */
            Image._listByProduct = function (product) {
                var imageListToReturn = [];
                return imageResource.loadImagesByProduct(product).then(function (response) {
                    var imageList = [];

                    if (response) {
                        imageList = response
                    }

                    if (imageList && imageList[0]) {
                        var image;
                        for (var i in imageList) {
                            image = new Image();
                            image._set(imageList[i]);
                            image.productId = product.productId;
                            imageListToReturn.push(image);
                        }
                    }
                    return imageListToReturn;
                });
            };
            return Image;
        }]);
})(angular);

