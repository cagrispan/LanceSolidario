(function (angular) {
    'use strict';

    angular.module('lanceSolidario.telephone.telephone',['lanceSolidario.telephone.telephoneResource']).factory('Telephone',['Entity','telephoneResource', function (Entity, telephoneResource) {

        angular.extend(Telephone.prototype, Entity.prototype);
        Telephone.prototype.constructor = Telephone;

        function Telephone() {

            this.facebookId = null;
            this.telephoneId = null;
            this.telephone = null;

            /*
             * Add a telephone for User
             * Documented 26/11/2016
             */
            this._add = function(){
                return telephoneResource.add(this);
            };

            this._update = function(){
                return telephoneResource.update(this);
            };

            /*
             * Remove email of an User
             * Documented 26/11/2016
             */
            this._remove = function(){
                return telephoneResource.remove(this);
            };

            //TODO : Need tests
            this._save = function(){
                var telephone = this;
                if(telephone && telephone.telephoneId){
                    return telephoneResource.update(telephone);
                }else{
                    return telephoneResource.add(telephone);
                }
            }
        }

        /*
         * List the telephones of an User
         * Documented 25/11/2016
         */
        Telephone._listByUser = function(user){
            return telephoneResource.loadTelephonesByUser(user)
                .then(function (telephoneList) {
                    var telephoneListToReturn = [];
                    if (telephoneList && telephoneList[0]) {
                        var telephone;
                        for (var i in telephoneList) {
                            telephone = new Telephone();
                            telephone._set(telephoneList[i]);
                            telephone.facebookId = user.facebookId;
                            telephoneListToReturn.push(telephone);
                        }
                    }
                    return telephoneListToReturn;
                })

        };
        return Telephone;
    }]);

})(angular);
