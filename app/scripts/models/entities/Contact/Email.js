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
            }
        }

        return Email;
    }]);

})(angular);