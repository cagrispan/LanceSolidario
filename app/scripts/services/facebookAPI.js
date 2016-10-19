'use strict';
angular.module('utils')
    .service('facebookAPI', ['$rootScope', '$location', 'User', 'apiToken', function ($rootScope, $location, User, apiToken) {

        var self = this;
        self.user = null;
        $rootScope.user = null;

        this.watchLoginChange = function () {

            FB.Event.subscribe('auth.authResponseChange', function (res) {
                console.log('DEBUG: Auth response: ' + res);
                if (res.status === 'connected') {
                    //self.accessToken = res.authResponse.accessToken;
                    self.getUserInfo(res.authResponse.accessToken);
                    console.log('DEBUG: Auth response: ' + res.authResponse);
                }
                else {
                    self.user = null;
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

                    getUserPicture(facebookToken);


                    console.log('DEBUG: Facebook User info:' + self.user);

                    user._updateAPIToken().then(function () {
                        user._load().then(function(){

                            self.user = user;
                            $rootScope.user = user;

                            if ($location.path() === '/login') {
                                apiToken.updateApiToken(user.token);
                                $location.path('/home');
                            }
                        });
                    }, function () {
                        //$location.path('/login');
                    });
                });
            });
        };

        var getUserPicture = function () {

            FB.api('/me/picture?type=large', function (response) {
                $rootScope.$apply(function () {
                    self.profilePicure = response.data.url;

                });
            });
        };


        this.getAPItoken = function () {

            if (self.user && self.user.token) {
                return self.user.token;
            } else {
                return false;
            }

        };

        this.isLogged = function () {
            FB.getLoginStatus(function (response) {
                if (response.status === 'connected') {
                    return true;
                } else if (response.status === 'not_authorized') {

                    return false;
                } else {
                    return false;

                }
            });
        };

    }]);
