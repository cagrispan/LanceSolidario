/**
 * Created by Carlos on 28/07/2016.
 */
(function (angular) {
    'use strict';

    angular.module('lanceSolidario.address.address', ['lanceSolidario.address.addressResource']).factory('Address', ['Entity', 'addressResource', function (Entity, addressResource) {

        angular.extend(Address.prototype, Entity.prototype);
        Address.prototype.constructor = Address;

        function Address() {


            this.facebookId = null;
            this.addressId = null;
            this.street = null;
            this.number = null;
            this.complement = null;
            this.neighborhood = null;
            this.city = null;
            this.state = null;
            this.cep = null;

            this._add = function () {
                return addressResource.add(this);
            };

            this._update = function () {
                return addressResource.update(this);
            };

            this._remove = function () {
                return addressResource.remove(this);
            };

            //TODO : Need tests
            this._save = function () {
                var address = this;
                if (address && address.addressId) {
                    return addressResource.update(address);

                } else {
                    return addressResource.add(address);
                }
            }
        }

        return Address;
    }]);

})(angular);
