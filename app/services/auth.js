/**
 * Created by Carlos on 23/07/2016.
 */
angular.module('utils')
    .service('auth', ['webService', '$rootScope', '$location', 'User', function (webService, $rootScope, $location, User) {

        var self = this;

        this.watchLoginChange = function () {

            FB.Event.subscribe('auth.authResponseChange', function (res) {

                if (res.status === 'connected') {
                    self.accessToken = res.authResponse.accessToken;
                    self.getUserInfo();
                    console.log('DEBUG: Auth response: ' + res.authResponse);
                }
                else {
                    self.user = {};
                }
            });
        };

        this.getUserInfo = function () {

            FB.api('/me', function (response) {
                $rootScope.$apply(function () {

                    var user = new User();

                    user.name = response.name;
                    user.facebookId = response.id;
                    user.token = self.accessToken;

                    self.user = user;
                    console.log('DEBUG: Facebook User:' + self.user);

                    $location.path('/home');

                });
            });
        };


        this.logout = function () {

            FB.logout(function () {
                $rootScope.$apply(function () {
                    $rootScope.user = self.user = {};
                });
            });

        }

    }]);