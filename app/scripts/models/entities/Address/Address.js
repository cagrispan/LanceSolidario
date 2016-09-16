/**
 * Created by Carlos on 28/07/2016.
 */
(function (angular) {
    'use strict';

    angular.module('lanceSolidario.address.address',[]).factory('Address',['Entity', function (Entity) {

        angular.extend(Address.prototype, Entity.prototype);
        Address.prototype.constructor = Address;

        function Address() {

            this.addressLine = null;
            this.city = null;
            this.complement = null;
            this.state = null;
            this.zip = null;

        }

        return Address;
    }]);

})(angular);
