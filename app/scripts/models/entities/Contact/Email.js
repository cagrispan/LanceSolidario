(function (angular) {
    'use strict';

    angular.module('lanceSolidario.email.email',['lanceSolidario.email.emailResource']).factory('Email',['Entity','emailResource', function (Entity, emailResource) {

        angular.extend(Email.prototype, Entity.prototype);
        Email.prototype.constructor = Email;

        function Email() {

            this.facebookId = null;
            this.emailId = null;
            this.email = null;

            this._add = function(){
                return emailResource.add(this);
            };

            this._update = function(){
                return emailResource.update(this);
            };

            this._remove = function(){
                return emailResource.remove(this);
            };

            //TODO : Need tests
            this._save = function(){
                if(this.emailId){
                    return emailResource.update(this);

                }else{
                    return emailResource.add(this);
                }
            }
        }

        return Email;
    }]);

})(angular);
