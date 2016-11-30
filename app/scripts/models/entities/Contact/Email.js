(function (angular) {
    'use strict';

    angular.module('lanceSolidario.email.email',['lanceSolidario.email.emailResource']).factory('Email',['Entity','emailResource', function (Entity, emailResource) {

        angular.extend(Email.prototype, Entity.prototype);
        Email.prototype.constructor = Email;

        function Email() {

            this.facebookId = null;
            this.emailId = null;
            this.email = null;

            /*
             * Add email for an User
             * Documented 26/11/2016
             */
            this._add = function(){
                return emailResource.add(this);
            };

            this._update = function(){
                return emailResource.update(this);
            };

            /*
             * Remove email of an User
             * Documented 26/11/2016
             */
            this._remove = function(){
                return emailResource.remove(this);
            };

            //TODO : Need tests
            this._save = function(){
                var email = this;
                if(email.emailId){
                    return emailResource.update(email);

                }else{
                    return emailResource.add(email);
                }
            }
        }

        /*
         * List the emails of an User
         * Documented 25/11/2016
         */
        Email._listByUser = function(user){
            return emailResource.loadEmailsByUser(user)
                .then(function (emailList) {
                    var emailListToReturn = [];
                    if (emailList && emailList[0]) {
                        var email;
                        for (var i in emailList) {
                            email = new Email();
                            email._set(emailList[i]);
                            email.facebookId = user.facebookId;
                            emailListToReturn.push(email);
                        }
                    }
                    return emailListToReturn;
                })

        };

        return Email;
    }]);

})(angular);
