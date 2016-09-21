(function (angular) {
    'use strict';

    angular.module('lanceSolidario.telephone.telephone',[]).factory('Telephone',['Entity', function (Entity) {

        angular.extend(Telephone.prototype, Entity.prototype);
        Telephone.prototype.constructor = Telephone;

        function Telephone() {
            this.telephoneId = null;
            this.telephone = null;
        }

        return Telephone;
    }]);

})(angular);
