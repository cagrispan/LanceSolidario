'use strict';
angular.module('utils')
    .service('facebookAPI', ['$rootScope', '$location', 'User', 'apiToken', 'shareData', '$q', function ($rootScope, $location, User, apiToken, shareData, $q) {

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

                    getUserPicture(facebookToken)
                        .then(function () {
                            console.log('DEBUG: Facebook User info:' + self.user);

                            return user._updateAPIToken();
                        })
                        .then(function () {
                            return user._load();
                        })
                        .then(function () {

                            self.user = user;
                            $rootScope.user = user;

                            if ($location.path() === '/login') {
                                apiToken.updateApiToken(user.token);

                                if (shareData.get('lastPath')) {
                                    $location.path(shareData.get('lastPath'));
                                } else {
                                    $location.path('/home');
                                }
                            }
                        });
                }, function () {
                    console.log('That Stranger thing happen');
                    $location.path('/home');
                });
            });

        };

        var getUserPicture = function () {
            var defer = $q.defer();
            FB.api('/me/picture?type=large', function (response) {
                $rootScope.$apply(function () {
                    self.profilePicture = response.data.url;
                    defer.resolve();
                });
            });
            return defer.promise;
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

    }
    ])
;
