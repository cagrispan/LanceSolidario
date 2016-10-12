'use strict';
angular.module('utils')
    .service('facebookAPI', ['$rootScope', '$location', 'User','apiToken', function ($rootScope, $location, User, apiToken) {

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

                    user._updateAPIToken().then(function () {
                        if ($location.path() === '/login') {
                            apiToken.updateApiToken(user.token);
                            $location.path('/home');
                        }
                    }, function () {
                        //$location.path('/login');
                    });
                });
            });
        };


        this.getAPItoken = function () {

            if(self.user && self.user.token){
                return self.user.token;
            }else{
                return false;
            }

        };

        this.isLogged = function () {
            FB.getLoginStatus(function(response) {
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
