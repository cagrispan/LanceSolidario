'use strict';
angular.module('utils')
    .service('facebookAPI', ['$rootScope', '$location', 'User', 'apiToken', 'shareData', '$q', '$facebook', function ($rootScope, $location, User, apiToken, shareData, $q, $facebook) {

        var self = this;
        self.user = null;
        $rootScope.user = null;

        this.watchLoginChange = function () {

            $facebook.login().then(function (res) {
                if (res.status === 'connected') {
                    self.getUserInfo(res.authResponse.accessToken);
                }
                else {
                    self.user = null;
                }
            }, function (err) {
                console.log(err);
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
                            return user._updateAPIToken();
                        })
                        .then(function () {
                            return user._load();
                        })
                        .then(function () {
                            user.profilePicture = self.profilePicture;
                            return user._save();
                        })

                        .then(function () {

                            self.user = user;
                            $rootScope.user = user;

                            if ($location.path() === '/login') {
                                apiToken.updateApiToken(user.token);

                                if (shareData.get('lastPath')) {
                                    $location.path(shareData.get('lastPath'));
                                } else {
                                    $location.path('/');
                                }
                            }
                        });
                }, function () {
                    console.log('That Stranger thing happen');
                    $location.path('/');
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

        this.feed = function (path, message) {
            FB.ui({
                method: 'feed',
                name: 'Lance Solidário',
                description: message? message : 'Leiloe aquilo que não precisa mais e destine o valor arrecadado para uma instituição de sua escolha!',
                link: path ? ('local.lancesolidario.com.br:9000/#' + path) : 'local.lancesolidario.com.br:9000',
                caption: 'Melhore o mundo num lance.'
            });
        };

    }]);
