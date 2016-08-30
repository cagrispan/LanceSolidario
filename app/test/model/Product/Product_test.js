(function () {
    'use strict';

    describe('Product entity', function () {
        var Product;
        var productResource;
        var $q;

        beforeEach(module('lanceSolidario.product.product', 'lanceSolidario.product.productResourceMock'));
        beforeEach(inject(function (_productResource_, _Product_, _$q_) {
            Product = _Product_;
            productResource = _productResource_;
            $q = _$q_;
        }));

        describe('new', function () {
            it('should instantiate a product object', inject(function () {
                var product = new Product();
                expect(product).toBeDefined();
            }));
        });

        describe('add', function () {
            it('should call add method of resource with a product like parameter', function () {
                var product = new Product();
                product.title = 'ThisIsATitle';
                var fakePromise = $q.when();
                spyOn(productResource, 'add').and.returnValue(fakePromise);

                var x = product._add();
                expect(productResource.add).toHaveBeenCalledWith(product);
            });
        });

        /*
        describe('add', function () {
            it('should call add method of resource with a product like parameter', function () {
                var product = new Product();
                product.facebookId = 'ThisIdExists';
                var fakePromise = $q.when();
                spyOn(productResource, 'add').and.returnValue(fakePromise);

                var x = product._add();
                expect(productResource.add).toHaveBeenCalledWith(product);
            });
        });
        */
    });
})();