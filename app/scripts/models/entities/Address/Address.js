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

            /*
             * Add a new Address for an User
             * Documented 26/11/2016
             */
            this._add = function () {
                return addressResource.add(this);
            };

            /*
             * Update an Address for an User
             * Documented 26/11/2016
             */
            this._update = function () {
                return addressResource.update(this);
            };

            /*
             * Remove an Address of an User
             * Documented 26/11/2016
             */
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

        /*
         * List the addresses of an User
         * Documented 26/11/2016
         */
        Address._listByUser = function (user) {
            return addressResource.loadAddressesByUser(user)
                .then(function (addressList) {
                    var addressListToReturn = [];
                    if (addressList && addressList[0]) {
                        var address;
                        user.addressList = [];
                        for (var i in addressList) {
                            address = new Address();
                            address._set(addressList[i]);
                            address.facebookId = user.facebookId;
                            addressListToReturn.push(address);
                        }
                    }
                    return addressListToReturn;
                })
        };

        return Address;
    }]);

})(angular);
