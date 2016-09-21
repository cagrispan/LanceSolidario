(function (angular) {
    'use strict';

    angular.module('lanceSolidario.email.email',[]).factory('Email',['Entity', function (Entity) {

        angular.extend(Email.prototype, Entity.prototype);
        Email.prototype.constructor = Email;

        function Email() {

            this.emailId = null;
            this.email = null;
        }

        return Email;
    }]);

})(angular);
