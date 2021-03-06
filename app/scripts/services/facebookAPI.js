'use strict';
angular.module('utils')
    .service('facebookAPI', ['$rootScope', '$location', 'User', 'apiToken', 'shareData', '$q', '$facebook', '$route', function ($rootScope, $location, User, apiToken, shareData, $q, $facebook, $route) {

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

            FB.api('/me?fields=id,name,birthday', function (response) {
                $rootScope.$apply(function () {

                    var user = new User();

                    user.name = response.name;
                    user.facebookId = response.id;
                    user.facebookToken = facebookToken;
                    user.birthday = new Date(response.birthday);

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

        this.logout = function () {
            self.user = null;
            $rootScope.user = null;
            $location.path('/');
            $route.reload();

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

        this.feed = function (path, message, title) {
            FB.ui({
                method: 'feed',
                name: title ? title : 'Lance Solidário. Melhore o mundo em um lance.',
                description: message ? message : 'No Lance Solidário, todo o valor arrecadado é doado a uma instituição filantrópica. Participe!',
                link: path ? ('local.lancesolidario.com.br:9000/#' + path) : 'local.lancesolidario.com.br:9000',
                caption: 'lancesolidario.com.br'
            });
        };

    }]);
