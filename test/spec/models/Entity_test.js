(function () {
    'use strict';

    describe('Entity entity', function () {
        var Entity;

        beforeEach(module('entity'));
        beforeEach(inject(function (_Entity_) {
            Entity = _Entity_;

        }));

        describe('_set', function () {
            it('should populate itself with a object json', inject(function () {
                var entity = new Entity();
                entity.prop1 = 'Hello1';
                entity.prop2 = 'Hello2';
                entity.prop3 = 'Hello3';
                var data = {prop1: 'World1', prop3: 'World3', prop4: 'World4'};
                entity._set(data);
                expect(entity.prop1).toBe('World1');
                expect(entity.prop2).toBe('Hello2');
                expect(entity.prop3).toBe('World3');
                expect(entity.prop4).toBeUndefined();
            }));
        });

    });
})();
