/**
 * Created by Carlos on 23/07/2016.
 */
angular.module('utils')
    .service('auth', ['webService', '$rootScope', '$location', function (webService, $rootScope, $location) {

        var self = this;

        this.watchLoginChange = function() {

            FB.Event.subscribe('auth.authResponseChange', function(res) {

                if (res.status === 'connected') {

                    self.getUserInfo();

                    /*
                     This is also the point where you should create a
                     session for the current user.
                     For this purpose you can use the data inside the
                     res.authResponse object.
                     */
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
                    self.user = response;
                    $location.path('/view1');
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