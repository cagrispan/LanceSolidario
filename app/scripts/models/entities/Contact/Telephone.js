(function (angular) {
    'use strict';

    angular.module('lanceSolidario.telephone.telephone',['lanceSolidario.telephone.telephoneResource']).factory('Telephone',['Entity','telephoneResource', function (Entity, telephoneResource) {

        angular.extend(Telephone.prototype, Entity.prototype);
        Telephone.prototype.constructor = Telephone;

        function Telephone() {

            this.facebookId = null;
            this.telephoneId = null;
            this.telephone = null;

            this._add = function(){
                return telephoneResource.add(this);
            };

            this._update = function(){
                return telephoneResource.update(this);
            }
        }

        return Telephone;
    }]);

})(angular);
