/**
 * Created by Carlos on 23/07/2016.
 */
angular.module('utils')
    .service('facebookAPI', ['$rootScope', '$location', 'User', function ($rootScope, $location, User) {

        var self = this;

        this.watchLoginChange = function () {

            FB.Event.subscribe('facebookAPI.authResponseChange', function (res) {

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
                    console.log('DEBUG: Facebook User:' + self.user);

                    user._getToken().then(function(){
                        $location.path('/home');
                    },function(){
                        $location.path('/login');
                    });
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