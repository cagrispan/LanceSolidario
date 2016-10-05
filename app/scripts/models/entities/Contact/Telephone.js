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
            };

            this._remove = function(){
                return telephoneResource.remove(this);
            };

            //TODO : Need tests
            this._save = function(){
                if(this.telephoneId){
                    return telephoneResource.update(this);
                }else{
                    return telephoneResource.add(this);
                }
            }
        }

        return Telephone;
    }]);

})(angular);
