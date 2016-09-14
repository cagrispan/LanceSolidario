(function () {
    'use strict';

    describe('NewProduct controller', function () {

        var Product;
        var facebookAPI;
        var location;
        var newProductCtrl;

        beforeEach(module('lanceSolidario'));

        beforeEach(inject(function ($controller) {

            Product = function () {
                this._add = function(){};
            };

            facebookAPI = {};

            facebookAPI.user = true;

            location = {};
            location.path = function (path) {
                return path;
            };

            newProductCtrl = $controller('NewProductCtrl', {
                'Product': Product,
                'facebookAPI': facebookAPI,
                '$location': location
            });
        }));


        it('should exists', function () {
            expect(newProductCtrl).toBeDefined();
        });

        it('should have an add method', function () {
            expect(typeof newProductCtrl.add).toBe('function');
        });

        it('should add a product', function () {
            spyOn(newProductCtrl.newProduct, '_add');
            newProductCtrl.add();
            expect(newProductCtrl.newProduct._add).toHaveBeenCalled();
        });

    });
})();
