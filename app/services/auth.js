/**
 * Created by Carlos on 23/07/2016.
 */
angular.module('utils')
    .service('auth', ['webService', '$rootScope', '$location','User', function (webService, $rootScope, $location, User) {

        var self = this;

        this.watchLoginChange = function() {

            FB.Event.subscribe('auth.authResponseChange', function(res) {

                if (res.status === 'connected') {
                    self.accessToken = res.authResponse.accessToken;
                    self.getUserInfo();
                    console.log('DEBUG: Auth response: '+res.authResponse);
                }
                else {
                    /*
                     The user is not logged to the app, or into Facebook:
                     destroy the session on the server.
                     */
                }
            });
        };

        this.getUserInfo = function() {

            FB.api('/me', function(response) {
                $rootScope.$apply(function() {
                    self.user = new User();
                    self.user.name = response.name;
                    self.user.facebookId = response.id;
                    self.user.token = self.accessToken;
                    $location.path('/home');
                    console.log('DEBUG: Facebook User:'+self.user);
                });
            });
        };


        this.logout = function() {

            FB.logout(function() {
                $rootScope.$apply(function() {
                    $rootScope.user = self.user = {};
                });
            });

        }

    }]);