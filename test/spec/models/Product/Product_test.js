(function () {
    'use strict';

    describe('Product entity', function () {
        var Product;
        var productResource;
        var $q;
        var rootScope;

        beforeEach(module('lanceSolidario.product.product', 'lanceSolidario.product.productResourceMock', 'utils'));
        beforeEach(function () {
            inject(function (_productResource_, _Product_, _$q_, _$rootScope_) {
                Product = _Product_;
                productResource = _productResource_;
                $q = _$q_;
                rootScope = _$rootScope_;
            });
        });

        describe('new', function () {
            it('should instantiate a Product object', inject(function () {
                var product = new Product();
                expect(product).toBeDefined();
            }));
        });


        describe('update', function () {

            it('should call update method of resource with a product like parameter', function () {
                var product = new Product();
                product.facebookId = 'ThisIdExists';
                var fakePromise = $q.when();
                spyOn(productResource, 'update').and.returnValue(fakePromise);
                var x = product._update();
                expect(productResource.update).toHaveBeenCalledWith(product);
            });
        });

        describe('add', function () {

            it('should call add method of resource with a product like parameter', function () {
                var product = new Product();
                product.facebookId = 'ThisIdExists';
                var fakePromise = $q.when();
                spyOn(productResource, 'add').and.returnValue(fakePromise);
                var x = product._add();
                expect(productResource.add).toHaveBeenCalledWith(product);
            })
        });


    });
})();
