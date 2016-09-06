'use strict';
angular.module('utils')
    .service('facebookAPI', ['$rootScope', '$location', 'User', function ($rootScope, $location, User) {

        var self = this;

        this.watchLoginChange = function () {

            FB.Event.subscribe('auth.authResponseChange', function (res) {
                console.log('DEBUG: Auth response: ' + res);
                if (res.status === 'connected') {
                    //self.accessToken = res.authResponse.accessToken;
                    self.getUserInfo(res.authResponse.accessToken);
                    console.log('DEBUG: Auth response: ' + res.authResponse);
                }
                else {
                    self.user = {};
                }
            });
        };

        this.getUserInfo = function (facebookToken) {

            FB.api('/me', function (response) {
                $rootScope.$apply(function () {

                    var user = new User();

                    user.name = response.name;
                    user.facebookId = response.id;
                    user.facebookToken = facebookToken;

                    self.user = user;
                    console.log('DEBUG: Facebook User info:' + self.user);

                    user._getToken().then(function () {
                        if ($location.path() === '/login') {
                            $location.path('/home');
                        }
                    }, function () {
                        $location.path('/login');
                    });
                });
            });
        };


        this.logout = function () {

            FB.logout(function () {
                $rootScope.$apply(function () {
                    $rootScope.user = self.user = {};
                });
            });

        };

        this.isLogged = function () {
            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    var uid = response.authResponse.userID;
                    var accessToken = response.authResponse.accessToken;
                    return true;
                } else if (response.status === 'not_authorized') {

                    return false;
                } else {
                    return false;

                }
            });
        };

    }]);
